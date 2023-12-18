import { Context } from "elysia";
import { redis } from "../../helpers/redis";
import { httpError } from "../../helpers/HTTPError";
import { User } from "../../fxn/basicAuth/userClass";
import { signAccessToken } from "../../helpers/jwt/signAccessToken";
import { signRefreshToken } from "../../helpers/jwt/signRefreshToken";
import { checkUA } from "../../fxn/basicAuth/checkUA";

export const verifyOTPController = async (ctx: Context) => {
  const { verification_key, otp }: any = ctx.body;
  const userAgent = ctx.headers["user-agent"];
  try {
    const result =await checkUA(ctx)
    const key = decodeURIComponent(verification_key);
    const verificationData = await redis.hgetall(key);
    if (Object.keys(verificationData).length == 0) {
      throw new httpError(
        404,
        "session not found , may be expired or deleted",
        ctx.set
      ).default();
    }
    if (verificationData.otp != otp)
      throw new httpError(400, "incorrect OTP", ctx.set).default();

    const userManager = new User();
    const userData: any = await userManager.findUserByEmail(
      verificationData.email,
      { email: true }
    );
    console.log(userData);
    if (!userData?.email) throw new httpError(404,"user not found",ctx.set).default()
     

     await userManager.updateToVerified(verificationData.email,ctx.set)
     const accessToken = await signAccessToken({userId:userData.id,email:userData.email,expiresInsec:2*3600},ctx.set)
     const refreshToken = await signRefreshToken({userId:userData.id,expiresInsec:20*24*3600},ctx.set)
   
console.log(result)


    return userData;
  } catch (error: any) {
    const errorMsg = error?.message ?? "default error in verifying OTP";
    return errorMsg;
  }
};

export const updateVerifiedControllerTesting = async (ctx: Context) => {
  const { email }: any = ctx.body;
  const userManager = new User();
  const updateUser = await userManager.updateToVerified(email,ctx.set);
  return updateUser;
};
