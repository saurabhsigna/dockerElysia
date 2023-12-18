import ytdl, { Filter } from "ytdl-core";





export const fetchSoundById = async(yt_id:string,cookie:string)=>{

    const options = {
        filter: "audioonly" as Filter,
        quality: "highestaudio"
    }

let info = await ytdl.getInfo(yt_id,{requestOptions:{headers:{
    cookie
}}});
console.log("info")
let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
let format = ytdl.chooseFormat(info.formats,options )
return {audioFormats}
}