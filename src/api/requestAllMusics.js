import getCookie from "../utils/getCookie";

const URL = process.env.REACT_APP_API_SERVER_URL;
const token = getCookie("token");

async function requestAllMusics() {
  const res = await fetch(`${URL}/musics`, {
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

export default requestAllMusics;
