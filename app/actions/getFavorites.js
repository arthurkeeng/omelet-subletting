

import Reservation from "@/app/models/Reservation.Model"
import User from "@/app/models/User.Model"
import Listing from "@/app/models/Listing.Model"

export default async function getFavorites(params){
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
        const user = await User.findById( userId); // Only fetch the favorites field
        if (!user || !user.favoriteIds.length) {
            return []; // Return an empty array if no favorites
        }

        const favoriteListings = await Listing.find({
            _id: { $in: user.favoriteIds }
          });
        // Step 2: Query the Listing collection for the matching IDs

        return JSON.parse(JSON.stringify(favoriteListings))
    } catch (error) {
        console.log("there was an error getting listings")
        throw new Error(error)
    }
}