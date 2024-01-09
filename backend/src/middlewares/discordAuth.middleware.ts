import { Context } from "elysia";
import { httpError } from "../helpers/HTTPError";

export const verifyAccessToken_discordAuthMiddleware = async (ctx: Context) => {
  const { headers } = ctx;
  const accessToken = headers.authorization?.split(" ")[1];
  if (!accessToken) {
    throw new httpError(403, "Missing access token", ctx.set).default();
  }
};
