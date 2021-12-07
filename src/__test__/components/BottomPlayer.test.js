import React, { useState } from "react";
import { useSelector } from "react-redux";
import { render, screen, waitFor } from "@testing-library/react";

import MockTheme from "../MockTheme";
import BottomPlayer from "../../components/BottomPlayer";
import userEvent from "@testing-library/user-event";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("Bottom Player", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("has component", () => {
    const setState = jest.fn();
    useState.mockImplementation(init => [init, setState]);
    useSelector.mockImplementation((selectCurrentTrack) => {
      return {
        currentTrack: {
          "title": "Dalmoon",
          "artist": "옥상달빛",
          "album": "28",
          "track": "1",
          "genre": "Folk",
          "url": "https://seed-751.s3.ap-northeast-2.amazonaws.com/1634272985535.mp3",
          "_id": "616906dfd2852b2d4ea23915"
        },
      };
    });

    const { getByText } = render(
      <MockTheme>
        <BottomPlayer />
      </MockTheme>
    );

    expect(getByText("Dalmoon")).toBeInTheDocument();
    expect(getByText("옥상달빛")).toBeInTheDocument();
  });

  it("Update mute state when button clicked", async () => {
    const setState = jest.fn();
    useState.mockImplementation(init => [init, setState]);
    useSelector.mockImplementation((selectCurrentTrack) => {
      return {
        currentTrack: {
          "title": "Dalmoon",
          "artist": "옥상달빛",
          "album": "28",
          "track": "1",
          "genre": "Folk",
          "url": "https://seed-751.s3.ap-northeast-2.amazonaws.com/1634272985535.mp3",
          "_id": "616906dfd2852b2d4ea23915"
        },
      };
    });

    render(
      <MockTheme>
        <BottomPlayer />
      </MockTheme>
    );

    const muteButton = screen.getByLabelText("toggleMute");

    await userEvent.click(muteButton);
    await waitFor(() => {
      expect(setState).toHaveBeenCalledWith(true);
    });
  });
});
