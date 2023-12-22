import { Context } from "elysia";
import { User } from "../../fxn/basicAuth/userClass";
import { httpError } from "../../helpers/HTTPError";
import { comparePassword } from "../../fxn/basicAuth/password";
import { signAccessToken } from "../../helpers/jwt/signAccessToken";
import { signRefreshToken } from "../../helpers/jwt/signRefreshToken";
import { generateOtpForNewUser } from "../../fxn/basicAuth/generateOtpForNewUser";


export const LoginController = async(ctx:Context) => {


    try {
        
  const { email, password }:any = await ctx.body;
console.log(email,password)
  const userManager =  new User()
  const user:any = await userManager.findUserByEmail(email,{email:true,id:true,name:true,hashed_password:true, profilePic:true, isVerified:true})
  await comparePassword(password,user?.hashed_password,ctx.set)
  

  if(!user){
   throw new httpError(404,"user not found",ctx.set).default()
  }
  console.log(user?.isVerified ," veerif")
  if(!user?.isVerified) {
    await generateOtpForNewUser(user?.name,email, ctx);
    throw new httpError(400,"user not verified , we have send otp to your mail! please verify first",ctx.set).default()
  }
 
    const accessToken = await signAccessToken({userId:user?.id,email:user?.email,expiresInsec:2*3600},ctx.set)
    const refreshToken = await signRefreshToken({userId:user?.id,expiresInsec:20*24*3600},ctx.set)
 return {accessToken,refreshToken}

    } catch (error:any) {
return error?.message 
   }
  

  

}



// export const checkPasswordController = async (ctx:Context)=>{
// try {
//     const {email,password}:any = await ctx.body
//     const userManager =  new User()
//     const user:any = await userManager.findUserByEmail(email,{name:true,hashed_password:true})
//      await comparePassword(password,user?.hashed_password,ctx.set)

//      if(!user?.isVerified) {
//         await generateOtpForNewUser(user?.name,email, ctx);
//         throw new httpError(400,"user not verified , we have send otp to your mail! please verify first",ctx.set).default()}
//      const accessToken = await signAccessToken({userId:user?.id,email:user?.email,expiresInsec:2*3600},ctx.set)
//      const refreshToken = await signRefreshToken({userId:user?.id,expiresInsec:20*24*3600},ctx.set)
//      console.log("helelo")
//      return {accessToken,refreshToken}

// } catch (error:any) {
//   return error?.message
// }
    

// }