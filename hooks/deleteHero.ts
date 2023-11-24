import { Hero } from "@/features/guardians/types/Hero";
import axios from "axios";
import { cache } from "react";

// export default async function deleteHero(id:number) {
export const delHero = cache(async (id: number, token: string | null | undefined) => {
  const res = await axios.delete<Hero>(`http://127.0.0.1:8000/heroes/heroes/${id}/`, {
    headers: {
      // 'Content-Type': 'multipart/form-data', // Do not include the boundary
      'Authorization': `Token ${token}`,
    }

  });
  const data = res.data;
  return data;
})
// }
