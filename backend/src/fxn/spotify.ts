import urlConfig from "../configs/urlConfig.json";
import { redis } from "../helpers/redis";

export const getTop50SongsData = async (accessToken: string) => {
  let topSongsParsed: any = await redis.get("spotify_top50India");

  if (!topSongsParsed) {
    const response = await fetch(urlConfig.spotifyTop50India, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data: any = await response.json();
    if (data?.name) {
      topSongsParsed = data.tracks.items.map((song: any) => {
        return {
          name: song.track.name,
          image: song.track.album.images[2].url,
        };
      });
      console.log(topSongsParsed[0]);
      await redis.set(
        "spotify_top50India",
        JSON.stringify(topSongsParsed),
        "EX",
        24 * 3600
      );
    }
  }
  return topSongsParsed;
};

export const getSpotifyAccessToken = async () => {
  const data = new URLSearchParams();
  data.append("grant_type", "client_credentials");
  data.append("client_id", process.env.SPOTIFY_CLIENT_ID as string);
  data.append("client_secret", process.env.SPOTIFY_CLIENT_SECRET as string);
  const acTokenResponse = await fetch(urlConfig.spotifyAccessToken, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  });

  const acTokenData: any = await acTokenResponse.json();
  console.log(acTokenData);
  if (acTokenData?.access_token) {
    await redis.set(
      "spotify_access_token",
      acTokenData?.access_token,
      "EX",
      3600
    );
  }

  return acTokenData?.access_token;
};

export const getSpotfySongsByPlaylist  = async(playlist_id:string,accessToken:string)=>{

 let parsedSongs;
    const response = await fetch(`urlConfig.spotifyPlaylistUrl/${playlist_id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data: any = await response.json();
      if (data?.name) {
        parsedSongs = data.tracks.items.map((song: any) => {
          return {
            name: song.track.name,
            image: song.track.album.images[2].url,
          };
        });
    }
    return parsedSongs
}