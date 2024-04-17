"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { useRef } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import * as z from "Zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Toaster } from "@/components/ui/sonner"
import { useToast } from "@/components/ui/use-toast"
import { ErrorToast } from "@/hooks/ErrorToast"
import { serverErrorSchema } from "../types/serverError"



const formSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})

export default function LoginAccount() {
  const router = useRouter()
  const { toast } = useToast()
  const { setOpenErrorToast } = ErrorToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    try {

      const result = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      })

      if (result?.ok) {
        toast({ title: "Success", description: "You have successfully logged in", style: { backgroundColor: "#4caf50", color: "white" } })
        router.push("/heroes")
      }

      if (result?.error) {
        // We are using the serverErrorSchema to validate the error message from the server.
        // If the error message is not valid, we display a generic error message.
        // If the error message is valid, we display the error message from the server.
        const serverErrorMessage = serverErrorSchema.safeParse(JSON.parse(result.error))
        console.log("serverErrorMessage: ", serverErrorMessage)
        if (serverErrorMessage.success) {

          // Since django returns a list of errors, we join them into a single string and display them in the snackbar.
          const errors = serverErrorMessage.data.non_field_errors.join('\n')
          console.log("errors: ", errors)
          setOpenErrorToast("Error login", errors);
        }
      }
    } catch (error) {
      setOpenErrorToast("Error login", "An unexpected error occurred, please try again later.");
    }
  }



  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full m-auto bg-white lg:max-w-lg">

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to login
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          {/* <Input placeholder="shadcn" {...field} /> */}

                          <Input id="username" placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input id="password" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col !mt-0">
                <Button className="w-full" type="submit">Login</Button>
              </CardFooter>
            </form>
          </Form>
          <div className="relative mb-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 m-2">
            <Button variant="outline" onClick={() => signIn("google", { callbackUrl: "/heroes" })}>
              <Icons.google color="" className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>

          <div>
            <Link
              href="/signup"
            >
              <p className="mt-2 text-xs text-center text-gray-700 mb-2">
                {" "}
                Don't have an account?{" "}
                <span className=" text-blue-600 hover:underline">Sign Up</span>
              </p>

            </Link>
            <Link
              href="/password-reset"
            >
              <p className="mt-2 text-xs text-center text-gray-700 mb-2">
                {" "}
                Did you forget your password?{" "}
                <span className=" text-blue-600 hover:underline">Reset Password</span>
              </p>

            </Link>
          </div>

        </Card>

      </div >
    </div >
  )
}