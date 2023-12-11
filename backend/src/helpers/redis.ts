import Redis from "ioredis"

const redis = new Redis(process.env.UPSTASH_REDIS_CONNECTION_STRING as string)


export {redis}