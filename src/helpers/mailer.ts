import nodemailer from "nodemailer"
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
export const sendEmail = async({email,emailType,userId}:any)=>{
    try {
        //TODO: configure mail for usage
        const hashedToken = await bcrypt.hash(userId.toString(),10)
        if(emailType === "VERIFY"){
          await User.findByIdAndUpdate(userId,{$set:{verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000}})
        }
        else if(emailType === "RESET"){
          await User.findByIdAndUpdate(userId,{$set:{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+3600000}})
        }
        const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.rr
// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e5a9ca44f7e111",
    pass: "cc9533416199e1"
  }
});

const mailOptions = {
    from: 'hitesh@hitesh.ai',
    to: email,
    subject: emailType==="VERIFY"?"Verify your email":"reset your password",
    html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>to ${emailType==="VERIFY"?"verify your email":"reset your password"}
    or copy and paste the link below in your browser<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
    </p>`, // HTML body
  }

const mailResponse = await transport.sendMail(mailOptions)

    } catch (error:any) {
        throw new Error(error.message)
    }
}