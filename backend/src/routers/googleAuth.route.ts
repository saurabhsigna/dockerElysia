import Elysia, { t } from "elysia";
import { googleAuthGetPage, googleCallbackController } from "../controllers/googleAuth.controller";

const app = new Elysia()

app.get("/oauth/google",googleAuthGetPage)
app.get("/oauth/google/callback",googleCallbackController)

export {app as googleAuthRoute}