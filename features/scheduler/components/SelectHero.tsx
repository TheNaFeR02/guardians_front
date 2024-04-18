"use client"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { cn } from "@/lib/utils"
import { HeroName } from "@/app/(general)/scheduler/page"

export default function SelectHero({heroNames, handleChange}:{heroNames:HeroName[], handleChange:(id:number)=>void}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  console.log("value: ",value)


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
              ? heroNames.find(({id, name}) => name.toLowerCase() === value)?.name
              : "Invincible"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search hero..." />
            <CommandEmpty>No Hero Found.</CommandEmpty>
            <CommandGroup>
              {heroNames.map(({id,name}) => (
                <CommandItem
                  key={name}
                  value={name}
                  onSelect={(currentValue) => {
                    handleChange(id)
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

    </>)
}