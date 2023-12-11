import { Context } from "elysia";
import { db } from "../../db/db";
import { eq } from "drizzle-orm";
import { users } from "../../db/schema";


export const getSongsController = async (ctx:Context) =>{
   const downloadesSongsOfUser =   await  db.query.users.findFirst({
    where:eq(users.id,11),
        with:{
        UserDownloadedSongs:{
          with:{
            downloadedSong:{
              columns:{
                name:true
              }
            }
          }
        }
        }
      })
}