import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import requestUploadMusic from "../api/requestUploadMusic";
import validateMetaData from "../utils/validateMetaData";
import { INITIAL_PREVIEW_IMAGE, ERROR, GENRE_OPTIONS } from "../constants";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  text-align: center;

  div > * {
    display: block;
    width: 400px;
  }

  strong {
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0.06em;
  }

  p {
    margin-top: 28px;
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray};
  }
`;

const InputBox = styled.div`
  margin-top: 10px;
  margin-Bottom: 10px;
  width: 100%;
  text-align: left;

  label {
    margin-left: 15px;
  }

  p {
    margin: 0;
    margin-left: 15px;
    color: red;
  }
`;

const UploadInput = styled(Input)`
  border-radius: 5px;
`;

const UploadImageInput = styled.input`
  outline: none;
  border-style: dashed;
  border-color: ${({ theme }) => theme.color.gray};
  border-width: 2px;
  border-radius: 2px;
`;

const UploadTextarea = styled.textarea`
  resize: vertical;
`;

const PreviewBox = styled.div`
  height: 100%;
  border: 1px solid black;

  img {
    height: 100%;
  }
`;

const UploadAudioInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${({ theme }) => theme.color.gray};
  border-style: dashed;
  background-color: ${({ theme }) => theme.color.white};
  outline: none;
  transition: border .24s ease-in-out;

  &:hover {
    cursor: pointer;
  }
`;

export default function Upload() {
  const [previewImage, setPreviewImage] = useState(INITIAL_PREVIEW_IMAGE);
  const [audioError, setAudioError] = useState(null);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
  } = useDropzone({
    accept: "audio/*",
    onDrop,
    multiple: true,
    validator: validateAudio,
  });

  async function onDrop(acceptedFiles) {
    if (!acceptedFiles.length) {
      return setAudioError([ERROR.inputAudioFile]);
    }

    await Promise.all(acceptedFiles.map((file) => {
      return validateMetaData(file);
    })).then((result) => setAudioError(result));
  }

  async function handleUploadMusic(data) {
    const isNotError = audioError.every((error) => {
      return error === null;
    });

    if (!isNotError) {
      return setAudioError([ERROR.checkAudioFile]);
    }

    const { image } = data;
    const musicInfo = {
      ...data,
      image: image[0],
      audioFiles: acceptedFiles,
    };

    try {
      const result = await requestUploadMusic(musicInfo);

      if (result.success) {
        return history.push("/");
      }

    } catch (err) {
      console.log(err);
    }
  }

  function handleImage(e) {
    e.target.files[0]
      ? setPreviewImage(URL.createObjectURL(e.target.files[0]))
      : setPreviewImage(INITIAL_PREVIEW_IMAGE);
  }

  function validateAudio(file) {
    const type = file.type.split("/")[0];

    if (type !== "audio") {
      return ERROR.inputAudioFile;
    }
  }

  return (
    <Container>
      <div>
        <h1>Upload Music</h1>
        <form
          onSubmit={handleSubmit(handleUploadMusic)}
          encType="multipart/form-data"
        >

          <InputBox>
            <label>Title</label>
            <UploadInput
              name="title"
              {...register("title", {
                required: ERROR.inputTitle,
              })}
            />
            <ErrorMessage
              errors={errors}
              name="title"
              render={({ message }) => <p>{message}</p>}
            />
          </InputBox>

          <InputBox>
            <label>Image</label>
            <PreviewBox>
              <img src={previewImage} />
            </PreviewBox>
            <UploadImageInput
              name="image"
              type="file"
              {...register("image", {
                onChange: handleImage,
                required: ERROR.inputImage,
              })}
            />
            <ErrorMessage
              errors={errors}
              name="image"
              render={({ message }) => <p>{message}</p>}
            />
          </InputBox>

          <InputBox>
            <label>Audio</label>
            <UploadAudioInput {...getRootProps()}>
              <input
                {...getInputProps()}
              />
              <p style={{ color: "gray" }}>Drag and drop audio files here, or click to select files</p>
            </UploadAudioInput>
            <ul>
              {acceptedFiles?.map((file) => (
                <li key={file.path}>{file.path}</li>
              ))}
            </ul>
            {audioError && <p>{audioError}</p>}
          </InputBox>

          <InputBox>
            <label>Genre</label>
            <select
              name="genre"
              {...register("genre", {
                required: ERROR.inputGenre,
              })}
            >
              {GENRE_OPTIONS.map((genre) => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            <ErrorMessage
              errors={errors}
              name="genre"
              render={({ message }) => <p>{message}</p>}
            />
          </InputBox>

          <InputBox>
            <label>Description</label>
            <UploadTextarea
              name="description"
              {...register("description", {
                required: ERROR.inputDescription,
              })}
            />
            <ErrorMessage
              errors={errors}
              name="description"
              render={({ message }) => <p>{message}</p>}
            />
          </InputBox>

          <Button type="submit">Upload</Button>
        </form>
      </div>
    </Container>
  );
}
