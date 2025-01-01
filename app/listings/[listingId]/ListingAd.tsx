'use client'

import Heading from '@/app/components/Heading'
import HeartButton from '@/app/components/HeartButton'
import useCountries from '@/app/hooks/useCountries'
import Listing from '@/app/models/Listing.Model'
import Image from 'next/image'
import ListingInfo from './ListingInfo'
interface ListingAdProps{
    title : string , 
    locationValue :string , 
    imageSrc : string , 
    id : string , 
    currentUser ?: any | null
}

const ListingAd:React.FC<ListingAdProps> = ({
    title , 
    locationValue, 
    imageSrc , 
    id , 
    currentUser
}) => {
    const {getByValue} = useCountries()
    const location = getByValue(locationValue)
  return (
    <>
    <Heading
    title = {title}
    subtitle={`${location?.region} , ${location?.label}`}
    />

    <div className="w-full h-[60vh]
    overflow-hidden rounded-xl relative
    ">
        <Image
        alt='image'
        src = {imageSrc}
        fill
        className='object-cover w-full'
        />

        <div className="absolute top-5 right-5">
            <HeartButton
            listingId={id}
            currentUser={currentUser}
            />
            
        </div>
    </div>
    </>
  )
}

export default ListingAd
