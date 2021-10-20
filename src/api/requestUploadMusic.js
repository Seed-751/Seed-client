const URL = process.env.REACT_APP_API_SERVER_URL;

async function requestUploadMusic({ title, image, audioFiles, genre, description }) {
  const token = localStorage.getItem("token");
  const data = new FormData();

  data.append("title", title);
  data.append("genre", genre);
  data.append("description", description);
  data.append("image", image);

  for (let i = 0; i < audioFiles.length; i++) {
    data.append("audioFiles", audioFiles[i]);
  }

  const res = await fetch(`${URL}/musics`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${token}`
    },
    body: data,
  });

  const result = await res.json();

  return result;
}

export default requestUploadMusic;
