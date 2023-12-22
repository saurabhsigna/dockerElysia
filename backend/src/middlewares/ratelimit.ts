import { Context } from "elysia";
import { redis } from "../helpers/redis";
import { httpError } from "../helpers/HTTPError";

interface Props {
  maxRequests: number;
  blockFor12HoursAfterRequests?: number;
  rateInSec: number;
}

export const rateLimitMiddleware = async (
  ctx: Context,
  { maxRequests, rateInSec, blockFor12HoursAfterRequests }: Props,
) => {
  try {
    const IpAddress = ctx.headers["x-forwarded-for"];
    if (!IpAddress) throw new Error("Ip address not found");

    const key = `rate_limit:+${IpAddress}`;
    const requestValue = await redis.incr(key);

    if (requestValue > maxRequests) {
      if (requestValue > maxRequests + 4) {
        await redis.expire(key, rateInSec * 10);
      }
      if (
        blockFor12HoursAfterRequests &&
        requestValue > blockFor12HoursAfterRequests
      ) {
        throw new httpError(
          429,
          "🖕 You have been banned for 1 days 🖕",
          ctx.set,
        ).default();
      }
      throw new httpError(429, "Too many requests", ctx.set).default();
    }
    if (requestValue == 1) {
      await redis.expire(key, rateInSec);
    }
  } catch (error: any) {
    console.log("status is ", ctx.set.status);
    console.log(error?.message);
    throw new httpError(
      ctx.set.status as number,
      error?.message,
      ctx.set,
    ).default();
  }
};
