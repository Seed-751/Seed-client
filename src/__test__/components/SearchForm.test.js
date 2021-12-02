import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MockProvider from "../MockProvider";
import SearchForm from "../../components/form/SearchForm";

describe("SearchForm component", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("has input component ", () => {
    const onChange = jest.fn();
    const onReset = jest.fn();

    render(
      <MockProvider>
        <SearchForm
          onChange={onChange}
          onReset={onReset}
          searchInput={""}
        />
      </MockProvider>
    );
    const searchInput = screen.getByPlaceholderText("Search...");

    expect(searchInput).toBeInTheDocument();
  });

  it("should call onChange when change input text", () => {
    const onChange = jest.fn();
    const onReset = jest.fn();

    render(
      <MockProvider>
        <SearchForm
          onChange={onChange}
          onReset={onReset}
          searchInput={""}
        />
      </MockProvider>
    );

    const searchInput = screen.getByPlaceholderText("Search...");

    userEvent.type(searchInput, "test");

    expect(onChange).toBeCalledTimes(4);
  });

  it("should call onReset when clicked", () => {
    const onChange = jest.fn();
    const onReset = jest.fn();

    render(
      <MockProvider>
        <SearchForm
          onChange={onChange}
          onReset={onReset}
          searchInput={"test"}
        />
      </MockProvider>
    );

    const searchInput = screen.getByPlaceholderText("Search...");

    userEvent.type(searchInput, "{enter}");

    expect(onReset).toBeCalledTimes(1);
  });
});
