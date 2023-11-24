import { options } from "@/app/api/auth/[...nextauth]/options";
import HeroFriends from "@/features/guardians/components/HeroFriends";
import HeroInfo from "@/features/guardians/components/HeroInfo";
import Superpowers from "@/features/guardians/components/Superpowers";
import { Hero } from "@/features/guardians/types/Hero";
import Sponsor from "@/features/guardians/types/Sponsor";
import { throws } from "assert";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

async function fetchHero(id: number, token: string): Promise<Hero> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/heroes/heroes/${id}/`, {
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

async function fetchSponsors(token: string): Promise<Sponsor[]> {
  try {
    const response = await fetch('http://127.0.0.1:8000/heroes/sponsors/', {
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

export default async function HeroPage({ params }: { params: { id: number } }) {
  const session = await getServerSession(options)
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server')
  }
  let heroInfo: Hero | null = null;
  let sponsorsList: Sponsor[] = []


  if (session?.user.accessAPIToken) {
    heroInfo = await fetchHero(params.id, session?.user.accessAPIToken);
    sponsorsList = await fetchSponsors(session?.user.accessAPIToken)
  }

  console.log(sponsorsList)

  const heroSponsorNames = heroInfo?.sponsors
    ? Object.values(heroInfo.sponsors).map((sponsor) => sponsor)
    : [];

  const filteredSponsors = sponsorsList.filter((sponsor) =>
    heroSponsorNames.includes(sponsor.name)
  );

  console.log("filtered: ", filteredSponsors);


  return (
    <>
      <div id="top" className="relative flex justify-center">
        <div className="h-screen">
          <HeroInfo name={heroInfo?.name} description={heroInfo?.description} image={heroInfo?.image_screen_large_url} backgroundImage={heroInfo?.image_url} />
        </div>


      </div>

      {/* Personal Relationships / Hero Friends */}
      {heroInfo?.character_friends && Object.keys(heroInfo?.character_friends).length > 0 && <div className="py-10 text-center m-16">
        <h2 className="text-5xl font-semibold m-16">Personal Relationships</h2>
        <hr className="m-16" />
        <HeroFriends characterFriends={heroInfo?.character_friends} />
      </div>}


      {/* Superpowers */}
      {heroInfo?.powers && Object.keys(heroInfo?.powers).length > 0 && <div className="text-center m-16 py-10">
        <h2 className="text-5xl font-semibold m-16">Powers</h2>
        <hr className="m-16" />
        <Superpowers powers={heroInfo?.powers} />
      </div>}

      {/* Sponsors */}
      {
        heroInfo?.sponsors && Object.keys(heroInfo?.sponsors).length > 0 &&

        <div className="sm:max-w-5xl pt-8 rounded-xl mx-4 sm:mx-8 md:mx-auto">
          <div className="w-11/12 sm:w-2/3 mx-auto mb-10">
            <h1 className="focus:outline-none xl:text-5xl text-3xl text-center text-primary font-semibold pt-4">My Sponsors!</h1>
            <hr className="m-16" />
          </div>
          <div className="sm:py-6 px-8 sm:24 flex flex-wrap items-center justify-center">

            {filteredSponsors.length > 0 && (
              filteredSponsors.map((sponsor, index) => (

                <div
                  className="w-1/3 sm:w-1/6 flex justify-center xl:pb-10 pb-16 items-center inset-0 transform hover:scale-75 transition duration-300 contrast-75 hover:contrast-100 drop-shadow-xl"
                >
                  <div id="hola" className="w-full h-full rounded-full absolute bottom-20 opacity-0 hover:opacity-100 text-2xl">{sponsor.name}</div>
                  <img className="rounded-full" src={sponsor.image_url} alt={sponsor.name} role="img" />
                </div>

              ))
            )}
          </div>
        </div>
      }
    </>)
}