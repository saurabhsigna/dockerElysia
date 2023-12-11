import Elysia from "elysia";
import { testingRoute } from "./testing.route";
import { googleAuthRoute } from "./googleAuth.route";
import { basicAuthRoute } from "./basicAuth.route";

const app = new  Elysia()

app.use(testingRoute)
app.use(basicAuthRoute)
app.use(googleAuthRoute)
export {app}