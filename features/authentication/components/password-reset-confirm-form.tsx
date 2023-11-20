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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import { usePost } from "@/hooks/useFetch"

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
        const response = await usePost({
            url: '/api/auth/password/reset/confirm/',
            method: 'POST',
            data: {
                uid: uid,
                token: token,
                new_password1: newPassword.current,
                new_password2: newPasswordConfirm.current,
            }
        });

        const { statusCode } = response;

        if (statusCode === 200) {
            alert("Your password has been reset successfully");
            push('/signin');
        } else {
            alert("Password reset failed");
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
                    </Card>
                </div>
            </div>



        </>
    );
}