import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import MockTheme from "../MockTheme";
import SearchForm from "../../components/Layout/SearchForm";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));

describe("SearchForm component", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("has input component ", () => {
    const onChange = jest.fn();
    const onReset = jest.fn();

    render(
      <MockTheme>
        <SearchForm onChange={onChange} onReset={onReset} searchInput={""} />
      </MockTheme>
    );
    const searchInput = screen.getByPlaceholderText("Search...");

    expect(searchInput).toBeInTheDocument();
  });

  it("should call onChange when change input text", () => {
    const onChange = jest.fn();
    const onReset = jest.fn();

    render(
      <MockTheme>
        <SearchForm onChange={onChange} onReset={onReset} searchInput={""} />
      </MockTheme>
    );

    const searchInput = screen.getByPlaceholderText("Search...");

    userEvent.type(searchInput, "test");

    expect(onChange).toBeCalledTimes(4);
  });

  it("should call onReset when clicked", () => {
    const onChange = jest.fn();
    const onReset = jest.fn();
    useDispatch.mockImplementation(() => function dispatch() {});
    useHistory.mockImplementation(() => ({
      push: jest.fn(),
    }));

    render(
      <MockTheme>
        <SearchForm
          onChange={onChange}
          onReset={onReset}
          searchInput={"test"}
        />
      </MockTheme>
    );

    const searchInput = screen.getByPlaceholderText("Search...");

    userEvent.type(searchInput, "{enter}");

    expect(onReset).toBeCalledTimes(1);
  });
});
