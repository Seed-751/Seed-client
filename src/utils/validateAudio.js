import validateDuration from "./validateDuration";
import validateMetaData from "./validateMetaData";

async function validateAudio(file) {
  let errorMessage = [];

  const durationResult = await validateDuration(file);

  if (durationResult) {
    errorMessage = [...durationResult];
  }

  const metadataResult = await validateMetaData(file);

  if (metadataResult) {
    errorMessage = [...metadataResult];
  }

  if (!errorMessage.length) {
    return { file };
  }

  return { file, errors: errorMessage };
}

export default validateAudio;
