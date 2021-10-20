const INITIAL_PREVIEW_IMAGE = "/defaultImage.png";
const DEFAULT_AUDIO_SAMPLE = "/file_example_MP3_700KB.mp3";

const ERROR = {
  inputAudioFile: "audio file을 넣어주세요",
  inputTitle: "title을 입력 해주세요",
  inputImage: "image file을 넣어주세요",
  inputGenre: "genre를 선택해 주세요",
  inputDescription: "description을 입력 해주세요",
  checkAudioFile: "audio file을 확인해주세요",
  checkAudioDuration: "길이를 100초 이하로 줄여주세요",
  inputMetaAlbum: "metadata album항목을 확인해주세요",
  inputMetaTitle: "metadata title항목을 확인해주세요",
  inputMetaTrack: "metadata track항목을 확인해주세요",
  inputMetaGenre: "metadata genre항목을 확인해주세요",
  inputMetaArtist: "metadata artist항목을 확인해주세요",
  inputAmount: "amount를 입력해주세요",
  failPayment: "결제에 실패 하셧습니다",
  failLogout: "logout 에 실패 하셧습니다",
  requestLogin: "login을 먼저 해주세요",
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
