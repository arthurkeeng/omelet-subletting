
import mongoose from "mongoose";


const ReservationSchema = new mongoose.Schema({

    startDate : Date , 
    endDate : Date, 
    totalPrice : Number,
    listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    

        
})
const Reservation = mongoose.models?.Reservation || mongoose.model("Reservation" , ReservationSchema);

export default Reservation