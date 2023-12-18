import { Context } from "elysia";
import { httpError } from "../../helpers/HTTPError";
import { UAParser } from "ua-parser-js";

export const checkUA = async (ctx: Context) => {
  try {
    const user_agent = ctx.headers["user-agent"];

    const parser = new UAParser(user_agent as string);

    const engineName = parser.getResult().engine.name;
    const result = parser.getResult();
    // if (!engineName)
    //   throw new httpError(
    //     400,
    //     "you are using some bad things",
    //     ctx.set
    //   ).default();

    if (!user_agent)
      throw new httpError(404, "not found user-agent", ctx.set).default();

    return result;
  } catch (error: any) {
    let errorMsg = error?.message ?? "default error in checking UA";

    throw new httpError(ctx.set.status as number, errorMsg, ctx.set).default();
  }
};
