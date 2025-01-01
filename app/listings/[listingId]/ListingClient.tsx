'use client'

import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import { useCallback, useEffect, useMemo, useState } from "react";
import ListingAd from "./ListingAd";
import ListingInfo from "./ListingInfo";
import useLogin from "@/app/hooks/useLogin";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "./ListingReservation";
import { Range } from "react-date-range";

const initialDateRange = {
  startDate : new Date(),
  endDate : new Date(),
  key : 'selection',
}
interface ListingClientProps {
  reservations: any;
  listing: any;
  currentUser: any;
}
const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser, reservations =[]
}) => {
  const loginModal = useLogin()
  const router = useRouter()

  const disabledDates = useMemo(()=>{
    let dates : Date[] = []

    reservations.forEach((reservation )=>{
      const range = eachDayOfInterval({
        start : new Date(reservation.startDate), 
        end : new Date(reservation.endDate)
      })

      dates = [...dates , ...range]
    })

    return dates
  },[reservations])



  const category = useMemo(() => {
    return categories.find(item => item.label === listing.category)
  }, [listing.category]);

  const [isLoading , setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange , setDateRange] = useState<Range>(initialDateRange)

  const onCreateReservation = useCallback(()=>{
    if(!currentUser) {
      loginModal.onOpen()
    }
    setIsLoading(true)
    try {
      
      axios.post("/api/reservations" ,{
        totalPrice , startDate : dateRange.startDate, 
        endDate : dateRange.endDate , listingId : listing?._id
      } )
      toast.success("Listing Reserved..")
      setDateRange(initialDateRange)
      router.push("/trips")
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
      
    }
    finally{
      setIsLoading(false)
    }
  },[totalPrice , dateRange , listing?._id , router , currentUser , loginModal])

  useEffect(()=>{
    if(dateRange.startDate && dateRange.endDate){
      const dayCount = differenceInCalendarDays(dateRange.startDate , dateRange.endDate)

      if(dayCount && listing.price){
        setTotalPrice(dayCount * listing.price)
      }
      else{
        setTotalPrice(listing.price)
      }
    }
  },[dateRange , listing.price])


  return <Container>
    <div className="max-w-screen-lg mx-auto
    ">
        <div className="flex flex-col gap-6 ">
            <ListingAd
            title = {listing.title}
            imageSrc = {listing.imageSrc}
            locationValue = {listing.locationValue}
            id = {listing._id}
            currentUser = {currentUser}
            />
            <div className="grid grid-cols-1 md:grid-cols-7
             mt-6 md:gap-10">
                <ListingInfo
                user = {listing.user}
                category = {category}
                description = { listing.description }
                roomCount = {listing.roomCount}
                guestCount = {listing.guestCount}
                bathroomCount = {listing.bathroomCount}
                locationValue = {listing.locationValue}
                />
                <div className="mb-10 order-first
                md:order-last md:col-span-3
                ">
                  <ListingReservation
                  price = {listing.price}
                  totalPrice = {totalPrice}
                  onChangeDate = {value => setDateRange(value)}
                  dateRange = {dateRange}
                  onSubmit = {onCreateReservation}
                  disabled ={isLoading}
                  disabledDates ={ disabledDates}
                  />
                </div>
            </div>
        </div>
    </div>
  </Container>
};

export default ListingClient;
