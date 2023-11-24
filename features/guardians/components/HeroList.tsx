"use client"

import { useMemo, useState, useEffect, createElement } from "react";
import { Hero } from "../types/Hero";
import HeroCard from "./HeroCard";
import { LucideIcon, Plus } from "lucide-react"

type CreateHero = Hero & {
  addicon: LucideIcon,
  description: string,
}



const newHero: Hero = {
  id: 0,
  name: 'Create New Hero',
  age: 0,
  image_url: '',
  image_screen_large_url: '',
  description: 'Click to create your own Hero',
  character_friends: {},
  powers: {},
  sponsors: {},
};

export default function HeroList({ heroesList, filter }: { heroesList: Array<Hero>, filter: string | undefined }) {


    const [sortedHeroes, setSortedHeroes] = useState(heroesList);

    useEffect(() => {
        switch (filter) {
            case 'name_asc':
                setSortedHeroes(heroesList.slice().sort((a, b) => a.name.localeCompare(b.name)));
                break;
            case 'name_desc':
                setSortedHeroes(heroesList.slice().sort((b, a) => a.name.localeCompare(b.name)));
                break;
            case 'age_asc':
                setSortedHeroes(heroesList.slice().sort((a, b) => a.age - b.age));
                break;
            case 'age_desc':
                setSortedHeroes(heroesList.slice().sort((a, b) => b.age - a.age));
                break;  
            default:
                setSortedHeroes(heroesList);
                break;
        }
    }, [heroesList, filter]);



    return (
        <>
            <div className="space-y-4">
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          <HeroCard params={newHero}/>
                    {filter !== undefined ? (
                        sortedHeroes.map((hero, index) => (
                            <HeroCard key={index} params={hero} />
                        ))
                    ) : (
                        sortedHeroes.map((hero, index) => (
                            <HeroCard key={index} params={hero} />
                        ))
                    )}
                </div>
            </div >
        </>
    )

}







