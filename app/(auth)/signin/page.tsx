import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"


import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
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
import LoginAccount from "@/features/authentication/components/signin-form"
import { ReactComponentElement } from "react"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  return (
    <>
      <div className="hidden">


      </div>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"

      >
        <Link
          href="/signup"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8 z-10"
          )}
        >
          Sign Up
        </Link>
        <div className="relative hidden h-full flex-col p-10  text-white dark:border-r lg:flex bg-no-repeat object-cover bg-cover bg-center"

          style={{ backgroundImage: `url(https://www.imagebee.org/comics/guardians-of-the-globe/guardians-of-the-globe-10-585x892.jpg)` }}
        >
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>


            Guardians
          </div>
          <div className="relative z-20 mt-auto"
          >
            <blockquote className="space-y-2">
              <p className="text-lg drop-shadow backdrop-blur-sm rounded-2xl">
                &ldquo;This project offers a comprehensive platform where users can engage with a diverse array of characters, each possessing distinct superpowers and intricate narratives. The functionality of the project extends to a carefully structured schedule, allowing users to navigate through a series of meticulously choreographed battles between heroes and villains. This immersive experience is underpinned by a seamless interface, providing enthusiasts with a formal and enriching encounter with the dynamic world of superheroic storytelling."&rdquo;
              </p>
              <footer className="text-sm">Guardians of the Globe</footer>
            </blockquote>
          </div>
        </div>

        <LoginAccount />

      </div>



      






    </>
  )
}