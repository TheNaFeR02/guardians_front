import { CreateHeroForm } from "@/features/guardians/components/create-hero-form";
import { HeroName } from "../../scheduler/page";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Sponsor from "@/features/guardians/types/Sponsor";
import { parseURL } from "@/utils/parseUrl";

export async function fetchHeroNames(token: string | null | undefined): Promise<HeroName[]> {
  try {
    const response = await fetch(parseURL('/heroes/names/'), {
      method: 'GET',
      headers: { 'Authorization': `Token ${token}` },
    })
    // console.log("", await response.json())
    return await response.json()
  } catch (error) {
    throw new Error('Error while fetching list of Hero names.')
    // return undefined
  }
}

async function fetchSponsors(token: string| null): Promise<Sponsor[]> {
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

export default async function CreateHeroPage() {
  const session = await getServerSession(options)

  
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server')
  }
  const heroNames: HeroName[] = await fetchHeroNames(session?.user.accessAPIToken)
  const sponsors: Sponsor[] = await fetchSponsors(session?.user.accessAPIToken)


  return (
    <CreateHeroForm heroNames={heroNames} sponsors={sponsors}/>
  );
}