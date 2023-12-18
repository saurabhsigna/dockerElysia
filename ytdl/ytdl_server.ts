import { HttpsProxyAgent } from "https-proxy-agent";
import ytdl from "ytdl-core";
import express from "express";
import { Request, Response } from "express";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const proxy = "http://114.106.135.228:8089";
// const agent = new HttpsProxyAgent(proxy);
app.post("/download", async (req: Request, res: Response) => {
  const { id }: any = req.body;
  const options = {
    filter: "audioonly",
    quality: "highestaudio",
  };

  const info = await ytdl.getInfo(id, {
    // requestOptions: { agent },
  });
  let audioFormats = ytdl.filterFormats(info.formats, "audioonly");
  // let format = ytdl.chooseFormat(info.formats, options);
  res.json(audioFormats);

});

app.listen(3001, () => {
  console.log("Expressjs ytdl-core is running on port 3001");
});
