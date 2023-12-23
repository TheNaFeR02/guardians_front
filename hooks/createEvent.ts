import { myEvent } from "@/features/scheduler/Scheduler";
import { parseURL } from "@/utils/parseUrl";
import { EventApi, EventInput } from "@fullcalendar/core/index.js";
import axios from "axios";
import { cache } from "react";

export const createEvent = cache(async (event: myEvent, token: string | null | undefined) => {
  const body = JSON.stringify({
    hero: event.hero,
    title: event.title,
    start: event.start,
    end: event.end,
    color: event.color
  })

  try {
    const res = await axios.post(
      parseURL(`/heroes/schedules/`),
      body,
      {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json' // Specify content type as JSON
        }
      }
    );

    const data = res.data;
    return data;
  } catch (error) {
    // Handle error, log it, or throw it again if needed
    console.error('Error creating event:', error);
    throw error;
  }

});