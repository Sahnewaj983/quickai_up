'use client'

import { useRouter } from "next/navigation"

const Button = () => {

    const router = useRouter()

  return (
    <div>
        <button 
        onClick={() => router.push('/ai')} 
        className="bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 
        active:scale-95 transition cursor-pointer">Start creating now</button>
    </div>
  )
}

export default Button