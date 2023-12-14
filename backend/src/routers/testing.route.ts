import {
  getWeeklyTopSongsController,
  testingController,
  getSpotifyPlaylistData,
  fetchSoundByIdController,
  simpleControllerForTesting,
} from "../controllers/testing.controller";
import Elysia, { t } from "elysia";
import { googleAuthVerifyAccessToken_Middleware } from "../middlewares/oauth.google.middleware";
import { verifyAccessToken } from "../middlewares/verifyAccessToken";
import { donwloadSongsController } from "../controllers/(songs)/downloadSongs.controller";

const app = new Elysia();

const middleWareBeforeHandle = (ctx: any) => {
  let str = "aespa illusion guess who";
  if (Math.floor(Math.random() * 10) <= 4) {
    ctx.set.status = 400;
    return "boo";
  }
  ctx.authResponse = str;
};
app.get("/", simpleControllerForTesting, { beforeHandle: middleWareBeforeHandle });
app.post("/", fetchSoundByIdController, { body: t.Object({ id: t.String() }) });
app.get("/verify", getSpotifyPlaylistData, {
  async beforeHandle({ set, headers }) {
    let errorMsg;
  await  verifyAccessToken({ headers, set }).catch((err:any) => {
     errorMsg = err?.message
    });

    return errorMsg ?? errorMsg;
  },
});

app.get("/testing",donwloadSongsController,{beforeHandle(context:any) {
  const apiKey = "sk_ds2knvai239syv1k32xpb9mv8n"

  context.apiKey = apiKey
},})
export { app as testingRoute };