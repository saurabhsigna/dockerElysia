

//~~~~~~~~~~~~~~Schema~~~~~~~~~~~~~~~~~~``//
export {userSchema } from "./user.schema"

export {downloadSongsSchema} from "./downloadedSong.schema"

export {freeSongsSchema} from "./freeSongs.schema"




//~~~~~~~~~~~~~~~~~~~~ Relations ~~~~~~~~~~~~~~~~~~~~~~``//
export {UserDownloadedSongs,downloadedSongRelation,userDownloadedSongsRelation,usersRelation} from "./relations/relations"