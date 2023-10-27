"use client"
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordResetForm from "@/features/authentication/components/password-reset-form";
import Link from "next/link";
import { useRef } from "react";

export default function PasswordReset(){
   const email = useRef<string>(""); 
   
    const onSubmit = async () => {

    };

    return(
    <>
        <PasswordResetForm /> 
    </>);
}