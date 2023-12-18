import { httpError } from "../HTTPError";


const JWT = require("jsonwebtoken")


export const verifyRefreshToken = (refreshToken: string,set:any) => {
    return new Promise((resolve, reject) => {
      JWT.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET,
        async (err: any, payload: any) => {
          if (err) return reject(new httpError(403,"your refresh token is not valid",set).promise());
          const userId = payload.aud;
       return payload
        //   const userDataOnRedis = await redis
        //     .hgetall(`userId:${userId}`)
        //     .then((res: any) => {
        //       if (refreshToken === res) return resolve(userId);
        //       reject(new httpError(403,"your refresh token is not valid",set).promise());
        //     });
        },
      );
    });
  };