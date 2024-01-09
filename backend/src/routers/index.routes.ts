import Elysia from "elysia";
import { testingRoute } from "./testing.route";
import { googleAuthRoute } from "./googleAuth.route";
import { basicAuthRoute } from "./basicAuth.route";
import { verifyOTP_Route } from "./verifyOTP.route";
import { discordAuthRoute } from "./discordAuth.route";

const app = new Elysia();
app.use(discordAuthRoute);
app.use(testingRoute);
app.use(basicAuthRoute);
app.use(googleAuthRoute);
app.use(verifyOTP_Route);
export { app };
