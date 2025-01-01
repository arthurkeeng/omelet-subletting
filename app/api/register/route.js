// pages/api/users.js

import { NextResponse } from "next/server";
import dbConnect from "../../lib/mongodb";
import User from "../../models/User.Model";
import bcrypt from 'bcrypt'

const saltRounds = 10
export async function POST(request) {
  try {
    let  body = await request.json()
  
    await dbConnect()
    const hash = await bcrypt.hash(body.password, saltRounds)
    body.hashedPassword = hash
     
    const user = await User.create(body) 
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