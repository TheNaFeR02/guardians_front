import { options } from "@/app/api/auth/[...nextauth]/options";
import Superpowers from "@/features/guardians/components/Superpowers";
import VillainEnemies from "@/features/guardians/components/VillainEnemies";
import VillainInfo from "@/features/guardians/components/VillainInfo";
import Sponsor from "@/features/guardians/types/Sponsor";
import { Villain } from "@/features/guardians/types/Villain";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

async function fetchVillain(id: number, token: string): Promise<Villain> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/villains/villains/${id}/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    return await response.json()
  } catch (error) {
    throw Error('Error while fetching Hero Info.');
  }
}

export default async function HeroPage({ params }: { params: { id: number } }) {
  const session = await getServerSession(options)
  let villainInfo: Villain | null = null

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server')
  }

  if (session?.user.accessAPIToken) {
    villainInfo = await fetchVillain(params.id, session?.user.accessAPIToken)
  }


  return (
    <>
      <div id="top" className="relative flex justify-center">
        <div className="h-screen">
          <VillainInfo name={villainInfo?.name} description={villainInfo?.description} image={villainInfo?.image_screen_large_url} backgroundImage={villainInfo?.image_url} />
        </div>
      </div>

      {/* Villain Enemie / Hero  */}
      {villainInfo?.character_enemies && Object.keys(villainInfo?.character_enemies).length > 0 && <div className="py-10 text-center m-16">
        <h2 className="text-5xl font-semibold m-16">Villain Enemies</h2>
        <hr className="m-16" />
        <VillainEnemies characterEnemies={villainInfo?.character_enemies} />
      </div>}

      {/* Superpowers */}
      {villainInfo?.powers && Object.keys(villainInfo?.powers).length > 0 && <div className="text-center m-16 py-10">
        <h2 className="text-5xl font-semibold m-16">Powers</h2>
        <hr className="m-16" />
        <Superpowers powers={villainInfo?.powers} />
      </div>}
    </>
  )
}
