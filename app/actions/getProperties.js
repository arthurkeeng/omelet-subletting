

import User from "@/app/models/User.Model"
import Listing from "@/app/models/Listing.Model"

export default async function getProperties(params){
    // const query = {}
    const {userId} = params
    // if(listingId){
    //     query.listing = listingId
    // }
    
    try {
        const user = await User.findById( userId).populate("listings").lean(); // Only fetch the favorites field
        console.log('user ' , user)
        // Step 2: Query the Listing collection for the matching IDs

        return JSON.parse(JSON.stringify(user.listings))
    } catch (error) {
        console.log("there was an error getting listings")
        throw new Error(error)
    }
}