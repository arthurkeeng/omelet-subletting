'use client'

import Image from "next/image"
import { getCurrentUser } from "../actions/getCurrentUser"
import { useEffect, useState } from "react"
import { useAuthentication } from "../actions/authContext"

const Avatar = () => {
      const { isAuthenticated , setIsAuthenticated , user , setUser} = useAuthentication()
  
  const [username , setUsername] = useState(false)
  useEffect(()=>{
    const getUser = async ()=>{
      if(isAuthenticated != null){

        const twoLetters = user?.email?.slice(0,2)
        setUsername(twoLetters?.toUpperCase())
      }
      else{

        setUsername(false)
      }
    }
    getUser()
  },[username , isAuthenticated])
  // const 
  // const {user} = getCurrentUser()
  return (
    <div>
      {isAuthenticated ? <p
      className="font-extrabold mr-2 rounded-[50%] p-2 bg-green-100"
      >{username}</p> :
      
      <Image
      className="rounded-full"
      height={30}
      width={30}
      alt="Avatar"
      src='/images/placeholder.png'
      />
      }
    </div>
  )
}

export default Avatar
