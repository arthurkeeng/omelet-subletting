

import Listing from "@/app/models/Listing.Model"
export default async function getListings(){

    try {
        const listings = await Listing.find().populate('user', 'name email').sort({createdAt : -1})
        
        return JSON.parse(JSON.stringify(listings))
    } catch (error) {
        console.log("there was an error getting listings")
        throw new Error(error)
    }
}