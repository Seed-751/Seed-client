import React from "react";
import { render } from "@testing-library/react";

import MyList from "../../pages/MyList";
import MockTheme from "../MockTheme";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("MyList page", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <MockTheme>
        <MyList />
      </MockTheme>
    );

    expect(container).toMatchSnapshot();
  });
});
