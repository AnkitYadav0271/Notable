import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";

configDotenv();

export const sendOtpMail = async(email,otp) =>{
 const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
       user:process.env.MAIL_USER,
       pass:process.env.MAIL_PASSWORD
    }
 })

 const mailOptions = {
    from:process.env.MAIL_PASSWORD,
    to:email,
    subject:"Password reset OTP",
    html:`<p> Your OTP for password is <b> ${otp} </b> , Valid for only 10 minutes. </p>`
 }

 await transporter.sendMail(mailOptions);
}