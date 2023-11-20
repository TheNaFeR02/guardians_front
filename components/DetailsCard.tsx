'use client'
import { TypeAnimation } from 'react-type-animation';



export default function DetailsCard({ name, description }: { name: string | undefined, description: string | undefined }) {


    return (
        <>
            <div className="flex justify-center">

                <div className="relative w-256 flex b-transparent flex-col rounded-xl bg-transparent text-primary bg-clip-border text-gray-700">

                    <div className="flex flex-col p-6">
                        <h5 className="mb-2 block font-sans text-6xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased text-center">
                            {/* {name} */}
                            {name && <TypeAnimation sequence={['', 1000, name]} speed={1} />}
                        </h5>
                        <p className="block font-sans text-3xl font-light leading-relaxed text-inherit antialiased">
                            {description}
                        </p>
                    </div>
                    <div className="p-6 pt-0 flex justify-center">
                        <button
                            className="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            data-ripple-light="true"
                        >
                            Read More
                        </button>
                    </div>

                </div>



            </div>


        </>

    )
}


