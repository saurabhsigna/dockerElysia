import { Context } from "elysia";
import { verifyAccessToken } from "./verifyAccessToken";


export const verifyAccessToken_Middleware = async (ctx:Context)=>{
  const accessToken = ctx.headers['authorization']?.split(" ")[1]
  const payload = await verifyAccessToken({headers:ctx.headers,set:ctx.set})
}