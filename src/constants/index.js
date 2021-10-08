const INITIAL_PREVIEW_IMAGE = "/defaultImage.png";
const DEFAULT_AUDIO_SAMPLE = "/file_example_MP3_700KB.mp3";

const ERROR = {
  inputAudioFile: "audio file을 넣어주세요",
  inputTitle: "title을 입력 해주세요",
  inputImage: "image file을 넣어주세요",
  inputGenre: "genre를 선택해 주세요",
  inputDescription: "description을 입력 해주세요",
};

const GENRE_OPTIONS = [
  "classic",
  "jazz",
  "pop",
  "rock",
  "hip hop",
  "rhythm and blues",
  "reggae",
  "funk",
  "disco",
  "electronic music",
  "vocal music",
  "ballad",
];

export {
  INITIAL_PREVIEW_IMAGE,
  GENRE_OPTIONS,
  ERROR,
  DEFAULT_AUDIO_SAMPLE,
};
