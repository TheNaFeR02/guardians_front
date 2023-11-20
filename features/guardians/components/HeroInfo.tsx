'use client'

import DetailsCard from "@/components/DetailsCard";
import { useEffect, useState } from "react";



export default function HeroInfo({ image, backgroundImage, name, description }: { image: string | undefined, backgroundImage: string | undefined, name: string | undefined, description: string | undefined }) {
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        // Set showImage to true after a delay (e.g., 500 milliseconds)
        const timeoutId = setTimeout(() => {
            setShowImage(true);
        }, 500);

        // Clear the timeout if the component unmounts or the image is shown
        return () => clearTimeout(timeoutId);
    }, []); // Empty dependency array ensures the effect runs only once on mount


    return (
        <>
            <div style={{
                backgroundImage: `url("${backgroundImage}")`,
            }} className={`absolute inset-0 max-w-screen bg-cover bg-no-repeat h-auto ${showImage ? 'opacity-5 duration-1000 ease-in-out' : 'opacity-25 duration-500 ease-in-out'}`}>
            </div>
            <div
                className={`relative bottom-0 right-0 mx-auto max-w-screen-2xl h-auto max-h-full bg-center bg-no-repeat transition-opacity ease-in-out ${showImage ? 'opacity-100 duration-1000 ease-in-out' : 'opacity-0 duration-500 ease-in-out'
                    }`}
            >
                <img className="rounded-full" src={`${image}`} alt="" />

                <DetailsCard name={name} description={description}/>
            </div>

        </>

    )
}

