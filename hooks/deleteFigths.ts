import { Fight } from "@/app/(general)/fights/columns";
import { parseURL } from "@/utils/parseUrl";
import axios from "axios";
import { cache } from "react";



export const delFights = cache(async (idsToDel: Array<number>, token: string | null | undefined) => {
  console.log("entro")
  idsToDel.forEach(async (id) => {
    const res = await axios.delete<Fight>(parseURL(`/heroes/fights/${id}/`), {
      headers: {
        'Authorization': `Token ${token}`,
      }

    });
    const data = res.data;
    return data;
  })
})