import React, { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MockProvider from "../MockProvider";
import UploadForm from "../../components/form/UploadForm";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

describe("UploadForm component", () => {
  const setState = jest.fn();

  beforeEach(() => {
    useState.mockImplementation(init => [init, setState]);

    render(
      <MockProvider>
        <UploadForm />
      </MockProvider>
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("has input component ", () => {
    const imageInput = screen.getByLabelText("Image");
    const audioInput = screen.getByLabelText("Audio");
    const titleInput = screen.getByLabelText("Title");
    const genreInput = screen.getByLabelText("Genre");
    const descriptionInput = screen.getByLabelText("Description");

    expect(imageInput).toBeInTheDocument();
    expect(audioInput).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(genreInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
  });

  it("change text input", () => {
    const titleInput = screen.getByLabelText("Title");
    const descriptionInput = screen.getByLabelText("Description");

    userEvent.type(titleInput, "test");
    userEvent.type(descriptionInput, "test");

    expect(titleInput).toHaveValue("test");
    expect(descriptionInput).toHaveValue("test");
  });

  it("select options", () => {
    const genreInput = screen.getByLabelText("Genre");

    userEvent.selectOptions(genreInput, ["jazz"]);

    expect(screen.getByRole("option", { name: "jazz" }).selected).toBe(true);
    expect(screen.getByRole("option", { name: "pop" }).selected).toBe(false);
  });

  it("upload image file", () => {
    const imageInput = screen.getByLabelText("Image");
    const file = new File(["test"], "test.png", { type: "image/png" });
    global.URL.createObjectURL = jest.fn();

    userEvent.upload(imageInput, file);

    expect(imageInput.files[0]).toStrictEqual(file);
    expect(imageInput.files).toHaveLength(1);
  });

  it("upload image file", async () => {
    const audioInput = screen.getByLabelText("Audio");
    const file = new File(["test"], "test.mp3", { type: "audio/mpe" });

    userEvent.upload(audioInput, file);

    await waitFor(() => {
      expect(audioInput.files[0]).toStrictEqual(file);
      expect(audioInput.files).toHaveLength(1);
    });
  });
});
