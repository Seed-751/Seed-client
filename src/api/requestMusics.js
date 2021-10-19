const URL = process.env.REACT_APP_API_SERVER_URL;

async function requestMusics(page) {
  const res = await fetch(`${URL}/musics?page=${page}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const result = await res.json();

  return result;
}

export default requestMusics;
