import jsmediatags from "jsmediatags/dist/jsmediatags.min";
import { ERROR } from "../constants";

async function validateMetaData(file) {
  return new Promise((resolve) => {
    jsmediatags.read(file, {
      onSuccess: function (tag) {
        const { title, album, track, genre, artist } = tag.tags;

        if (!album) {
          resolve(`${file.name}-${ERROR.inputMetaAlbum}`);
        }

        if (!title) {
          resolve(`${file.name}-${ERROR.inputMetaTitle}`);
        }

        if (!track) {
          resolve(`${file.name}-${ERROR.inputMetaTrack}`);
        }

        if (!genre) {
          resolve(`${file.name}-${ERROR.inputMetaGenre}`);
        }

        if (!artist) {
          resolve(`${file.name}-${ERROR.inputMetaArtist}`);
        }

        resolve(null);
      }
    });
  });
}

export default validateMetaData;
