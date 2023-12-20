import { Context } from "elysia";

interface Props {
  maxRequests: number;
  rateInSec: number;
}

const rateLimitMiddleware = (
  ctx: Context,
  { maxRequests, rateInSec }: Props
) => {

    const IpAddress = ctx.headers['x-real-ip']

};
