import nodemailer from 'nodemailer';
import { configDotenv } from "dotenv"; 

export const verifyEmail = async(token,email)=> {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASSWORD
        }
    })

    const mailConfigurations = {
        from:process.env.MAIL_USER,
        to:email,
        subject:"Email verification ",
        html:<h2>Hey this is just a demo email do not worry</h2>
    }

    transporter.sendMail(mailConfigurations,function(error,info){
        if(error){
            throw new Error(error);
        }

        console.log("Mail send successfully");
        console.log(info);
        
    })
}