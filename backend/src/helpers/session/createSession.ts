import { Context } from "elysia";
import { signAccessToken } from "../jwt/signAccessToken";
import { signRefreshToken } from "../jwt/signRefreshToken";
import { redis } from "../redis";
import { randomUUID } from "crypto";
import { checkUA } from "../../fxn/basicAuth/checkUA";
import { getLocationFromIP } from "../../fxn/basicAuth/fetchLocationFromIP";
interface userDataProps {
  id?: string;
  email?: string;
  session_key?: string;
}
export async function createSession(userData: any, ctx: Context) {
  const sessionInRedis = await redis.hget(userData.session_key, "userId");
  if (!sessionInRedis) {
    console.log(await createSessionFromScratch(userData, ctx));
  }
}

async function createSessionFromScratch(userData: any, ctx: Context) {
  const browserInfo = await checkUA(ctx);
  const IpAddress = ctx.headers["x-forwarded-for"];
  const sessionKey = `session:${randomUUID()}`;
  const locationInfo = await getLocationFromIP(IpAddress as string);
  const deviceName = randomUUID();

  const accessToken = await signAccessToken(
    { userId: userData.id, email: userData.email, expiresInsec: 2 * 3600 },
    ctx.set,
  );
  const refreshToken = await signRefreshToken(
    { userId: userData.id, expiresInsec: 20 * 24 * 3600 },
    ctx.set,
  );
  const device2 = "akl";
  const fullInfo = { ...locationInfo, ...browserInfo, refreshToken };
  const devices = [deviceName, device2];
  await redis.hmset(sessionKey, {
    devices,
    fullInfo: JSON.stringify(fullInfo),
    userId: userData.id,
  });
  await redis.expire(sessionKey, 30 * 24 * 3600);

  ctx.set.headers["x-access-token"] = `accessToken=${accessToken};Max-Age=${
    2 * 3600
  };HttpOnly`;
  ctx.set.headers["x-refresh-token"] = `refreshToken=${refreshToken};Max-Age=${
    30 * 24 * 3600
  };HttpOnly`;

  return devices;
}

function createSessionFromCheckPoint() {}
