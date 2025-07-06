import {connect} from "@/dbConfig/dbOnfig"
import User from "@/models/userModel"
import {NextRequest,NextResponse} from "next/server"
import { getDataFromToken } from "@/helpers/getdatafromts"

connect()
export async function GET(request:NextRequest){
try {
    
        //extract data from token
        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id:userId}).select("-password")
        if(!user)
            return NextResponse.json({
        message:"oops",
        data:user
    })
        return NextResponse.json({
            message:"User found",
            data:user
        })
    }
catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}