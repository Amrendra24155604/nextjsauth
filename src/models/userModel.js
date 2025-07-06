import mongoose from "mongoose";
// import { unique } from "next/dist/build/utils";
import { type } from "os";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please provide a username"],
        unique:true
    },
    email:{

        type:String,
        required:[true,"please provide an email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide a password"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:{
        type:String
    },
    forgotPasswordTokenExpiry:{
        type:Date
    },
    verifyToken:{
        type:String,
    },
    verifyTokenExpiry:{
        type:Date
    }
})

const User = mongoose.models.users || mongoose.model("users",userSchema)
//next js doesnt know if we have already built the User model prior or not
//so we shud use the above expression which says if mongoose.models.users is there 

export default User