import React from "react";
import { render } from "@testing-library/react";

import MyList from "../../pages/MyList";
import MockProvider from "../MockProvider";

describe("MyList page", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <MockProvider>
        <MyList />
      </MockProvider>
    );

    expect(container).toMatchSnapshot();
  });
});
