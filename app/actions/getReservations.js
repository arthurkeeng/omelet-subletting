

import Reservation from "@/app/models/Reservation.Model"
import User from "@/app/models/User.Model"
import Listing from "@/app/models/Listing.Model"

export default async function getReservations(params){
    const query = {}
    const {listingId , userId , authorId} = params
    if(listingId){
        query.listing = listingId
    }
    if(userId){
        query.user = userId
    }
    if(authorId){
        query.listing = {user : authorId}
    }
    try {
        const reservations = await Reservation.find(query).populate("listing").lean()
        const user = await User.findById(userId, 'favorites'); // Only fetch the favorites field
        if (!user || !user.favoriteIds.length) {
            return []; // Return an empty array if no favorites
        }

        // Step 2: Query the Listing collection for the matching IDs
        const listings = await Listing.find({ listingId: { $in: user.favoriteIds } });

        console.log('the listings' , listings);
        return JSON.parse(JSON.stringify(listings))
    } catch (error) {
        console.log("there was an error getting listings")
        throw new Error(error)
    }
}