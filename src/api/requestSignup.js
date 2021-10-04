const URL = process.env.REACT_APP_API_SERVER_URL;

async function requestSignup(userInfo) {
  const res = await fetch(`${URL}/users/signup`, {
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

export default requestSignup;
