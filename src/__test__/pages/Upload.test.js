import React from "react";
import { render } from "@testing-library/react";

import Upload from "../../pages/Upload";
import MockTheme from "../MockTheme";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("Upload page", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <MockTheme>
        <Upload />
      </MockTheme>
    );

    expect(container).toMatchSnapshot();
  });
});
