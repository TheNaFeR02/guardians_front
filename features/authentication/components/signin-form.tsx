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


export default function LoginAccount() {
    const username = useRef("");
    const password = useRef("");
    const onSubmit = async () => {
        const result = await signIn("credentials", {
            username: username.current,
            password: password.current,
            redirect: true,
            callbackUrl: "/",
        });
    };

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
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" type="text" placeholder="" onChange={(e) => username.current = e.target.value} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" onChange={(e) => (password.current = e.target.value)} />
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
                    <CardFooter className="flex flex-col">
                        <Button className="w-full" onClick={onSubmit}>Login</Button>
                    </CardFooter>
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
                    <div className="grid grid-cols-2 gap-6 m-2">
                        <Button variant="outline" onClick={() => signIn("github", { callbackUrl: "/profile" })}>
                            <Icons.gitHub className="mr-2 h-4 w-4" />
                            Github
                        </Button>
                        <Button variant="outline">
                            <Icons.twitter className="mr-2 h-4 w-4" />
                            Twitter
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
            </div>
        </div>
    )
}