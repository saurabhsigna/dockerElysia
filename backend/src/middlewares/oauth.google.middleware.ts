import { customError, httpError } from "../helpers/HTTPError";
import { verifyGoogleAccessToken } from "../helpers/oauth.google.helper";
import urlConfig from "../configs/urlConfig.json"
export const googleAuthVerifyAccessToken_Middleware = async (
  accessToken: string,
  set:any
) => {
  const { GOOGLE_OAUTH_CLIENT_ID: clientId } = process.env;

  const isAccessTokenVerified = await verifyGoogleAccessToken(
    accessToken,
    clientId as string
  );
  if(!isAccessTokenVerified){
     throw new httpError(403,"token is not valid laude",set).default()
  }
};


export const getAccessTokenViaRefreshToken = async(apiKey:string)=>{
   
  const { GOOGLE_OAUTH_CLIENT_ID : clientId  ,GOOGLE_OAUTH_CLIENT_SECRET : clientSecret} = process.env;
  
 
  const formData = new URLSearchParams()
  formData.append("client_id",clientId as string)
  formData.append("client_secret",clientSecret as string)
  formData.append("refresh_token",refreshToken)
  formData.append("grant_type","refresh_token")
  await fetch(urlConfig.googleTokenUrl,{
    method:"POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  body:formData
  })


}