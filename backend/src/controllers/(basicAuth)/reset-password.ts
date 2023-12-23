import { Context } from "elysia";
import { redis } from "../../helpers/redis";
import { User } from "../../fxn/basicAuth/userClass";
import { httpError } from "../../helpers/HTTPError";

export const resetPasswordController = async(ctx:Context)=>{
    const {forgotPasswordKey} = ctx.params
   ctx.set.redirect=`${process.env.FRONTEND_URL}/reset-password/${forgotPasswordKey}`

}

export const resetPasswordControllerPost = async(ctx:Context)=>{
try {
    
    const {forgotPasswordKey} = ctx.params
    const {password}:any =await ctx.body
    const decodedKey  = decodeURIComponent(forgotPasswordKey)
    const email = await redis.hget(decodedKey, "email")
    const userManager = new User();
    const user = await userManager.findUserByEmail(email as string,{id:true})
    if(!user) throw new httpError(404,'user not found',ctx.set).default()
    return user
} catch (error:any) {
    return error?.message
}

}
