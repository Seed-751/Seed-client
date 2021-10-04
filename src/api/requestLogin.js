const URL = process.env.REACT_APP_API_SERVER_URL;

async function requestLogin(userInfo) {
  const res = await fetch(`${URL}/users/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userInfo),
  });

  const result = await res.json();

  return result;
}

export default requestLogin;
