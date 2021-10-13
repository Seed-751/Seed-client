const URL = process.env.REACT_APP_API_SERVER_URL;

async function requestSignup(userInfo) {
  const { email, name, password, passwordConfirm, profileImage } = userInfo;

  const data = new FormData();

  data.append("email", email);
  data.append("password", password);
  data.append("passwordConfirm", passwordConfirm);
  data.append("name", name);
  data.append("profileImage", profileImage[0]);

  const res = await fetch(`${URL}/users/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
    body: data,
  });

  const result = await res.json();

  return result;
}

export default requestSignup;
