import React from "react";
import { render } from "@testing-library/react";
import { useSelector } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import SearchResult from "../../pages/SearchResult";
import MockTheme from "../MockTheme";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("Search Result page", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("matches snapshot", () => {
    useSelector.mockImplementation((selectSearch) => {
      return {
        searchResult: {
          albumsByArtist: [
            {
              _id: "key1",
              title: "Optimist 1",
              artist: {
                name: "FINNEAS1",
              },
              image:
                "https://i.scdn.co/image/ab67616d00001e023bfed0974a996bfd87ea1c9a",
              funding: { target: 1000000, amount: 10000 },
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
              funding: { target: 1000000, amount: 10000 },
            },
          ],
        },
      };
    });
    const history = createMemoryHistory();

    const { container } = render(
      <Router history={history}>
        <MockTheme>
          <SearchResult />
        </MockTheme>
      </Router>
    );

    expect(container).toMatchSnapshot();
  });
});
