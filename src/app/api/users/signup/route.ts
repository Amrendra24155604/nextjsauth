//next js works on edge i.e. the nearest computing resource near me.
//every file in next js needs to be connected to database


import {connect} from "@/dbConfig/dbOnfig"
import User from "@/models/userModel.js"
import {NextRequest, NextResponse} from "next/server"
import bcrypt from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const{username,email,password} = reqBody
        //validation
        console.log(reqBody);
        const user = await User.findOne({email,username})
        if(user){
            return NextResponse.json({error:"User already exists"},{status: 400}) 
            process.exit(1)
        }
        const salt = await bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);
        
        //send verification email

        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})
        return NextResponse.json({
            message:"User registered successfully",
            success:true,
            savedUser
        })



    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}