import { Fight } from "@/app/(general)/fights/columns";
import axios from "axios";
import { cache } from "react";



export const delFights = cache(async (idsToDel: Array<number>, token: string | null | undefined) => {
  console.log("entro")
  idsToDel.forEach(async (id) => {
    const res = await axios.delete<Fight>(`http://127.0.0.1:8000/heroes/fights/${id}/`, {
      headers: {
        'Authorization': `Token ${token}`,
      }

    });
    const data = res.data;
    return data;
  })
})