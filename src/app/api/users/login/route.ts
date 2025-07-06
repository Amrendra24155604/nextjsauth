import {connect} from "@/dbConfig/dbOnfig"
import User from "@/models/userModel.js"
import {NextRequest, NextResponse} from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

connect()
export async function POST(request:NextRequest){
try {
    
        const reqBody = await request.json()
        const {email,password} = reqBody
        console.log(reqBody);
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User does not exist"},{status:400})
        }

        console.log("User exists");
        
        const validPassword = await bcrypt.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error:"check your credentials"},{status:400})
        }

        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }

        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})
        const response = NextResponse.json({
            message:"Logged in success",
            success:true
        })

        response.cookies.set("token",token,{
            httpOnly:true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
        })
        return response


    }
 catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})

}}