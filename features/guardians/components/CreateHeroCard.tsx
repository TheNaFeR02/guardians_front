import Link from "next/link";
import { Hero } from "../types/Hero";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import add from "@/public/add.png"
import { Plus } from "lucide-react";


export default function CreateHeroCard({ params }: { params: Hero }) {
  return (
    <>


      <Link href='heroes/create-hero' shallow className="outline-0 focus:ring-2 hover:ring-2 ring-primary transition duration-300 rounded-lg">
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