import getCookie from "../utils/getCookie";

const URL = process.env.REACT_APP_API_SERVER_URL;
const token = getCookie("token");

async function requestMusic(musicId) {
  const res = await fetch(`${URL}/musics/${musicId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "authorization": token,
    },
  });

  const result = await res.json();

  return result;
}

export default requestMusic;
