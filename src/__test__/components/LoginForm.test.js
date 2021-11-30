import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MockProvider from "../MockProvider";
import LoginForm from "../../components/LoginForm";

describe("LoginForm component", () => {
  beforeEach(() => {
    render(
      <MockProvider>
        <LoginForm />
      </MockProvider>
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
