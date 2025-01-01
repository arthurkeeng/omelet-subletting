'use client'
import React, { useCallback, useState } from 'react'
import Container from '../components/Container'
import Heading from '../components/Heading'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import ListingCard from '../components/listings/ListingCard'


interface TripsProps{
    reservations : any , 
    currentUser ?: any | null
}
const Trips:React.FC<TripsProps> = ({
    reservations , currentUser
}) => {
    const router = useRouter();
    const [deletingId , setDeletingId] = useState("");

    const onCancel = useCallback((id : string)=>{
        setDeletingId(id)
        axios.delete(`/api/reservation/${id}`)
        .then(()=>{
            toast.success("Reservation Canceled")
        }).catch((error : any)=> {
            console.log(error)
            toast.error("Failed to Cancel Reservation");
        }).finally(()=>{
            setDeletingId("")
        })
    
    },[router])
  return (
    <Container>
        <Heading 
        title='Trips'
        subtitle="Where You've Been And Where You're Going"
        />
        <div className="mt-10
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
        gap-8 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6
        ">

        {reservations.map((reservation:any) =>(
            <ListingCard
            key={reservation._id}
            data={reservation}
            reservation={reservation}
            actionId={reservation._id}
            onAction={onCancel}
            disabled={deletingId === reservation._id}
            actionLabel='Cancel Reservation'
            currentUser={currentUser}

            />
        ))}
        </div>
    </Container>
  )
}

export default Trips
