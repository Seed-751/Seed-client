import React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { BrowserRouter as Router } from "react-router-dom";

import store from "../../reducers/store";
import App from "../../App";

describe("<App />", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it("should render Login, Signup Button if user not logged in", () => {
    window.IntersectionObserver = jest.fn(() => ({
      observe: jest.fn(),
      disconnect: jest.fn(),
    }));

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    history.push("/");

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Signup")).toBeInTheDocument();
  });
});
