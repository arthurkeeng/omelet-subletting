import { NextResponse } from "next/server";
import {getCurrentUser} from '@/app/actions/getCurrentUser'
import Listing from "@/app/models/Listing.Model"

export async function POST(request) {
  try {
    const user = await getCurrentUser()
    console.log('the user' , user)
    const body = await request.json();
    const {
      title ,description , imageSrc , category,
      roomCount , bathroomCount , guestCount , location
      , price
    } = body
    
    Object.keys(body).forEach(value =>{
      if (!body[value]){
        NextResponse.error()
      }
    })

    const listing = await Listing.create({
      title , description , imageSrc , category , 
      roomCount , bathroomCount , guestCount , 
      locationValue : location.value , 
      price : parseInt(price , 10) , user : user._id
    })

       return new NextResponse(JSON.stringify(listing) , {status : 201})
    ;

  } catch (error) {
    console.log(error)
    return new Response(
      JSON.stringify({ error: 'Something went wrong' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}


