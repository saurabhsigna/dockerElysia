import { app } from "./routers/index.routes";


app.listen({
  port: process.env.PORT,
  hostname: '0.0.0.0'
})

console.log(
  `🦊 Elysia running at ${app.server?.hostname}:${app.server?.port}`
);
