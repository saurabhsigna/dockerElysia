import { httpError } from "../HTTPError";

const JWT = require("jsonwebtoken");
interface Props {
  userId: number;
  email: string;
  expiresInsec: number;
}

export const signAccessToken = (
  { userId, email, expiresInsec }: Props,
  set: any
) => {
  try {
    return new Promise((resolve, reject) => {
      const payload = { email: email, id: userId };
      const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: expiresInsec,
        issuer: "abhinav_sangeet",
      };
      JWT.sign(payload, secret, options, (err: any, token: string) => {
        if (err) {
          // console.log(err.message);
          reject(
            new httpError(
              500,
              "some error in server side in signing access Token",
              set
            ).promise()
          );
        } else {
          return resolve(token);
        }
      });
    });
  } catch (err: any) {
    let errorMsg = err?.message ?? "default error in signAccessToken";

    throw new httpError(set.status as number, errorMsg, set).default();
  }
};
