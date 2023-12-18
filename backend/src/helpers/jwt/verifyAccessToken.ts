import { httpError } from "../HTTPError";

const JWT = require("jsonwebtoken")

export const verifyAccessToken = (
token:string,set:any
  ) => {
    
    JWT.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET,
      (err: any, payload: any) => {
        if (err) throw new httpError(403,"not verifieed",set).default()
      return payload
      },
    );
  };
  