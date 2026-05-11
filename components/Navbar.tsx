'use client'

import { assets } from "@/public/assets/assets"
import { useClerk, UserButton, useUser } from "@clerk/nextjs"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

const Navbar = () => {

    const router = useRouter()

    const {user} = useUser()
    const {openSignIn} = useClerk()

  return (
    <div>
        <div className="fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 
    xl:px-32 ">
      <Image src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' onClick={() => router.push('/')} />

      {
        user ? <UserButton />
          : (
            <button onClick={() => openSignIn()} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>
              Get Started < ArrowRight className='w-4 h-4' />
            </button>
          )
      }
    </div>
    </div>
  )
}

export default Navbar