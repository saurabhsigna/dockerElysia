import { Resend } from 'resend';
import { OTPEmailTemplate } from '../../files/sendOTP';
import { httpError } from '../HTTPError';

export const sendOTPViaResend = async(nickName:string,emails:string[],otp:number,set:any)=>{
    const resend = new Resend(process.env.RESEND_API_KEY);
    const data:any = await resend.emails.send({
        from: 'Abhinav Dhangar <transaction@email.freeschooool.com>',
        to: emails,
        subject: 'Your OTP',
        text:"bye sab logs",
        react: OTPEmailTemplate({userFirstName:nickName.split(" ")[0],otp,loginDate:new Date() }),
      });
  
      
      if(data.error){
       
        throw new httpError(data.error?.statusCode,data?.error.message,set).default()
      }
      
      return new Response(JSON.stringify(data));
      
}