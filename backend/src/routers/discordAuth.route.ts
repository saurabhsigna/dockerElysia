import Elysia, { t } from "elysia";
import {
  discordAuthAuthorizeController,
  discordAuthRedirectController,
  discordAuthRefreshTokenController,
} from "../controllers/(discordAuth)/discordAuth.controller";

const app = new Elysia();

app.get("/oauth/discord/authorize", discordAuthAuthorizeController);
app.get("/oauth/discord/redirect", discordAuthRedirectController);
app.post("/oauth/discord/refresh-token", discordAuthRefreshTokenController);
export { app as discordAuthRoute };
