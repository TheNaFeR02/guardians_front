import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { options } from "../api/auth/[...nextauth]/options"

export default async function Home() {
  const session = await getServerSession(options)

  if (session) {
    redirect('/heroes')
  }

    return (
        <>
            <h1>Home Page</h1>
        </>
    )
}