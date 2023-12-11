import { app } from "./routers/index.routes";


app.listen({
  port: process.env.PORT,
  hostname: '0.0.0.0'
})

console.log(
  `🦊 ja nig  at ${app.server?.hostname}:${app.server?.port}`
);
