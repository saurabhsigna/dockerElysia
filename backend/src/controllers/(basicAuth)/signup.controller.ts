import { Context } from "elysia";
import { db } from "../../db/db";
import { users } from "../../db/schema";

export const signUpController = async (ctx: Context) => {
  const user = await db
    .insert(users)
    .values({
      email: "email@gmail.com",
      hashed_password: "password",
      name: "name",
    });

    console.log(user.insertId)
    return user.insertId
};
