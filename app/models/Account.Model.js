
import mongoose from "mongoose";


const AccountSchema = new mongoose.Schema({
        type : String , 
        provider : String , 
        providerAccountId : String , 
        refresh_token : String , 
        access_token : String , 
        expires_at : Number , 
        token_type : String , 
        scope : String , 
        id_token : { type: mongoose.Schema.Types.ObjectId, ref: "Listings" },
        session_state : String, 
        user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        
    })
const Account = mongoose.models?.Account || mongoose.model("Account" , AccountSchema);

export default Account