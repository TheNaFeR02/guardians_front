

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
import Sponsor from "../types/Sponsor"


export default function SelectHeroSponsors({ sponsors, handleChange }: { sponsors: Sponsor[], handleChange: (id: number, name: string) => void }) {
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
              ? sponsors.find((sponsor) => sponsor.name === value)?.name
              : "Select sponsor..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search sponsor..." />
            <CommandEmpty>No sponsor found.</CommandEmpty>
            <CommandGroup>
              {sponsors.map((sponsor) => (
                <CommandItem
                  key={sponsor.name}
                  value={sponsor.name}
                  onSelect={(currentValue) => {
                    handleChange(sponsor.id, sponsor.name)
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === sponsor.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {sponsor.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}