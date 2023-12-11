import { Context } from "elysia";


interface Props extends Context 
{
    apiKey?:string
}
export const donwloadSongsController = async ( ctx:Props)=>{
    const apiKey = ctx?.apiKey;

    return apiKey
}