const URL = process.env.REACT_APP_API_SERVER_URL;

async function requestAuthCheck(token) {
  const res = await fetch(`${URL}/users/authCheck`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
  });

  const result = await res.json();

  return result;
}

export default requestAuthCheck;
