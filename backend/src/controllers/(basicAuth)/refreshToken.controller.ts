import { Context } from "elysia";
import { redis } from "../../helpers/redis";
import { httpError } from "../../helpers/HTTPError";
import { signAccessToken } from "../../helpers/jwt/signAccessToken";
import { signRefreshToken } from "../../helpers/jwt/signRefreshToken";
import { verifyRefreshToken } from "../../helpers/jwt/verifyRefreshToken";

export const refreshTokenControllerbasicAuth = async(ctx:Context)=>{

    const refreshToken = ctx.headers['authorization']?.split(" ")[1];
    const sessionKey = ctx.headers['x-session-key'];

    const sessionData:any = await redis.hget( sessionKey as string,"refreshToken");
    if(!sessionData) {throw new httpError(404,"session not found",ctx.set).default()}
     if ( sessionData?.refreshToken != refreshToken || !sessionData?.refreshToken ) {
        throw new httpError(401,"invalid refresh token",ctx.set).default()
    }
    const payload = verifyRefreshToken(refreshToken as string,ctx.set)
    return payload
}
