import { Context, Elysia } from "elysia";
import { redis } from "../helpers/redis";
import urlConfig from "../configs/urlConfig.json";
import { getSpotifyAccessToken, getTop50SongsData } from "../fxn/spotify";
import { fetchSoundById } from "../fxn/ytdl/fetchSoundById";
import { db } from "../db/db";
import { userSchema } from "../db/schema";
interface ProfileContext extends Context {
  authResponse?: string;
}

export const testingController = async (c: ProfileContext) => {
  try {
    const count = await redis.incr("count");
    const allHeader = c.request.headers;
    console.log(c.authResponse);
    console.log(count);

    // return allHeader
    return "hello moto";
    //   return c?.authResponse
  } catch (error: any) {
    c.set.status = 400;
    let errorMessage = error?.message
      ? error?.message
      : "error because of unauthenticated";
    return errorMessage;
  }
};

export const getWeeklyTopSongsController = async (ctx: Context) => {
  const response = await fetch(urlConfig.getWeeklyTopSongs);

  const data: any = await response.json();

  let topSongs: [] = data?.list?.map((song: any) => {
    return {
      name: song.title,
      image: song.image,
    };
  });
  // console.log(topSongs)
  return topSongs;
};

export const getSpotifyPlaylistData = async (ctx: Context) => {
  try {
    let accessToken = await redis.get("spotify_access_token");

  if (!accessToken) {
    accessToken = await getSpotifyAccessToken();
  }
  const top50SongsData = await getTop50SongsData(accessToken as string);
    
  return top50SongsData;
    
  } catch (error:any) {
    //  let message = error?.message;
    //  let statusCode = error?.statusCode;
    // if(statusCode) ctx.set.status = statusCode
    // if(message) return error?.message
   
    return "error in getting top 50 songs"
  }
};



export const fetchSoundByIdController = async (ctx:Context)=>{
  const {body} = ctx;
  const {id,cookie}:any = body
  const response = await fetchSoundById(id,cookie)
  return response
}


export const simpleControllerForTesting = async(ctx:Context)=>
{
  try {
    const IpAddress =
      ctx.headers["x-forwarded-for"] || ctx.headers["x-real-ip"];
    if (!IpAddress) throw new Error("Ip address not found");
    return IpAddress;
  } catch (error: any) {
    return error?.message;
  }
}