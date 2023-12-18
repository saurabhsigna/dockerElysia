import { httpError } from "../HTTPError";

const JWT = require("jsonwebtoken");

export const signRefreshToken = (
  {
    userId,
    expiresInsec,
  }: {
    userId: number;
    expiresInsec: number;
  },
  set: any
) => {
  return new Promise((resolve:any, reject:any) => {
    const payload = {
      id: userId,
    };

    const secret = process.env.JWT_REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: expiresInsec,
      issuer: "abhinav sangeet",
    };
    JWT.sign(payload, secret, options, async (err: any, token: string) => {
      if (err) {
        console.log(err.message);
        // reject(err)
        reject(
          new httpError(
            500,
            "there is some error in signing refresh token",
            set
          ).promise()
        );
      }
      resolve(token);
    });
  });
};
