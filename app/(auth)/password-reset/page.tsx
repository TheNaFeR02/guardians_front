"use client"
import PasswordResetForm from "@/features/authentication/components/password-reset-form";
import { Loader } from "lucide-react";
import { Suspense } from "react";

export default function PasswordReset() {
    return <Suspense fallback={<Loader />}><PasswordResetForm /> </Suspense>
}