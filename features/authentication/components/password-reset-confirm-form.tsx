import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRef } from "react";

export default function PasswordResetConfirmForm({ params }: { params: [Number, string] }) {

    const newPassword = useRef<string>("");
    const newPasswordConfirm = useRef<string>("");

    console.log(params);


    const onSubmit = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/password/reset/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: params[0],
                    token: params[1],
                    new_password1: newPassword.current,
                    new_password2: newPasswordConfirm.current,
                }),
            });
            const data = await response.json();
            console.log(data);

            if (response.ok) {
                alert("Password reset email sent");
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
                    </Card>
                </div>
            </div>
        </>);
}

