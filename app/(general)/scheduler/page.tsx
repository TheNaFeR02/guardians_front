import { options } from "@/app/api/auth/[...nextauth]/options"
import DemoApp from "@/features/scheduler/Scheduler"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

// ---------------------------------------------------------------- 
import { EventInput } from '@fullcalendar/core'

let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    // id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    // id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  }
]


export type HeroName = {
  id: number,
  name: string,
}

export async function fetchHeroNames(token: string | null | undefined): Promise<HeroName[]> {
  try {
    const response = await fetch('http://127.0.0.1:8000/heroes/names/', {
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

// ---------------------------------------------------------------- 

export function createEventId() {
  return String(eventGuid++)
}

export default async function SchedulerPage() {
  const session = await getServerSession(options)
  const heroNames: HeroName[] = await fetchHeroNames(session?.user.accessAPIToken)
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server')
  }

  return (
    <>
      <DemoApp heroNames={heroNames} token={session?.user.accessAPIToken}/>
    </>
  )
}