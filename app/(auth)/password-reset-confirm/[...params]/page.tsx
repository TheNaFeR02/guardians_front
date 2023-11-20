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
import { Suspense, useRef } from "react"
import { useRouter } from "next/navigation"
import { Loader } from "lucide-react"
import PasswordResetConfirm from "@/features/authentication/components/password-reset-confirm-form"

type ParamsType = {
    params: [number, string]
};

export default function PasswordResetConfirmPage({ params }: { params: ParamsType }) {
    return<Suspense fallback={<Loader />}><PasswordResetConfirm params={params}/></Suspense>
}