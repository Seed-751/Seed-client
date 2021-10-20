const URL = process.env.REACT_APP_API_SERVER_URL;

async function requestMyMusics(userId) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${URL}/musics/myMusics/${userId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${token}`
    },
  });

  const result = await res.json();

  return result;
}

export default requestMyMusics;
