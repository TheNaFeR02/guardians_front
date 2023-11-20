import { createElement } from "react";
import { Power } from "../types/Hero";
import SuperpowersMap from "../types/Superpowers";
import { ShieldQuestion } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { SizeIcon } from "@radix-ui/react-icons";

const iconsSize = 80;

export default function Superpowers({ powers }: { powers: Power | undefined }) {
  const selectedSuperpower: string = 'Super Strength'; // Replace with the actual superpower
  const iconInstance = SuperpowersMap.get(selectedSuperpower.split(" ").join(""));



  return (
    <div className="flex justify-center h-full gap-10 flex-wrap">
      {/* {
				Array.from(SuperpowersMap.entries()).map(([superpower, iconInstance]) => (
					<button
						key={superpower}
						className="middle none center h-12 max-h-[48px] w-12 max-w-[48px] rounded-lg bg-pink-500 font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
						data-ripple-light="true"
					>
						{createElement(iconInstance)}
					</button>
				))
			} */}
      
        {powers !== undefined &&
          Object.keys(powers).map((key, index) => (
            <HoverCard>
              <HoverCardTrigger className="inline">
                {SuperpowersMap.get(powers[key].split(" ").join("")) !== undefined
                  ? createElement(SuperpowersMap.get(powers[key].split(" ").join(""))!, { size: iconsSize })
                  : <ShieldQuestion size={iconsSize} />
                }</HoverCardTrigger>
              <HoverCardContent>
                <p>{powers[key]}</p>
              </HoverCardContent>
            </HoverCard>
          ))
        }
      


      {/* <button
        className="middle none center h-12 max-h-[48px] w-12 max-w-[48px] rounded-lg bg-pink-500 font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        data-ripple-light="true"
      >
        {iconInstance && createElement(iconInstance)}
      </button> */}
    </div>

  )
}