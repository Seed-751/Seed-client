import jsmediatags from "jsmediatags/dist/jsmediatags.min";
import { ERROR } from "../constants";

function validateMetaData(file) {
  return new Promise((resolve) => {
    jsmediatags.read(file, {
      onSuccess: function (tag) {
        const { title, album, track, genre, artist } = tag.tags;

        const errorMessage = [];

        if (!album) {
          errorMessage.push({ message: ERROR.inputMetaAlbum });
        }

        if (!title) {
          errorMessage.push({ message: ERROR.inputMetaTitle });
        }

        if (!track) {
          errorMessage.push({ message: ERROR.inputMetaTrack });
        }

        if (!genre) {
          errorMessage.push({ message: ERROR.inputMetaGenre });
        }

        if (!artist) {
          errorMessage.push({ message: ERROR.inputMetaArtist });
        }

        if (!errorMessage.length) {
          return resolve(null);
        }

        return resolve(errorMessage);
      }
    });
  });
}

export default validateMetaData;
