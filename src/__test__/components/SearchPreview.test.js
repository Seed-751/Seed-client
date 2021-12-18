import React from "react";
import { render } from "@testing-library/react";
import { useSelector } from "react-redux";

import MockTheme from "../MockTheme";
import SearchPreview from "../../components/SearchPreview";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("SearchPreview component", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render search result when data founded", () => {
    useSelector.mockImplementation((selectSearchPreview) => {
      return {
        searchPreviewResult: {
          albumsByArtist: [
            {
              _id: "key1",
              title: "Optimist 1",
              artist: {
                name: "FINNEAS1",
              },
              image:
                "https://i.scdn.co/image/ab67616d00001e023bfed0974a996bfd87ea1c9a",
            },
          ],
          albumsByTitle: [
            {
              _id: "key2",
              title: "Optimist 2",
              artist: {
                name: "FINNEAS2",
              },
              image:
                "https://i.scdn.co/image/ab67616d00001e023bfed0974a996bfd87ea1c9a",
            },
          ],
        },
      };
    });
    const onReset = jest.fn();

    const { getByText } = render(
      <MockTheme>
        <SearchPreview onReset={onReset} searchInput={"test"} />
      </MockTheme>
    );

    expect(getByText("Optimist 1")).toBeInTheDocument();
    expect(getByText("FINNEAS1")).toBeInTheDocument();
    expect(getByText("Optimist 2")).toBeInTheDocument();
    expect(getByText("FINNEAS2")).toBeInTheDocument();
  });

  it("should render no result when data not founded", () => {
    useSelector.mockImplementation((selectSearchPreview) => {
      return {
        searchPreviewResult: {
          albumsByArtist: [],
          albumsByTitle: [
            {
              _id: "key2",
              title: "Optimist 2",
              artist: {
                name: "FINNEAS2",
              },
              image:
                "https://i.scdn.co/image/ab67616d00001e023bfed0974a996bfd87ea1c9a",
            },
          ],
        },
      };
    });
    const onReset = jest.fn();

    const { getByText } = render(
      <MockTheme>
        <SearchPreview onReset={onReset} searchInput={"test"} />
      </MockTheme>
    );

    expect(getByText("결과를 찾을수 없습니다")).toBeInTheDocument();
  });
});
