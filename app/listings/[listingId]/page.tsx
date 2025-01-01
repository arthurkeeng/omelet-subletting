import { getCurrentUser } from "@/app/actions/getCurrentUser"
import  getReservations  from "@/app/actions/getReservations"
import getListingById from "@/app/actions/getListingById"
import EmptyState from "@/app/components/EmptyState"
import ListingClient from "./ListingClient"


interface IParams{
    listingId : string
}
const page = async ({params} : {params : IParams}) => {
    const listing = await getListingById(
        params

    )
    const reservations = await getReservations(params)
    
    const currentUser = await getCurrentUser()
    if(!listing){
        <EmptyState
        title="No Listing Found"
        subtitle="Try Refreshing the page"
        />
    }
  return (
    <div>
        {/* the listing */}
        <ListingClient
        listing ={listing}
        currentUser = {currentUser}
        reservations={reservations}
        />
   
    </div>
  )
}

export default page
