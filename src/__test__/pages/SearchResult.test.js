import React from "react";
import { render } from "@testing-library/react";

import SearchResult from "../../pages/SearchResult";
import MockProvider from "../MockProvider";

describe("Search Result page", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <MockProvider>
        <SearchResult />
      </MockProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
