
// lib/mongodb.js

import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

const connect = async () =>{
  const connectionState = mongoose.connection.readyState;

  if(connectionState === 1){
    console.log("Already Connected");
    return
  }

  if(connectionState === 2){
    console.log("connectiong...")
    return 
  }

  try {
    mongoose.connect(MONGO_URI , {
      dbName : "omeeneeRealty",
      bufferCommands : true
    })
    console.log("connected")
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export default connect