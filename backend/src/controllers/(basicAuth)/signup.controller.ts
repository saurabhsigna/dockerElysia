import { Context } from "elysia";
import { db } from "../../db/db";
import { userSchema } from "../../db/schema";
import { findUserByEmail } from "../../fxn/basicAuth/findUserByEmail";
import { User } from "../../fxn/basicAuth/userClass";
import { httpError } from "../../helpers/HTTPError";
import { createNewUser } from "../../fxn/basicAuth/createNewUser";

export const signUpController = async (ctx: Context) => {
  const { nickName, password, email }: any = ctx.body

  try {
    const isUserPresent = await findUserByEmail(email, ctx.set)
    return "eh oh"
  } catch (err: any) {
    let errorMsg = err?.message
    return errorMsg
  }

  // console.log(user.insertId)
  // return user.insertId

};



export const signUpControllerTesting = async (ctx: Context) => {
  const { userId }: any = ctx.body
  try {
    const userManager = new User()
    const findById = await userManager.findUserById(userId, { email: true, createdAt: true })

    if (!findById) throw new httpError(404, "user not foudnd By Id", ctx.set).default()

    return findById

  } catch (error: any) {
    let errorMsg = error?.message ?? "defautl error"
    return errorMsg
  }


}

export const signupController_TestHash = async (ctx:Context)=>{
 const password =  await createNewUser("abhinav","abhinavderapur0@gmail.com","bihar_boy")
   return password
}