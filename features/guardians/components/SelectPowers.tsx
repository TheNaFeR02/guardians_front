'use client'
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { cn } from "@/lib/utils"
import { HeroName } from "@/app/(general)/scheduler/page"
import SuperpowersMap from "../types/Superpowers"

const powersArray = Array.from(SuperpowersMap).map(([name, icon], index) => ({
    id: index + 1, // Assuming you want sequential IDs starting from 1
    name,
  }));

export default function SelectPowers({handleChange}:{handleChange:(id:number, name:string)=>void}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  

  return (

    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? powersArray.find((hero) => hero.name === value)?.name
              : "Select Power..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search power..." />
            <CommandEmpty>No Hero found.</CommandEmpty>
            <CommandGroup>
              {powersArray.map((power) => (
                <CommandItem
                  key={power.name}
                  value={power.name}
                  onSelect={(currentValue) => {
                    handleChange(power.id, power.name)
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === power.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {power.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}