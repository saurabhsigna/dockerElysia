import { httpError } from "../helpers/HTTPError"
import { googleAuthVerifyAccessToken_Middleware } from "./oauth.google.middleware"

export const verifyAccessToken =async ({headers,set}:any)=>{
    const {authorization} = headers
    if(!authorization){
      set.status = 403
      return "dont have token"
    }
     const accessToken = authorization.split(" ")[1]
     const tokenType = authorization.split(" ")[0]
  
     switch (tokenType) {
      case "Google":
        
         await googleAuthVerifyAccessToken_Middleware(accessToken,set)
    
        break;
     
      case "Bearer":
            console.log("bearer auth")
        break;
      default:
        set.status = 403
        throw new Error("your token is not written correctly")
     
     }
     
}