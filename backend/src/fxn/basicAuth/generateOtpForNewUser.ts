import { v4 as uuidv4 } from "uuid";
import { redis } from "../../helpers/redis";
import { httpError } from "../../helpers/HTTPError";
import { sendOTPViaResend } from "../../helpers/emails/sendOTPViaResend";
import { Context } from "elysia";

export const generateOtpForNewUser = async (nickName:string,email: string, ctx: Context) => {
  try {
    const sixthDigitOTP = Math.floor(Math.random() * 1e6);

    const verificationData = {
      otp: sixthDigitOTP,
      email,
    };
    // throw new httpError(403,"gaana",set).default()
    const verification_key = `otp_verification:${uuidv4()}`;

    return  new Promise(async (resolve: any, reject: any) => {
      await redis.hset(
        verification_key,
        verificationData,
        async (err, result) => {
          ctx.cookie.verification_session.value = verification_key
          await redis.expire(verification_key, 15 * 60);
         if(err) reject( new httpError(403,"data has been sent but otp is not generating this time , try again via login",ctx.set).promise());
         else {
          
          await sendOTPViaResend(nickName,[email],sixthDigitOTP,ctx.set);
          resolve("mai jeet gaya 1 din me in")
         }
        }
      );
    });
  } catch (error: any) {
    let errorMsg = error?.message ?? "default error";

    throw new httpError(ctx.set.status as number, errorMsg, ctx.set).default();
  }
};
