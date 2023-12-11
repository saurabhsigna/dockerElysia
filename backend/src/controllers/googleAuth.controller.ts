import { Context } from "elysia";
import {
  getUserDetailsFromGoogle,
  verifyGoogleAccessToken,
} from "../helpers/oauth.google.helper";

export const googleAuthGetPage = (ctx: Context) => {
  const { GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_REDIRECT_URI } = process.env;
  const googleSignInURL = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_OAUTH_CLIENT_ID}&redirect_uri=${GOOGLE_OAUTH_REDIRECT_URI}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent`;
  ctx.set.redirect = googleSignInURL;
};

export const googleCallbackController = async (ctx: Context) => {
  const { code }: any = ctx.query;
  const { GOOGLE_OAUTH_CLIENT_ID: clientId } = process.env;

  try {
    const userDetails = await getUserDetailsFromGoogle(code, ctx);

    const isAccessTokenVerified = await verifyGoogleAccessToken(
      userDetails.data.access_token,
      clientId as string
    );
    if (!isAccessTokenVerified)
      throw Error(`{code:403,text:"your are not authenticated"}`);
    return userDetails
    // return c.text(code);
  } catch (error:any) {
    console.log(error);
    if (!code) {
      ctx.set.status = 400;
      return "you're doing it wrong";
    }
    let errorMessage = error?.message
      ? error?.message
      : "error from google callback !";
    return errorMessage;
  }


};
