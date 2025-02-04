'use client'

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "./Avatar"
import { useCallback, useEffect, useState } from "react"
import MenuItem from "./MenuItem"
import useRegister from "../hooks/useRegister"
import useLogin from "../hooks/useLogin"
import { logoutCurrentUser } from "../actions/getCurrentUser"
import { usePathname, useRouter } from "next/navigation"
import { useAuthentication } from "../actions/authContext"
import useRent from "../hooks/useRent"

const UserMenu = () => {
    const { isAuthenticated , setIsAuthenticated , user } = useAuthentication()
    const pathname = usePathname()
    const router = useRouter()
    const registerModal = useRegister()
    const loginModal = useLogin()
    const rentModal = useRent()
    const [isOpen ,setIsOpen] = useState(false)
    const toggleOpen = useCallback(() =>{
        setIsOpen(prev => !prev)
    },[])

    const logout = async() =>{
        const loggedOut  = await logoutCurrentUser()
        setIsOpen(false)
        if(loggedOut?.clearedCookie) {
            setIsAuthenticated(false)
            router.push('/')
        }

    }
    useEffect(()=>{
        setIsOpen(false)
    }  , [isAuthenticated, pathname])
    const onRent = useCallback(()=>{
        setIsOpen(false)
        if( !isAuthenticated) {
            return loginModal.onOpen()

    }
        // open rent modal
        rentModal.onOpen()
    
    },[user , isAuthenticated , loginModal , rentModal])

  return (
    <div className="relative">
        <div className="flex flex-row items-center gap-3">
            <div className="
            hidden md:block text-sm font-semibold py-3 px-4
            rounded-full hover:bg-neutral-100 transition cursor-pointer
            " onClick={onRent}>
                Sublet Your Property
            </div>
        <div className="
        p-4 md:py-1 md:px-2 
        border-[1px] border-neutral-200 flex flex-row
        items-center gap-3 rounded-full cursor-pointer
        hover:shadow-md transition
        " onClick={toggleOpen}>
            <AiOutlineMenu/>
            <div className="hidden md:block"></div>
            <Avatar/>
        </div>
        </div>
        {isOpen && (
            <div className="absolute
            rounded-xl shadow w-[40vw]
            md:w-3/4 bg-white overflow-hidden
            right-0 top-12 text-sm
            ">
                <div className="flex flex-col cursor-pointer">
                    {
                        isAuthenticated ? 
                        <>
                    <MenuItem
                    onClick={()=>{router.push('/trips')}}
                    label="Favorites"
                    />
                    {/* <MenuItem
                    onClick={()=>{}}
                    label="Favorites"
                    /> */}
                    {/* <MenuItem
                    onClick={()=>{}}
                    label="My Reservations"
                    /> */}
                    <MenuItem
                    onClick={()=>{
                        router.push('/properties')
                    }}
                    label="My Properties"
                    />
                    <MenuItem
                    onClick={()=>{
                        setIsOpen(false)
                        rentModal.onOpen()}}
                    label="Sublet Property"
                    />
                     <hr/>
                    <MenuItem
                    onClick={logout}
                    label="Logout"
                    />

                    
                    </>
                        : 
                    <>
                    <MenuItem
                    onClick={loginModal.onOpen}
                    label="Login"
                    />
                    <MenuItem
                    onClick={registerModal.onOpen}
                    label="SignUp"
                    />
                    
                    </>
                    }
                </div>
            </div>
        )}
      
    </div>
  )
}

export default UserMenu
