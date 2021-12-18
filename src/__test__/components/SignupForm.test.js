import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MockTheme from "../MockTheme";
import SignupForm from "../../components/Pages/Signup/SignupForm";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn().mockImplementation(() => function dispatch() {}),
}));

describe("SignupForm component", () => {
  beforeEach(() => {
    render(
      <MockTheme>
        <SignupForm />
      </MockTheme>
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("has input component ", () => {
    const profileImageInput = screen.getByLabelText("Profile Image");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const passwordConfirmInput = screen.getByLabelText("Password confirm");
    const nameInput = screen.getByLabelText("Name");

    expect(profileImageInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordConfirmInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
  });

  it("change text input", () => {
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const passwordConfirmInput = screen.getByLabelText("Password confirm");
    const nameInput = screen.getByLabelText("Name");

    userEvent.type(emailInput, "test@gmail.com");
    userEvent.type(passwordInput, "test");
    userEvent.type(passwordConfirmInput, "test");
    userEvent.type(nameInput, "test");

    expect(emailInput).toHaveValue("test@gmail.com");
    expect(passwordInput).toHaveValue("test");
    expect(passwordConfirmInput).toHaveValue("test");
    expect(nameInput).toHaveValue("test");
  });

  it("upload image file", () => {
    const profileImageInput = screen.getByLabelText("Profile Image");
    const file = new File(["test"], "test.png", { type: "image/png" });
    global.URL.createObjectURL = jest.fn();

    userEvent.upload(profileImageInput, file);

    expect(profileImageInput.files[0]).toStrictEqual(file);
    expect(profileImageInput.files).toHaveLength(1);
  });
});
