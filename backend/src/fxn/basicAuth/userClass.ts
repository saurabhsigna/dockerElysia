import { eq } from "drizzle-orm"
import { db } from "../../db/db"
import { userSchema } from "../../db/schema"


interface  Props {
  id?: boolean | undefined;
  name?: boolean | undefined;
  email?: boolean | undefined;
  locations?: boolean | undefined;
  isVerified?: boolean | undefined;
  hashed_password?: boolean | undefined;
  createdAt?: boolean | undefined;
  profilePic?: boolean | undefined;
  updatedAt?: boolean | undefined;
} 


export class User {
  private user: any

  constructor() {

  }
  

  async findUserByEmail(email:string,{...props}:Props){
    const user = await db.query.userSchema.findFirst({
      where: eq(userSchema.email, email),
      columns:{
         ...props
      }
    })
    if (!user) { return null }
    else { return user }
  }



  async findUserById(userId: number,{...props}:Props) {
    const user = await db.query.userSchema.findFirst({
      where: eq(userSchema.id, userId),
      columns:{...props}
    })
    if (!user) { return null }
    else { return user }
  }
}


