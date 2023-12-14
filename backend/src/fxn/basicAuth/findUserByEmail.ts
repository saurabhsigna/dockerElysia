import { eq } from "drizzle-orm"
import { db } from "../../db/db"
import {userSchema} from "../../db/schema/user.schema"
import { httpError } from "../../helpers/HTTPError"


export const findUserByEmail = async(email:string,set:any)=>{
  
    const isUserPresent =await db.query.userSchema.findFirst({
        where:eq(userSchema.email,email)
    })
     
    if(!isUserPresent) {
        throw new httpError(404,"user not found",set).default()
    }
}