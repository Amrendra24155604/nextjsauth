import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log("MONGO db connected");
        })
        connection.on("error",(err)=>{
            console.log("Mongo db connection error, please make sure db is upto date and running "+err);
            process.exit()
        })
    } catch (error) {
        console.log("Something went wrong while connecting to database");
        console.log(error);
        
        
    }
}
