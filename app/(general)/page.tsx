import Image from 'next/image'
import Header from '../../components/Header'
import { getServerSession } from 'next-auth/next'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'


export default async function Home() {
  const session = await getServerSession(options)

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/server')
    }
    
  return (
   <>
    {/* <p>This is how we do conditional rendering based on the role</p> */}
   {/* {session?.user.role === 'user' && <p>This is a basic user</p>}
   
   {session?.user.role === 'prueba' && <p>This is a prueba user</p>} */}
   <h1>Hello Mom!</h1>
   <p>See this component code to see conditional rendering based on rol </p>
   </>
  )
}
