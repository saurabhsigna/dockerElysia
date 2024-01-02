import { Context } from "elysia";
import { db } from "../../db/db";
import { userSchema } from "../../db/schema";
import { findUserByEmail } from "../../fxn/basicAuth/findUserByEmail";
import { User } from "../../fxn/basicAuth/userClass";
import { httpError } from "../../helpers/HTTPError";
import { createNewUser } from "../../fxn/basicAuth/createNewUser";
import { sendOTPViaResend } from "../../helpers/emails/sendOTPViaResend";
import { UAParser } from "ua-parser-js";
export const signUpController = async (ctx: Context) => {
  const { nickName, password, email }: any = ctx.body;

  try {
    const isUserPresent = await findUserByEmail(email, ctx.set);
    return "eh oh";
  } catch (err: any) {
    let errorMsg = err?.message;
    return errorMsg;
  }

  // console.log(user.insertId)
  // return user.insertId
};

export const signUpControllerTesting = async (ctx: Context) => {
  const { userId }: any = ctx.body;
  try {
    const userManager = new User();
    const findById = await userManager.findUserById(userId, {
      email: true,
      createdAt: true,
    });

    if (!findById)
      throw new httpError(404, "user not foudnd By Id", ctx.set).default();

    return findById;
  } catch (error: any) {
    let errorMsg = error?.message ?? "defautl error";
    return errorMsg;
  }
};

export const signupController = async (ctx: Context) => {
  try {
    const { nickName, email, password }: any = ctx.body;
    const newUser = await createNewUser(nickName, email, password, ctx);

    return newUser;
  } catch (error: any) {
    let errorMsg = error?.message ?? "default error";
    return errorMsg;
  }
};

export const signUpController_TestEmail = async (ctx: Context) => {
  const { email }: any = ctx.body;
  try {
    const sendEmail = await sendOTPViaResend(
      "abhinav",
      [email],
      39492,
      ctx.set
    );
    return sendEmail;
  } catch (error: any) {
    const errorMsg = error?.message ?? "default erorr in sending email";
    return errorMsg;
  }
};

export const signUpController_Test_UA = async (ctx: Context) => {
  try {
    const user_agent = ctx.headers["user-agent"];

    const parser = new UAParser(user_agent as string);

    const engineName = parser.getResult().engine.name;
    const result  = parser.getResult()
    if (!engineName)
      throw new httpError(
        400,
        "you are using some bad things",
        ctx.set
      ).default();

    if (!user_agent)
      throw new httpError(404, "not found user-agent", ctx.set).default();

    return result;
  } catch (error: any) {
    const errorMsg =
      error?.message ?? "default error for header testing user_agent";

    return errorMsg;
  }
};
