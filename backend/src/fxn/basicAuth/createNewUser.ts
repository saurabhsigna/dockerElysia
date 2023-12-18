import { password as bunPassword } from "bun";
import { User } from "./userClass";
import { httpError } from "../../helpers/HTTPError";
import { db } from "../../db/db";
import { userSchema } from "../../db/schema";
import { generateOtpForNewUser } from "./generateOtpForNewUser";
import { Context } from "elysia";
export async function createNewUser(
  nickName: string,
  email: string,
  password: string,
  ctx: Context
) {
  try {
    const userManager = new User();
    const isUserPresent = await userManager.findUserByEmail(email);
    if (isUserPresent)
      throw new httpError(
        400,
        "user already Found , You should Log In",
        ctx.set
      ).default();

    const bcryptHash = await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 10, // number between 4-31
    });

    const newUser = await db.insert(userSchema).values({
      email,
      hashed_password: bcryptHash,
      name: nickName,
      isVerified: false,
    });

    const response = await generateOtpForNewUser(nickName,email, ctx);
    return response;
  } catch (error: any) {
    let errorMsg = error?.message ?? "default error";
    return errorMsg;
  }
}
