'use server'

import {  cookies } from "next/headers";
import User from '../models/User.Model'
import dbConnect from '@/app/lib/mongodb'

export const getCurrentUser = async ()=>{
    try {
        await dbConnect()
        const cookie = (await cookies()).get('omeenee-session') ;
       
        const [user] = await User.find({email : cookie.value}).lean()
        user._id = user._id.toString()
        const {_id , email , favoriteIds} = JSON.parse(JSON.stringify(user))
        return {_id , email , favoriteIds}

    } catch (error) {
        console.log(error)
        return null
    }
}

export const logoutCurrentUser = async ()=>{
    try {
        (await cookies()).set('omeenee-session', '', { path: '/', expires: new Date(0) })
        return {
            clearedCookie : true
        }
    } catch (error) {
        console.log('There was an error logging out')
    }
}
