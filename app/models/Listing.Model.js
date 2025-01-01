
import mongoose from "mongoose";


const ListingSchema = new mongoose.Schema({

    title : String , 
    description : String , 
    imageSrc : String , 
    createdAt : Date,
    category : String , 
    roomCount : String , 
    bathroomCount : Number, 
    guestCount : Number , 
    locationValue : String , 
    price : Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
    

        
})

const Listing = mongoose.models?.Listing || mongoose.model("Listing" , ListingSchema);

export default Listing