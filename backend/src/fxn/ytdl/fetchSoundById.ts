import ytdl, { Filter } from "ytdl-core";





export const fetchSoundById = async(yt_id:string)=>{

    const options = {
        filter: "audioonly" as Filter,
        quality: "highestaudio"
    }

let info = await ytdl.getInfo(yt_id);
let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
let format = ytdl.chooseFormat(info.formats,options )
return {audioFormats}
}