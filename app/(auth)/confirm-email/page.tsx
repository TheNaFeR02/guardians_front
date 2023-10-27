import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function ConfirmEmailView() {

    return (
        <>
            <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
                <div className="max-w-xl px-5 text-center">
                    <h2 className="mb-2 text-[42px] font-bold text-zinc-800">Confirm Account</h2>
                    <p className="mb-2 text-lg text-zinc-500">An email has been sent to your account, please check the email to verify your account and be able to login.<span className="font-medium text-indigo-500">mail@yourdomain.com</span>.</p>
                    {/* <p>{params.key}</p> */}
                    <Button asChild>
                        <Link href="/" className="mt-3 inline-block w-96 rounded bg-primary px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700">Go back to the App →</Link>
                    </Button>
                </div>
            </div>
        </>
    );
}