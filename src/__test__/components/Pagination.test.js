import React from "react";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MockTheme from "../MockTheme";
import Pagination from "../../components/Pagination";

describe("Pagination component", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render page by pageCount", async () => {
    const onPageChange = jest.fn();
    const totalData = 16;
    const pageSize = 8;
    const pageCount = Math.ceil(totalData / pageSize);

    render(
      <MockTheme>
        <Pagination
          pageSize={8}
          totalData={16}
          currentPage={1}
          onPageChange={onPageChange}
        />
      </MockTheme>
    );

    await waitFor (() => {
      expect(screen.getAllByTestId("page").length).toBe(pageCount);
    });
  });

  it("should change page when click button", async () => {
    const onPageChange = jest.fn();

    render(
      <MockTheme>
        <Pagination
          pageSize={8}
          totalData={16}
          currentPage={1}
          onPageChange={onPageChange}
        />
      </MockTheme>
    );

    const prevButton = screen.getByText("<");
    const firstButton = screen.getByText("<<");
    const nextButton = screen.getByText(">");
    const endButton = screen.getByText(">>");

    userEvent.click(prevButton);
    userEvent.click(firstButton);
    userEvent.click(nextButton);
    userEvent.click(endButton);

    await waitFor (() => {
      expect(onPageChange).toBeCalledTimes(4);
    });
  });
});
