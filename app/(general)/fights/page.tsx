import { redirect } from "next/navigation"
import { Fight, columns } from "./columns"
import { DataTable } from "./data-table"
import { getServerSession } from "next-auth/next"
import { options } from "@/app/api/auth/[...nextauth]/options"



async function getData(token: string | null | undefined): Promise<Fight[]> {

  try {
    const response = await fetch('http://127.0.0.1:8000/heroes/fights/', {
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

export default async function FightsPage() {
  const session = await getServerSession(options)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server')
  }
  const data = await getData(session?.user.accessAPIToken)

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data}/>
    </div>
  )
}
