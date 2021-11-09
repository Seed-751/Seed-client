import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import requestUploadMusic from "../api/requestUploadMusic";
import { INITIAL_PREVIEW_IMAGE, ERROR, GENRE_OPTIONS } from "../constants";
import { occurError } from "../reducers/errorSlice";
import validateAudio from "../utils/validateAudio";

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  text-align: center;

  strong {
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0.06em;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    width: 50%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 10px;
  padding: 20px;
  background-color: ${({ theme }) => theme.color.lightBlack};
  height: 90%;
  border-radius: 5px;
`;

const InnerWrapper = styled.div`
  display: flex;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-Bottom: 10px;
  line-height: 1.5;
  width: 100%;
  text-align: left;


  .audio-file {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.color.lightGray};
    color: ${({ theme }) => theme.color.lightGray};

    button {
      width: 15%;
      height: 10%;
    }
  }

  .audio-reject-file {
    border: 1px solid ${({ theme }) => theme.color.lightGray};
    color: ${({ theme }) => theme.color.lightGray};

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    button {
      width: 15%;
      height: 10%;
    }
  }

  .error {
    color: red;
  }

  select {
    border-radius: 5px;
    height: 50px;
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
  border-radius: 5px;
`;

const UploadTextarea = styled.textarea`
  resize: none;
  min-height: 300px;
  border-radius: 5px;
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
  border-radius: 5px;
  border-color: ${({ theme }) => theme.color.gray};
  border-style: dashed;
  background-color: ${({ theme }) => theme.color.black};
  outline: none;
  transition: border .24s ease-in-out;

  &:hover {
    cursor: pointer;
  }
`;

const FileBox = styled.div`
  flex: 1;
  padding: 10px;
`;

const TextBox = styled.div`
  flex: 1;
  padding: 10px;
`;

export default function Upload() {
  const [previewImage, setPreviewImage] = useState(INITIAL_PREVIEW_IMAGE);
  const [audioFiles, setAudioFiles] = useState([]);
  const [rejectedAudioFiles, setRejectedAudioFiles] = useState([]);
  const [audioError, setAudioError] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: "audio/*",
    onDrop,
    multiple: true,
  });

  async function onDrop(acceptedFiles, rejectedFiles) {
    setAudioError(null);

    const validateAcceptedFiles = await Promise.all(acceptedFiles.map((file) => {
      return validateAudio(file);
    }));

    const validFile = [];
    const invalidFile = [];

    validateAcceptedFiles.forEach((file) => {
      if (file.errors) {
        return invalidFile.push(file);
      }

      return validFile.push(file);
    });

    setAudioFiles([...audioFiles, ...validFile]);
    setRejectedAudioFiles([...rejectedAudioFiles, ...invalidFile, ...rejectedFiles]);
  }

  async function handleUploadMusic(data) {
    if (!audioFiles.length || rejectedAudioFiles.length) {
      return setAudioError(ERROR.checkAudioFile);
    }

    const { image } = data;
    const audioArray = audioFiles.map((fileInfo) => (
      fileInfo.file
    ));
    const musicInfo = {
      ...data,
      image: image[0],
      audioFiles: [...audioArray],
    };

    try {
      const { success, message } = await requestUploadMusic(musicInfo);

      if (success) {
        return history.push("/");
      }

      dispatch(occurError(message));
    } catch (err) {
      dispatch(occurError(err));
    }
  }

  function handleImage(e) {
    e.target.files[0]
      ? setPreviewImage(URL.createObjectURL(e.target.files[0]))
      : setPreviewImage(INITIAL_PREVIEW_IMAGE);
  }

  function onDelete(file) {
    setAudioFiles(audioFiles.filter((audioFile) => audioFile !== file));
    setRejectedAudioFiles(rejectedAudioFiles.filter((audioFile) => audioFile !== file));
  }

  return (
    <Container>
      <Wrapper>
        <strong>Upload Music</strong>
        <form
          onSubmit={handleSubmit(handleUploadMusic)}
          encType="multipart/form-data"
        >
          <InnerWrapper>
            <FileBox>
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
                <div>
                  <p>accepted files</p>
                  {audioFiles?.map((fileInfo) => {
                    const { file } = fileInfo;
                    return (
                      <div className="audio-file" key={file.path}>
                        <p>
                          {file.name}
                        </p>
                        <Button type="button" onClick={() => onDelete(fileInfo)}>delete</Button>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <p>rejected files</p>
                  {rejectedAudioFiles?.map((fileInfo) => {
                    const { file, errors } = fileInfo;
                    return (
                      <div className="audio-reject-file" key={file.path}>
                        <div>
                          <p key={file.path}>
                            {file.name}
                          </p>
                          <Button type="button" onClick={() => onDelete(fileInfo)}>delete</Button>
                        </div>
                        {errors.map((error) => (
                          <p className="error" key={error}>{error.message}</p>
                        ))}
                      </div>
                    );
                  })}
                </div>
                {audioError && <p>{audioError}</p>}
              </InputBox>
            </FileBox>

            <TextBox>
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
            </TextBox>
          </InnerWrapper>
          <Button type="submit">Upload</Button>
        </form>
      </Wrapper>
    </Container>
  );
}
