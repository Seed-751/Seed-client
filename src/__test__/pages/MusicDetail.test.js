import React from "react";
import { render } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import MusicDetail from "../../pages/MusicDetail";
import MockTheme from "../MockTheme";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("MusicDetail page", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("matches snapshot", () => {
    useParams.mockImplementation(() => {
      return { music_id: "ddd" };
    });
    useSelector.mockImplementation((selectUser) => {
      return {
        userInfo: { email: "test@gmail.com" },
        isLoggedIn: true,
      };
    });
    useDispatch.mockImplementation(() => function dispatch() {});

    const { container } = render(
      <MockTheme>
        <MusicDetail />
      </MockTheme>
    );

    expect(container).toMatchSnapshot();
  });
});
