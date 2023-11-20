import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

async function validateEmail(key: string) {

    const body = JSON.stringify({
        key: key,
    });
    console.log(key);
    
    try {

        const res = await fetch(`http://127.0.0.1:8000/api/auth/register/verify-email/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: body,
        });
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

export default async function ConfirmEmailByURL({ params }: { params: { key: string } }) {
    const decodedKey = decodeURIComponent(params.key);
    const data = await validateEmail(decodedKey);

    return (
        <>
            <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
                <div className="max-w-xl px-5 text-center">
                    <h2 className="mb-2 text-[42px] font-bold text-zinc-800">Heads Up!</h2>
                    <p className="mb-2 text-lg text-zinc-500">Your email account has been verified successfully. You can now login to your account. <span className="font-medium text-indigo-500">mail@yourdomain.com</span>.</p>
                    <p>{decodedKey}</p>
                    <Button asChild>
                        <Link href="/" className="mt-3 inline-block w-96 rounded bg-primary px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700">Log in Now →</Link>
                    </Button>
                </div>
            </div>
        </>
    );
}


