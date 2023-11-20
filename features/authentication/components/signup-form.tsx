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
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { useRef } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import axios from "axios"
import { log } from "console"
import { useRouter } from "next/navigation"
import { usePost } from "@/hooks/useFetch"

export default function SignUpAccount() {
    const username = useRef<string>("");
    const email = useRef<string>("");
    const password1 = useRef<string>("");
    const password2 = useRef<string>("");
    const { push } = useRouter();

    async function onSubmit() {
        const response = await usePost({
            url: '/api/auth/register/',
            method: "POST",
            data: {
                username: username.current,
                email: email.current,
                password1: password1.current,
                password2: password2.current,
            },
        });

        const { data, statusCode } = response;

        if (statusCode === 201) {
            console.log("User registered successfully.");
            push('/confirm-email')
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
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" type="text" placeholder="Enter your username" onChange={(e) => username.current = e.target.value} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="text" placeholder="Enter your email" onChange={(e) => email.current = e.target.value} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password1">Password</Label>
                            <Input id="password1" type="password" placeholder="Enter your password" onChange={(e) => (password1.current = e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password1">Confirm Password</Label>
                            <Input id="password2" type="password" placeholder="Confirm your password" onChange={(e) => (password2.current = e.target.value)} />
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
                        <Button className="w-full" onClick={onSubmit}>Sign Up</Button>

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
                        <Button variant="outline">
                            <Icons.gitHub className="mr-2 h-4 w-4" />
                            Github
                        </Button>
                        <Button variant="outline">
                            <Icons.twitter className="mr-2 h-4 w-4" />
                            Twitter
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