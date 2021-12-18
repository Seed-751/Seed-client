import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MockTheme from "../MockTheme";
import LoginForm from "../../components/Pages/Login/LoginForm";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn().mockImplementation(() => function dispatch() {}),
}));

describe("LoginForm component", () => {
  beforeEach(() => {
    render(
      <MockTheme>
        <LoginForm />
      </MockTheme>
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("has input component ", () => {
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("change text input", () => {
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    userEvent.type(emailInput, "test@gmail.com");
    userEvent.type(passwordInput, "test");

    expect(emailInput).toHaveValue("test@gmail.com");
    expect(passwordInput).toHaveValue("test");
  });
});
