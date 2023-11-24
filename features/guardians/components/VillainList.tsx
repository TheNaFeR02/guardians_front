"use client"

import { useState, useEffect } from "react";
import VillainCard from "./VillainCard";
import { Villain } from "../types/Villain";

const newVillain: Villain = {
  id: 0,
  name: 'Create New Villain',
  age: 0,
  image_url: '',
  image_screen_large_url: '',
  description: 'Click to create your own Villain',
  character_enemies: {},
  powers: {},
  weaknesses: {},
}

export default function VillainList({ villainsList, filter }: { villainsList: Array<Villain>, filter: string | undefined }) {


  const [sortedVillains, setSortedVillains] = useState(villainsList);

  useEffect(() => {
    switch (filter) {
      case 'name_asc':
        setSortedVillains(villainsList.slice().sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case 'name_desc':
        setSortedVillains(villainsList.slice().sort((b, a) => a.name.localeCompare(b.name)));
        break;
      case 'age_asc':
        setSortedVillains(villainsList.slice().sort((a, b) => a.age - b.age));
        break;
      case 'age_desc':
        setSortedVillains(villainsList.slice().sort((a, b) => b.age - a.age));
        break;
      default:
        setSortedVillains(villainsList);
        break;
    }
  }, [villainsList, filter]);



  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <VillainCard params={newVillain} />
          {filter !== undefined ? (
            sortedVillains.map((villain, index) => (
              <VillainCard key={index} params={villain} />
            ))
          ) : (
            sortedVillains.map((villain, index) => (
              <VillainCard key={index} params={villain} />
            ))
          )}
        </div>
      </div >
    </>
  )

}