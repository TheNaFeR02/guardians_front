import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import add from "@/public/add.png"
import { Plus } from "lucide-react";
import { Villain } from "../types/Villain";


export default function CreateVillainCard({ params }: { params: Villain }) {
  return (
    <>
      <Link href='villains/create-villain' shallow className="outline-0 focus:ring-2 hover:ring-2 ring-primary transition duration-300 rounded-lg">
        <Card className="rounded-lg border-2">
          <CardContent className="pt-4">
            <div className="flex justify-center items-center aspect-square relative bg-foreground/5 dark:bg-background rounded-lg">
              <Plus />
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start">
            <div>
              <p className="font-semibold text-lg">{params.name}</p>
              <p className="text-sm text-primary/80">{params.description}</p>
            </div>
            <div className="flex items-center justify-between">{ }</div>
          </CardFooter>
        </Card>
      </Link>
    </>
  )
}