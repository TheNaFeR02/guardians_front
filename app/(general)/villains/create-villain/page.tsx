import { options } from "@/app/api/auth/[...nextauth]/options";
import { CreateVillainForm } from "@/features/guardians/components/create-villain-form";
import { Villain } from "@/features/guardians/types/Villain";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { HeroName } from "../../scheduler/page";
import { fetchHeroNames } from "../../heroes/create-hero/page";



export default async function CreateVillainPage() {
  const session = await getServerSession(options)
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server')
  }


  const heroNames: HeroName[] = await fetchHeroNames(session?.user.accessAPIToken)

  return (
    <CreateVillainForm heroNames={heroNames} />
  )
}