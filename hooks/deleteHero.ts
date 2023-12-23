import { Hero } from "@/features/guardians/types/Hero";
import { parseURL } from "@/utils/parseUrl";
import axios from "axios";
import { cache } from "react";

// export default async function deleteHero(id:number) {
export const delHero = cache(async (id: number, token: string | null | undefined) => {
  const res = await axios.delete<Hero>(parseURL(`/heroes/heroes/${id}/`), {
    headers: {
      // 'Content-Type': 'multipart/form-data', // Do not include the boundary
      'Authorization': `Token ${token}`,
    }

  });
  const data = res.data;
  return data;
})
// }
