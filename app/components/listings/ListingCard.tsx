'use client'

import useCountries from "@/app/hooks/useCountries";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {format} from 'date-fns'
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";
interface ListingCardProps{
data : any;
reservation ?: any;
onAction ?:(id : string)=>void;
disabled ?:boolean;
actionLabel ?: string ;
actionId ?: string;
currentUser ?: any | null
}
const ListingCard:React.FC<ListingCardProps> = ({
data,
reservation ,
onAction ,
disabled,
actionLabel,
actionId = "",
currentUser,
}) => {
    const router = useRouter()
    const {getByValue } = useCountries()

    const location = getByValue(data.locationValue)

    console.log('the reservation is ' , reservation)
    const handleCancel = useCallback((
        e:React.MouseEvent<HTMLButtonElement>
    )=>{
        e.stopPropagation()
        if(disabled){
            return ;
        }
        onAction?.(actionId)
    },[onAction , actionId , disabled])

    const price = useMemo(()=>{
        if (reservation){
            return reservation.totalPrice || reservation.price
        }
        return data.price 
    },[reservation , data.price])

    const reservationDate = useMemo(()=>{
        if(!reservation || !reservation.startDate || !reservation.endDate){
            return null
        }
        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)
        return `${format(start , "pp")}- ${format(end, "pp")}`
    },[reservation])
  return (
    <div 
    onClick={()=> router.push(`/listings/${data._id}`)}
    className="col-span-1 cursor-pointer group "
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square
        w-full relative overflow-hidden rounded-xl
        ">
            <Image
            fill
            alt="listing"
            src={data.imageSrc}
            className="object-cover w-full h-full group-hover:scale-110 transition"
            />
            <div className="absolute top-3 right-3">
                <HeartButton
                listingId = {data._id}
                currentUser = {currentUser}
                />
            </div>
        </div>
        <div className="div font-semibold
        text-lg
        ">
            {data?.title}
        </div>
            <div className="div font-semibold
            text-lg
            ">
                {location?.region} , {location?.label}
            </div>
            <div className="font-light text-neutral-500"
            >
                {reservationDate || data.category}
            </div>
            <div className="flex flex-row items-center gap-1">
                <div className="font-semibold">
                ₦{price}
                </div>
                {reservation && (
                    <div className="font-light">/ Month</div>

                )}
            </div>
            {onAction && actionLabel && (
                <Button
                disabled={disabled}
                small
                label={actionLabel}
                onClick={handleCancel}
                />
            )}
      </div>
    </div>
  )
}

export default ListingCard
