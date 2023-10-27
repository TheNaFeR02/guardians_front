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
import PasswordResetConfirmForm from "@/features/authentication/components/password-reset-confirm-form"
import { useRouter } from "next/navigation"

type ParamsType = {
    params: [number, string]
};

export default function PasswordResetConfirm({ params }: { params: ParamsType }) {
    const newPassword = useRef<string>("");
    const newPasswordConfirm = useRef<string>("");
    const { push } = useRouter();
    
    const [uid, token] = params.params;
    console.log(uid, token);

    const onSubmit = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/password/reset/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: uid,
                    token: token,
                    new_password1: newPassword.current,
                    new_password2: newPasswordConfirm.current,
                }),
            });
            const data = await response.json();
            console.log(data);

            if (response.ok) {
                alert("Your password has been reset successfully");
                push('/signin');
            } else {
                alert("Password reset failed");
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
                <div className="w-full m-auto bg-white lg:max-w-lg">
                    <Card>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-center">Create New Password</CardTitle>
                            <CardDescription className="text-center">
                                Confirm your new password
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="newpassword1">New Password</Label>
                                <Input id="newpassword1" type="password" placeholder="Enter new password" onChange={(e) => newPassword.current = e.target.value} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="newpassword2">Confirm New Password</Label>
                                <Input id="newpassword2" type="password" placeholder="Confirm new password" onChange={(e) => newPasswordConfirm.current = e.target.value} />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col">
                            <Button className="w-full" onClick={onSubmit}>Change Password</Button>
                        </CardFooter>
                        {/* <div className="relative mb-2">
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

                    <Link
                        href="/signup"
                    >
                        <p className="mt-2 text-xs text-center text-gray-700 mb-2">
                            {" "}
                            Don't have an account?{" "}
                            <span className=" text-blue-600 hover:underline">Sign up</span>
                        </p>
                    </Link>
 */}
                    </Card>
                </div>
            </div>



        </>
    );
}