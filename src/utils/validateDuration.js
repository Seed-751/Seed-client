import { ERROR } from "../constants";

function validateDuration(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    const audio = document.createElement("audio");

    reader.onload = function (e) {
      audio.src = e.target.result;
      audio.addEventListener("loadedmetadata", function () {
        const duration = audio.duration;

        if (duration > 100) {
          return resolve([{ message: ERROR.checkAudioDuration }]);
        }

        resolve(null);
      }, false);
    };

    reader.readAsDataURL(file);
  });
}

export default validateDuration;
