import { options } from "@/app/api/auth/[...nextauth]/options"
import Sponsor from "@/features/guardians/types/Sponsor"
import { parseURL } from "@/utils/parseUrl"
import { throws } from "assert"
import { Heading3 } from "lucide-react"
import { getServerSession } from 'next-auth/next'
import { redirect } from "next/navigation"


async function fetchSponsors(token: string): Promise<Sponsor[]> {
    try {
        const response = await fetch(parseURL('/heroes/sponsors/'), {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
            }
        })
        return await response.json()
    } catch (error) {
        throw new Error('Error while fetching list of sponsors.')
    }

}

export default async function Sponsors() {
    const session = await getServerSession(options)
    let sponsorsList: Sponsor[] = []

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/server')
    }

    if (session?.user.accessAPIToken) {
        sponsorsList = await fetchSponsors(session?.user.accessAPIToken)
    }

    return (
        <div className="h-screen w-full">
            <div className="py-8"></div>
            <div className="sm:max-w-5xl pt-8 rounded-xl mx-4 sm:mx-8 md:mx-auto">
                <div className="w-11/12 sm:w-2/3 mx-auto mb-10">
                    <h1 className="focus:outline-none xl:text-4xl text-3xl text-center text-primary font-extrabold pt-4">Trusted by
                        company sponsor</h1>
                </div>
                <div className="sm:py-6 px-8 sm:24 flex flex-wrap items-center">

                    {sponsorsList.length > 0 ? (
                        sponsorsList.map((sponsor, index) => (
                            
                                <div
                                    key={index}
                                    className="w-1/3 sm:w-1/6 flex justify-center xl:pb-10 pb-16 items-center inset-0 transform hover:scale-75 transition duration-300 contrast-75 hover:contrast-100 drop-shadow-xl"
                                >
                                    <div id="hola" className="w-full h-full rounded-full absolute bottom-20 opacity-0 hover:opacity-100 text-2xl">{sponsor.name}</div>
                                    <img className="rounded-full" src={sponsor.image_url} alt={sponsor.name} role="img" />
                                </div>

                            
                        ))
                    ) : (<p></p>)}

                </div>
            </div>
        </div>
    )
}