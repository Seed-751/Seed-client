import React from "react";
import { render } from "@testing-library/react";

import MusicDetail from "../../pages/MusicDetail";
import MockProvider from "../MockProvider";

describe("MusicDetail page", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <MockProvider>
        <MusicDetail />
      </MockProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
