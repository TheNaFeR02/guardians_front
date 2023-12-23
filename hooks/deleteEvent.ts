import { parseURL } from "@/utils/parseUrl";
import { EventApi } from "@fullcalendar/core/index.js";
import axios from "axios";
import { cache } from "react";


export const deleteEvent = cache(async (id: string, token: string | null | undefined) => {
  try {
    const res = await axios.delete(
      parseURL(`/heroes/schedules/${id}/`), {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json' // Specify content type as JSON
      }
    })
    const data = res.data;
    return data;
  } catch (error) {
    // Handle error, log it, or throw it again if needed
    console.error('Error creating event:', error);
    throw error;
  }
})