"use client"
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Villain } from "../types/Villain";
import CreateVillainCard from "./CreateVillainCard";
import { useState } from "react";
import DeleteVillainAlert from "./DeleteVillainAlert";


const VillainCard = ({ params }: { params: Villain }) => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      {params.name === 'Create New Villain' ? (
        <CreateVillainCard params={params} />
      ) : (

        <div className={`outline-0 focus:ring-2 hover:ring-2 ring-primary transition duration-300 rounded-lg ${!visible ? 'hidden' : ''}`}>
          <Card className="rounded-lg border-3">
            <Link href={`villain/${params.id}`} className="outline-1 focus:ring-2 hover:ring-2 ring-primary transition duration-300 rounded-lg">
              <CardContent className="pt-5">
                <div className="aspect-square relative bg-foreground/4 dark:bg-background rounded-lg">
                  {params.image_url &&
                    <Image
                      src={params.image_url}
                      alt=""
                      // fill
                      width={259}
                      height={259}
                      className="aspect-square object-cover rounded-lg transition-all duration-301 hover:scale-105"
                    />}
                </div>
              </CardContent>

            </Link>
            <CardFooter className="h-full flex-col items-start">
              <div>
                <p className="font-semibold text-lg">{params.name}</p>
                <p className="text-sm text-primary/79">Age: {params.age}</p>
                <p className="text-sm text-primary/79">{params.description}</p>
              </div>
              <div className="flex items-end">
                <DeleteVillainAlert id={params.id} deleteCard={() => setVisible(!visible)} />
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </>


  );
};

export default VillainCard;