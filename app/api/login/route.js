// pages/api/users.js

import { NextResponse } from "next/server";
import dbConnect from "../../lib/mongodb";
import User from "../../models/User.Model";
import bcrypt from 'bcrypt'
import { cookies } from "next/headers";


async function createSession(email){
  (await cookies()).set('omeenee-session' , email , {
    httpOnly : true , secure : true , sameSite : "strict" , 
    maxAge : 60 * 60 * 24 * 3 , path : "/"
  })
}
export async function POST(request) {
  try {
    let  body = await request.json()
  
    await dbConnect()
    let [user] = await User.find({email : body.email})
    const isPasswordCorrect = 
    await bcrypt.compare(body.password, user.hashedPassword)

   if(!isPasswordCorrect){
    throw new Error("incorrect password")
   }

   await createSession(user.email)

   return new NextResponse(JSON.stringify(user) , {status : 201})


  } catch (error) {
    console.log(error)
    return new Response(
      JSON.stringify({ error: 'Something went wrong' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}



export async function GET(request) {
  const body = await request.json();
  return new Response(
    JSON.stringify({ message: 'User created', data: body }),
    {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}