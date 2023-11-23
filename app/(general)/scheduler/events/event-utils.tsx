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


export default async function fetchHeroEvents(token: string|null): Promise<EventInput[]> {
  try {
    const response = await fetch('http://127.0.0.1:8000/heroes/schedules/', {
      method: 'GET',
      headers: { 'Authorization': `Token ${token}` },
    })
    console.log("",await response.json())
    return INITIAL_EVENTS
  } catch (error) {
    throw new Error('Error while fetching list of sponsors.')
    // return undefined
  }
}



export function createEventId() {
  return String(eventGuid++)
}