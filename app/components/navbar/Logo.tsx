'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo = () => {
  const router = useRouter()
  return (
    <Image 
    onClick={()=> router.push('/')}
    alt = 'logo'
    className="hidden md:block cursor-pointer rounded"
    height={30}
    width={30}
    src='/images/logo.png'

    />
  )
}

export default Logo
