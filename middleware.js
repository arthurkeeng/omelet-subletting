import { NextResponse } from "next/server"
import { getCurrentUser } from "./app/actions/getCurrentUser"

export async function middleware(request){
 

    // // let user =await getCurrentUser()
    // if(!user)
    //     {
    //     return NextResponse.redirect(new URL('/' , request.url))
    
    // }

    // return NextResponse.next()
    
    
    
}

export const config = {
    matcher : ["/" , '/rooms/add' , '/rooms/my']
}
