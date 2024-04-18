'use client'

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
import { Icons } from "@/components/icons"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { parseURL } from "@/utils/parseUrl"
import { ServerKnownError } from "@/errors/errors"
import { ErrorToast } from "@/hooks/ErrorToast"
import { registerUser } from "../services/registerUser"
import { useToast } from "@/components/ui/use-toast"

// const formSchema = z.object({
//   username: z.string().min(3, "Username must be at least 3 characters long"),
//   email: z.string().email("Invalid email address"),
//   password1: z.string().min(6, "Password must be at least 6 characters long"),
//   password2: z.string().min(6, "Password must be at least 6 characters long"),
// })

const registerFormSchema = z.object({
  username: z.string()
    .min(1, { message: 'Username is required' })
    .max(100, { message: 'Username must be less than 100 characters' }),
  email: z.string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: z.string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(100, { message: 'Password must be less than 100 characters' }),
  confirmPassword: z.string()
    .min(1, { message: 'Confirm password is required' })
    .max(100, { message: 'Confirm password must be less than 100 characters' })
});

export type RegisterForm = z.infer<typeof registerFormSchema>;

export default function SignUpAccount() {

  const { setOpenErrorToast } = ErrorToast()
  const { push } = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })


  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    try {
      // Handle successful registration
      const response = await registerUser(values);

      toast({ title: "User registered successfully", description: "Redirecting to login page", style: { backgroundColor: "#4caf50", color: "white" } })

      // Wait for 2 seconds before redirecting
      setTimeout(() => {
        push('/signin');
      }, 2000);

    } catch (error) {
      // Handle registration error
      // registerUser can return two types of errors:
      // 1. A server response error, which is a known error
      // 2. An unknown/generic error

      // 1. If there is a server response error, the custom error class has a property called serverErrors
      // which is an object containing the error messages from the server.
      if (error instanceof ServerKnownError) {
        if (error.serverErrors) {
          const errorMessage = error.serverErrors;
          let failureMessage = '';
          for (const key in errorMessage) {
            failureMessage += `${key}: ${errorMessage[key][0]}\n`;
          }

          setOpenErrorToast('Registration Error', failureMessage);
        }
      } else {
        // 2. Not known error
        console.error('Registration failed:', error);
        setOpenErrorToast('Registration failed', 'please try again later.');
      }

    }
  }

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full m-auto bg-white lg:max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to create a new account
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
                          <Input id="username" placeholder="Enter your username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input id="email" type="email" placeholder="Enter your email" {...field} />
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
                          <Input id="password" type="password" placeholder="Enter your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input id="confirmPassword" type="password" placeholder="Enter your password again" {...field} />
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
                <Button className="w-full" type="submit">Sign Up</Button>
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
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>

          <p className="mt-2 text-xs text-center text-gray-700 mb-2">
            {" "}
            Already have an account?{" "}
            <Link
              href="/signin"
            >
              <span className=" text-blue-600 hover:underline">Login</span>
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}