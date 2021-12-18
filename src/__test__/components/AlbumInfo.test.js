import React from "react";
import { render, screen } from "@testing-library/react";

import { INITIAL_PREVIEW_IMAGE } from "../../constants";
import MockTheme from "../MockTheme";
import AlbumInfo from "../../components/AlbumInfo";

describe("AlbumInfo component", () => {
  beforeEach(() => {
    const album = {
      title: "title",
      artist: {
        name: "artist",
      },
      description: "description",
      genre: "genre",
      image: INITIAL_PREVIEW_IMAGE,
      funding: {
        target: 1000000,
        donors: ["donor"],
        amount: 1000000,
      },
    };
    const onClick = jest.fn();

    render(
      <MockTheme>
        <AlbumInfo album={album} onClick={onClick} />
      </MockTheme>
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("has album information", () => {
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("artist")).toBeInTheDocument();
    expect(screen.getByText("description")).toBeInTheDocument();
    expect(screen.getByText("genre")).toBeInTheDocument();
    expect(screen.getByText("100.0%")).toBeInTheDocument();
    expect(screen.getByText("후원자 1 명")).toBeInTheDocument();
    expect(screen.getByText("1000000 / 1000000 원")).toBeInTheDocument();
  });
});
