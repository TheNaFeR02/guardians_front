import { options } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import VillainCard from "@/features/guardians/components/VillainCard";
import VillainTabs from "@/features/guardians/components/VillainTabs";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { redirect } from "next/navigation";

async function fetchVillainsData(token: string): Promise<Array<Villain>> {

    try {
        const response = await fetch('http://127.0.0.1:8000/villains/villains/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
            }
        });

        const data = await response.json()

        return data;
    } catch (error) {
        throw new Error("Error while fetching villains data!")
    }

}

export default async function Villains() {
    const session = await getServerSession(options)
    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/server')
    }

    let villainsList: Array<Villain> = [];
    if (session?.user.accessAPIToken) {
        villainsList = await fetchVillainsData(session?.user.accessAPIToken)
    }

    return (
        <>
            <Container>
                <div className="space-y-10 pb-10">
                    <div className="p-4 sm:p-6 lg:p-8 rounded-lg overflow-hidden">
                        <div
                            style={{ backgroundImage: `url(/images/villains/villains_wallpaper.jpg)` }}
                            className="rounded-lg relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
                        >
                            <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                                <div className="font-bold italic text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-black dark:text-white bg-secondary/60 p-4 rounded-lg">
                                    See all the Villains
                                    <Button size="lg" className="w-full py-6 text-xl italic">
                                        <Link href="/heroes">Create your own villain</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* List of villains */}
                    <div id="villains-list" className="">

                        <VillainTabs villainsList={villainsList} />

                    </div>
                    {/* <div id="heroes-list" className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {villainsList.length > 0 ? (
                                    villainsList.map((villain: Villain, index: number) => (
                                        <VillainCard key={index} params={villain} />
                                    ))
                                ) : (
                                    <p>No villains available.</p>
                                )}
                            </div>
                        </div>
                    </div> */}
                </div>

            </Container>
        </>
    )
}