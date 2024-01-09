import { Context } from "elysia";
import { httpError } from "../../helpers/HTTPError";
import {URLSearchParams} from "url"
import { User } from "../../fxn/basicAuth/userClass";
export const discordAuthAuthorizeController = async (ctx:Context)=>{
try {
const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${process.env.DISCORD_REDIRECT_URI}&prompt=consent&scope=identify+guilds+gdm.join+email+guilds.join+connections`
ctx.set.redirect = discordAuthUrl

} catch (error:any) {
    return error?.message
}
    
}



export const discordAuthRedirectController = async(ctx:Context)=>{
  try {
    const {code}:Record<string, string | null> = ctx.query
    if(!code) throw new httpError(404,"bad url ",ctx.set).default()
    const {DISCORD_CLIENT_ID,DISCORD_CLIENT_SECRET,DISCORD_REDIRECT_URI}:any = process.env
    const formData  = new URLSearchParams({
        client_id:DISCORD_CLIENT_ID ,
        client_secret:DISCORD_CLIENT_SECRET,
        grant_type:"authorization_code",
        code:code.toString(),
        redirect_uri:DISCORD_REDIRECT_URI
    })

    const rawOutput = await fetch("https://discord.com/api/oauth2/token",{method:"POST",
headers:{
    'Content-Type':"application/x-www-form-urlencoded"
},body:formData})
    const parsedOutput:any= await rawOutput.json()

    const accessToken =   parsedOutput.access_token
    console.log(parsedOutput)
    if(accessToken) {
        const rawUserInfo = await fetch("https://discord.com/api/v9/users/@me",{headers:{
            authorization : `Bearer ${accessToken}`
        }})
        const parsedUserInfo:any = await rawUserInfo.json()
        const {id,avatar}  = parsedUserInfo
        const profilePic = `https://cdn.discordapp.com/avatars/${id}/${avatar}.webp`
        parsedUserInfo.profilePic = profilePic
        const userManager  = new User()
        // await userManager.saveDiscordUser(parsedUserInfo,ctx)
        ctx.set.headers['x-access-token'] = `access_token=${accessToken};Max-Age=${parsedOutput.expires_in};httpOnly`
        ctx.set.headers['x-refresh-token'] = `refresh_token=${parsedOutput.refresh_token};Max-Age=30*24*3600;httpOnly`
        ctx.set.headers['x-provider-type']=`discord`
        return parsedOutput
    }
   
  } catch (error:any) {
    return error?.message
    
  }
}


export const discordAuthRefreshTokenController = async(ctx:Context)=>{
  try {
    const refreshToken = ctx.headers['authorization']?.split(" ")?.[1]
    const targetUrl = "https://discord.com/api/oauth2/token"
    if(!refreshToken) throw new httpError(404,"not have refresh token",ctx.set).default()
    const {DISCORD_CLIENT_ID,DISCORD_CLIENT_SECRET}:any = process.env
    const formData = new URLSearchParams({
      client_id:DISCORD_CLIENT_ID ,
      client_secret:DISCORD_CLIENT_SECRET,
      grant_type:"refresh_token",
      
      refresh_token:refreshToken
    })


    const rawOutput = await fetch(targetUrl,{method:"POST",body:formData})
    if(!rawOutput.ok) ctx.set.status = rawOutput.status
    const parsedOutput = await rawOutput.json()
    console.log(`before ${ctx.set.status}`)
    return parsedOutput
  } catch (error:any) {
    console.log(`after ${ctx.set.status}`)
    return error?.message
    
  }
}


export const discordAuthLogoutController = async(ctx:Context)=>{

   
}
