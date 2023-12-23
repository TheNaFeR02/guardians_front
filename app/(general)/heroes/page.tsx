import { getServerSession } from 'next-auth/next'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import Container from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Hero } from '@/features/guardians/types/Hero'
import HeroTabs from '@/features/guardians/components/HeroTabs'
import { parseURL } from '@/utils/parseUrl'



async function fetchHeroData(token: string) {
  const response = await fetch(parseURL('/heroes/heroes/'), {
    method: 'GET',
    headers: {
      'Authorization': `Token ${token}`,
    }
  });

  const data = await response.json();

  return data;
}

export const revalidate = 10; //revalidate every 10 seconds

export default async function Home() {
  const session = await getServerSession(options)
  let heroesList: Array<Hero> = [];

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server')
  }

  if (session?.user.accessAPIToken) {
    heroesList = await fetchHeroData(session?.user.accessAPIToken);
  }

  return (
    <>
      <Container>
        <div className="space-y-10 pb-10">
          <div className="p-4 sm:p-6 lg:p-8 rounded-lg overflow-hidden">
            <div
              style={{ backgroundImage: `url(/got-hero.jpg)` }}
              className="rounded-lg relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
            >
              <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                <div className="font-bold italic text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-black dark:text-white bg-secondary/60 p-4 rounded-lg">
                  Choose your Hero
                  <Button size="lg" className="w-full py-6 text-xl italic">
                    <Link href="#heroes-list">See Heroes</Link>

                  </Button>
                  
                </div>
              </div>
            </div>
          </div>
          {/*------------------------ List of heroes ------------------------*/}

          <div id="heroes-list" className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">

            <HeroTabs heroesList={heroesList} />

          </div>

          {/* ---------------------------------------------------------------*/}
        </div>

      </Container>
    </>
  )
}
