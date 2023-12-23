import { Context } from "elysia";
import { redis } from "../../helpers/redis";
import { randomUUID } from "crypto";
import { forgotPasswordLink } from "../../helpers/emails/forgotPasswordLink";

export const forgotPasswordController = async(ctx:Context) => {
  try {
    const { email }:any = ctx.body
  const forgotPasswordKey = `forgotPassword_${randomUUID()}`
  const ipAddress = ctx.headers['x-forwarded-for']
  const userAgent = ctx.headers['user-agent']
const valuePair = {
  email,ipAddress,userAgent
}
  await redis.hset(forgotPasswordKey, valuePair)
const forgotPasswordUrl = `${process.env.URL}/auth/basic/reset-password/${forgotPasswordKey}`
await forgotPasswordLink(forgotPasswordUrl,email,ctx.set)
return 'Password reset link sent to your email'
  } catch (error:any) {
    return error?.message
  }
}