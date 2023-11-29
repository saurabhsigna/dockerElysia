import { Elysia } from "elysia";
import Redis from "ioredis"
const app = new Elysia()

const redis = new Redis(process.env.UPSTASH_REDIS_CONNECTION_STRING as string)

app.get("/", async (c)=>{
 
  const count = await redis.incr("count")
  const allHeader = c.request.headers;
  // return allHeader
return "hello moto"
})


app.listen({
  port: process.env.PORT,
  hostname: '0.0.0.0'
})

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
