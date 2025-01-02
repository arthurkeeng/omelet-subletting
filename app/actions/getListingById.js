'use server'

import Listing from '@/app/models/Listing.Model'




export default async function getListingById(params){
    const {listingId} = await params
    try {
        const listing = await Listing.findById(listingId).populate('user', 'name email');
        if(!listing) return null;
        return JSON.parse(JSON.stringify(listing))

    } catch (error) {
        console.log("there was an error")
    }

}