import React from "react";
import { render } from "@testing-library/react";

import Upload from "../../pages/Upload";
import MockProvider from "../MockProvider";

describe("Upload page", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <MockProvider>
        <Upload />
      </MockProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
