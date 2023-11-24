"use client"


import { HeroName } from "@/app/(general)/scheduler/page"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react"


export default function SelectHeroFriends({ heroNames, handleChange }: { heroNames: HeroName[], handleChange: (id: number, name: string) => void }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")


  return (

    <>
      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? heroNames.find((hero) => hero.name === value)?.name
              : "Select Hero..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search hero..." />
            <CommandEmpty>No Hero found.</CommandEmpty>
            <CommandGroup>
              {heroNames.map((hero) => (
                <CommandItem
                  key={hero.name}
                  value={hero.name}
                  onSelect={(currentValue) => {
                    handleChange(hero.id, hero.name)
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === hero.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {hero.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

    </>
  )
}