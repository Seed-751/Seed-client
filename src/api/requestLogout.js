const URL = process.env.REACT_APP_API_SERVER_URL;
import { ERROR } from "../constants";

async function requestLogout() {
  localStorage.removeItem("token");

  if (!localStorage.getItem("token")) {
    const res = await fetch(`${URL}/users/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const result = await res.json();

    return result;
  }

  return { message: ERROR.failLogout};
}

export default requestLogout;
