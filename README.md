# Seed

## 🎯 Table of Contents

1. [💡 Motivation](#-Motivation)
2. [🔨 Tech stack](#-Tech-stack)
3. [🔎 Preview](#-Preview)
4. [💿 Features](#-Features)
5. [🛫 Link](#-Link)
6. [🗓 Schedule](#-Schedule)
7. [⛵️ Project Log](#-Project-Log)
    - [🔅 redux-toolkit, saga](#-redux-toolkit,-saga)
    - [🔅 파일 업로드 과정](#-파일-업로드-과정)
8. [✨ 프로젝트 후기](#-프로젝트-후기)

<br>

## 💡 Motivation

크라우드 펀딩 서비스에서 착안하여 제작하였습니다. 요즘에는 펀딩을 하는 서비스가 다양한데 음악이라는 영역은 안정적으로 지원받기가 어려운 점이 있다고 생각해서 펀딩 서비스를 같이 연결해보면 좋겠다는 생각으로 시작했습니다.

<br>

## 🔨 Tech stack

**Common**

- ES6+

**Frontend**

- React
- Redux
- Redux-Toolkit
- Redux Saga
- Styled Component

**Backend**

- Node.js
- Express
- Mongo DB, Atlas
- Mongoose

**Etc**

- Elastic Beanstalk (EC2, S3)
- Iamport

<br>

## 🔎 Preview

<br>

<div style="display: flex; flex-wrap: wrap">
  <img src="./src/assets/main page.png" alt="main-page" style="width: 50%;" />
  <img src="./src/assets/detail page.png" alt="detail-page" style="width: 50%;" />
  <img src="./src/assets/payment.png" alt="payment" style="width: 50%;" />
  <img src="./src/assets/search preview.png" alt="search-preview" style="width: 50%;" />
  <img src="./src/assets/upload page.png" alt="upload-page" style="width: 50%;" />
  <img src="./src/assets/search result.png" alt="search result" style="width: 50%;" />
</div>

<br>

## 💿 Features
- 메인페이지에서 게시글을 확인할 수 있습니다.
- 사용자는 후원받고 싶은 음악 샘플을 사진, 제목, 설명과 함께 올릴 수 있습니다.
- 음악 파일은 100초 이하의 길이이며, 음악 한 곡당 100만 원을 목표로 하여 앨범 단위로 게시글을 올릴 수 있습니다.
- 검색기능을 통해 앨범을 조회 할 수 있습니다.
- 상세페이지에서 음악 샘플을 듣고 후원할 수 있습니다.
- 사용자는 후원하고 싶은 앨범에 카카오페이로 결제하여 후원할 수 있습니다.

<br>

## 🛫 Link
- [FrontEnd Repo](https://github.com/Seed-751/Seed-client)
- [BackEnd Repo](https://github.com/Seed-751/Seed-server)
- [Deploy](https://seed751.live/)

<br>

## 🗓 Schedule

- **기획 :** 2020/09/27 ~ 2020/10/03 **(1주)**
    - **1주차 프로젝트 아이디어 기획,** mock up 제작, 기술스택 검토 및 계획수립
- **개발 :** 2020/10/04 ~ 2020/10/15 **(2주~3주)**
    - **2, 3주차** 기능 구현, 리팩토링

<br>

## ⛵️ Project Log

### 🔅 redux-toolkit, saga

이전 프로젝트에서는 thunk를 사용하였는데 단점은 action 함수의 크기가 커져 나중에 로직이 더욱 커지게 되면 더 복잡해질 수도 있는 것 그리고 관심사가 덜 분리 되는 것이었습니다.

saga를 도입하게 된 이유는 새로운 기술을 도입하고 싶다는 이유도 있었지만 조사한 결과 액션에 대한 리스너로 객체를 반환하여 관심사를 더 잘 분리할 수 있고 겉으로 보기에도 코드의 가독성도 높아 보이기 때문이었습니다.

실제 도입해본 결과 thunk보다 코드의 가독성도 높아졌고 side effect를 따로 관리하여 관심사를 분리하고 reducer의 순수성을 더 보장하는 것을 배웠습니다.

공식문서에도 나와 있는 부분으로 saga는 순수함수로 복잡한 로직을 간단하게 표현하여 테스트에도 적합하다는 것도 장점이었습니다.

saga는 generator라는 함수로 구성되어 로직을 delay, cancel, pause 등 더 제어할수 있는 특징을 가지고 그중에 takeLatest를 로직에 사용하였는데 비동기 로직을 감시하다 실행이 되었더라도 감시한 함수가 또 실행하게 되면 이전 요청에 대한 응답을 취소하기 때문에 사용자의 불필요한 연속적인 요청에도 대응할 수 있는 메서드로 비동기의 흐름을 세밀하게 제어하는 경험을 했습니다.

### 🔅 파일 업로드 과정

- 접근 권한 설정

음악 파일에 관한 프로젝트를 진행했습니다. 후원하는 웹 서비스이기 때문에 보안을 생각했고 브라우저에서 audio file이 취약할 수 있는 부분을 찾았을 때 검사 도구에서 audio tag의 src를 쉽게 확인할 수 있어 유출 위험이 있었습니다.

이를 해결하기 위해 audio src에서 노출되는 AWS 객체 url의 접근 권한을 설정했습니다. 서버 측 암호화를 위해 AWS s3에서 관리하는 sse-s3 키를 사용했습니다. 직접 bucket에서 업로드 할때는 접근 권한이 설정되어 타 사이트에서 접근이 거절되는 것을 확인했지만 작업한 프로젝트에서 업로드 할 때애는 암호화 설정이 안 되어서 적용이 되지 않았습니다.

조사한 결과 multer-s3에서는 sse-s3 키는 지원이 되지 않아 kms key를 적용해야 했습니다. kms key를 적용하거나 multer-s3를 사용하지 않는 방법으로 시도해봐야 할것 같았지만 두 방법으로 시도하기에는 프로젝트 마감 기한에 맞추기 어렵다고 판단하여 오디오 파일의 duration을 제한함으로써 100초 샘플로 설정하여 문제를 해결하였습니다. 접근 권한을 제대로 제한하지 못하여 아쉬움이 컸던 것 같습니다.

- 413 cors 에러

파일 업로드를 하는 과정에서 413 cors 에러 문제가 생겼습니다. AWS S3 bucket 및 server측의 cors 설정을 했기 때문에 문제점을 쉽게 찾지 못했습니다. 413 error를 조사한 결과 request entity too large였고 cors라는 문구 때문에 문제점을 잘못인지 했습니다.

server에도 express json limit 설정을 해두었었지만, 문제가 된 부분은 elastic beanstalk로 배포한 부분이었습니다. elastic beanstalk로 배포 할 때에 Nginx의 설정 값 중 client max body size가 1mb로 설정되어 있기 때문이었습니다. 설정값을 100mb로 변경하여 문제를 해결할 수 있었습니다.

- audio file metadata

오디오 파일을 업로드 할때 duration, title, genre, artist, track, album 등의 metadata 정보가 필요했습니다. duration의 경우는 onloadedmetadata event를 이용하여 구할 수 있었지만,나머지 정보들은 web api를 이용하여 구하는 방법을 찾지 못하여 Jsmediatags 라이브러리를 이용하여 구했습니다.

파일을 읽어오는 과정에서 비동기 promise all을 사용하였습니다. promise all은 여러개의 비동기 로직들을 병렬로 처리하는데 오디오 파일을 다수 업로드 하는 과정에서 onloadedmetadata event, Jsmediatag의 onload 과정 등 에서 필요할 수 있다고 생각했습니다. promise all을 사용하게 되면 비동기 로직들을 동시에 실행하기 때문에 시간을 단축할 수 있었고 또 파일이 한 개라도 에러가 났을경우 실패값을 반환하여 로직의 시간이 더 효율적으로 개선할 수 있었습니다.


<details>
<summary>비동기 로직의 promise all</summary>

```js
// accepted files validation

const validateAcceptedFiles = await Promise.all(acceptedFiles.map((file) => {
  return validateAudio(file);
}));

// audio file validation method

async function validateAudio(file) {
...
  const metadataResult = await validateMetaData(file);
...
}

// metadata validation method

function validateMetaData(file) {
  return new Promise((resolve) => {
    jsmediatags.read(file, {
      onSuccess: function (tag) {
        const { title, album, track, genre, artist } = tag.tags;

        const errorMessage = [];

        if (!album) {
          errorMessage.push({ message: ERROR.inputMetaAlbum });
        }
        ...

        if (!errorMessage.length) {
          return resolve(null);
        }
        ...
    });
  });
}

```
</details>

<br>

## ✨ 프로젝트 후기
프로젝트를 진행하면서 file의 metadata를 읽는 과정에서 file api에 대해 더 알아볼 수 있는 과정이었습니다. 그리고 audio file을 업로드 하는 과정에서 AWS S3를 다루면서 예기치 못한 변수와 접근 권한 등을 다루면서 보안에 관한 문제도 고려하는 경험을 가졌습니다.

그동안 팀 프로젝트와 같은 작업에서 동료들과 함께 서로 의견을 나누고 도움을 받았던 반면에 개인 프로젝트는 혼자서 기획부터, 디자인, 기술 스택을 선정부터 개발을 진행했기 때문에 매번 고민되고 힘든 순간도 있었습니다. 하지만 혼자서 작업을 진행하며 많은 것을 배울 좋은 기회였고 앞으로도 개발하는데 좋은 밑거름이 될 것 같습니다.
