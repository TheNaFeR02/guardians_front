
"use client"
import { delHero } from "@/hooks/deleteHero";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/registry/new-york/ui/button";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { delVillain } from "@/hooks/deleteVillain";



export default function DeleteHeroAlert({ id, deleteCard }: { id: number, deleteCard: () => void }) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/client')
    }
  })

  async function deleteVillain() {
    // console.log(id);
    
      console.log('No user', session?.user.accessAPIToken);
      await delVillain(id, session?.user.accessAPIToken);
      deleteCard(); 
    
  }

  return (
    <>
      <AlertDialog >
        <AlertDialogTrigger className="bg-red-500 mt-3 h-8 rounded-md px-3 text-xs text-white">Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your villain
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteVillain}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}