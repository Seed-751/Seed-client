import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { render, screen } from "@testing-library/react";

import MockTheme from "../MockTheme";
import MusicList from "../../components/MusicList";

describe("MusicList component", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render link component", () => {
    const data = [
      {
        "_id": "6173337b7a0e9fe7b7e20ba3",
        "title": "Seven Shades of Heartbreak 2",
        "artist": {
          "_id": "617333777a0e9fe7b7e20b18",
          "name": "Mimi Webb",
          "createdAt": "2021-10-22T21:56:07.408Z",
          "updatedAt": "2021-10-22T21:56:07.408Z",
          "__v": 0
        },
        "image": "https://i.scdn.co/image/ab67616d00001e02bd4ea6d1e0735428e4bc8911",
        "audios": [
          {
            "title": "strawberry moon",
            "track": "1",
            "url": "https://seed-751.s3.ap-northeast-2.amazonaws.com/1634939089107.mp3",
            "_id": "6173337b7a0e9fe7b7e20ba4"
          }
        ],
        "funding": {
          "target": 1000000,
          "amount": 0,
          "donors": [],
          "_id": "6173337b7a0e9fe7b7e20ba5",
          "createdAt": "2021-10-22T21:56:11.349Z",
          "updatedAt": "2021-10-22T21:56:11.349Z"
        },
        "createdAt": "2021-10-22T21:56:11.351Z",
        "updatedAt": "2021-10-22T21:56:11.351Z",
        "__v": 0
      }
    ];
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <MockTheme>
          <MusicList
            data={data}
          />
        </MockTheme>
      </Router>
    );

    expect(screen.queryAllByRole("link").length).toBe(data.length);
  });
});
