"use client"

import { useMemo, useState, useEffect } from "react";
import { Hero } from "../types/Hero";
import HeroCard from "./HeroCard";



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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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







