
import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    
        email:  {type : String , unique : true , required : true} ,
        name : {type : String} , 
        emailVerified : {type : String},
        image : {type : String},
        hashedPassword  :{type : String , required : true},
        createdAt : {type : Date},
        updatedAt : {type : Date},
        favoriteIds : [{type : mongoose.Schema.Types.ObjectId , ref : "Listing"}],
        accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
        listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listing" }],
        reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }]
    })

// UserSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
//         try {
//           await Account.deleteMany({ user: this._id });
//           next();
//         } catch (error) {
//           next(error);
//         }
// });
const User = mongoose.models?.User || mongoose.model("User" , UserSchema);
export default User