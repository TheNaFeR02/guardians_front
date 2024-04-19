'use client'
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Hero } from "../types/Hero";
import CreateHeroCard from "./CreateHeroCard";
import { Delete } from "lucide-react";
import DeleteHeroAlert from "./DeleteHeroAlert";
import { useState } from "react";



const HeroCard = ({ params }: { params: Hero }) => {
  const [visible, setVisible] = useState(true);

  
  return (
    <>
      {params.name === 'Create New Hero' ? (
        <CreateHeroCard params={params} />
      ) : (
        <>
          <div className={`outline-0 focus:ring-2 hover:ring-2 ring-primary transition duration-300 rounded-lg ${!visible ? 'hidden': ''}`}>

            <Card className="h-full relative rounded-lg border-2" >
              <CardContent className="pt-4">

                <Link href={`hero/${params.id}`} shallow className="">
                  <div className="aspect-square relative bg-foreground/5 dark:bg-background rounded-lg">
                    {params.image_url &&
                      <Image
                        src={params.image_url}
                        alt=""
                        // fill
                        width={240}
                        height={240}
                        className="aspect-square object-cover rounded-lg transition-all duration-300 hover:scale-105"
                      />}

                  </div>
                </Link>
              </CardContent>
              <CardFooter className="h-full flex-col items-start">
                <div className="">
                  <p className="font-semibold text-lg">{params.name}</p>
                  <p className="text-sm text-primary/80">Age: {params.age}</p>
                  <p className="text-sm text-primary/80">{params.description}</p>
                  <p className="text-xs text-primary/80">{params.image_url}</p>
                </div>
                <div className="flex items-end">
                    <DeleteHeroAlert id={params.id} deleteCard={()=>setVisible(!visible)}/>
                </div>
              </CardFooter>
            </Card >
          </div>

        </>

      )
      }

    </>
  );
};

export default HeroCard;


