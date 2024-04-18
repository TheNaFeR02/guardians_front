import '@/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/ui/sidebar'
import Header from '@/components/Header'
import Provider from '@/app/(general)/providers'
import { options } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import AuthenticationPage from '../(auth)/signin/page'
import { headers } from "next/headers";
import localFont from 'next/font/local'

// const inter = Inter({ subsets: ['latin'] })
const myFont = localFont({ src: '../../font/Roboto-Regular.ttf' })

export const metadata: Metadata = {
  title: 'Guardians of the Globe',
  description: 'Your best heroes and villains from the Invincible universe',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const headersList = headers();
  // read the custom x-url header
  const pathname = headersList.get('x-url') || "";

  console.log(/\/hero\/\d+$/.test(pathname));
  return (
    <html lang="en" suppressHydrationWarning >
      <body className={myFont.className}>


        <div className="flex h-screen "> {/*overflow-hidden*/}
          <Provider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {/* <!-- ===== Sidebar Start ===== --> */}
            {/* <Sidebar/> */}
            {/* <!-- ===== Sidebar End ===== --> */}



            {/* <!-- ===== Content Area Start ===== --> */}
            <div className="scroll-smooth relative flex flex-1 flex-col"> {/*overflow-y-auto overflow-x-hidden*/}
              {/* <!-- ===== Header Start ===== --> */}

              <Header />

              {/* <!-- ===== Header End ===== --> */}

              {/* <!-- ===== Main Content Start ===== --> */}
              <main>

                {/\/hero\/\d+$/.test(pathname)
                  ? (
                    <div className=" ">
                      {children}
                    </div>
                  )
                  : <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    {children}
                  </div>

                }



              </main>
              {/* <!-- ===== Main Content End ===== --> */}
            </div>
            {/* <!-- ===== Content Area Start ===== --> */}

          </Provider>
        </div>


        {/* Implement loading... */}



      </body>
    </html >
  )
}
