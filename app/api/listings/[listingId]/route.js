import User from "@/app/models/User.Model";
import Listing from "@/app/models/Listing.Model";


import {NextResponse} from 'next/server'

import {getCurrentUser} from "@/app/actions/getCurrentUser"


export async function POST (request, 
    {params} 
){
    const { listingId } = await params

    const currentUser = await getCurrentUser()
    if(!currentUser) {
        return NextResponse.error()
    }
    console.log('the currentuser is ' , currentUser)
    if(!listingId || typeof listingId !== "string"){
        throw new Error("Invalid ID")
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])]
    favoriteIds.push(listingId)

    const user = await User.findByIdAndUpdate(
        currentUser._id,
        { $addToSet: { favoriteIds } }, // Ensures no duplicates
        { new: true } // Returns the updated document
      );

    return NextResponse.json(user)
}


export async function DELETE(request , {params}){

    const {listingId} = await params



    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    if(!listingId || typeof listingId !== "string") {
        throw new Error("invalid Id")

    }

    try{
        const listing = await Listing.findOneAndDelete({user : currentUser._id , _id : listingId})
        // await Listing.findByIdAndDelete(listingId);
        if(listing){await User.findByIdAndUpdate(listing.user, {
            $pull: { listings: listing._id }
          });
        
        }
          return NextResponse.json({msg : "Listing Deleted"})
    }catch(e){
        console.log("An error occured")
    }

}