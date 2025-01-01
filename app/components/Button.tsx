'use client'

import { IconType } from "react-icons"
import getGoogleAuthUrl from '@/app/actions/getGoogleUtils'
import Link from "next/link"
interface ButtonProps{
    label : string , 
    disabled ?: boolean , 
    outline ?: boolean , 
    small ?: boolean, 
    icon?:IconType,
    onClick : (e : React.MouseEvent<HTMLButtonElement>) => void,
    href ?: boolean

}

const Button = ({
    label , 
    disabled , 
    outline , 
    small , 
    icon : Icon,
    onClick  , href
} : ButtonProps) => {
    const url = getGoogleAuthUrl()
  return (
    <button
    onClick={onClick}
    disabled = {disabled}
    className={`relative disabled:opacity-70
        disabled:cursor-not-allowed rounded-lg hover:opacity-50 
        transition w-full
        ${outline ? "bg-white" : "bg-rose-400"}
        ${outline ? "border-black" : "bg-rose-400"}
        ${outline ? "text-black" : "text-white"}
        ${small ? "py-1" : "py-3"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "font-light" : "font-semibold"}
        ${small ? "border-[1px]" : "border-2"}
        `}
    >
        {Icon && (
            <Icon
            size={24}
            className="absolute left-4 top-3"
            />
        )}
        {href ? <Link href={url}>{label}</Link> :
        <>{label}</>
        }
        
    </button>
  )
}

export default Button
