const URL = process.env.REACT_APP_API_SERVER_URL;

async function requestMyFundings(userId) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${URL}/musics/myFundings/${userId}`, {
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

export default requestMyFundings;
