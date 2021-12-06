import React from "react";
import { useDispatch } from "react-redux";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MockTheme from "../../MockTheme";
import Notice from "../../../components/Modal/Notice";
import Modal from "../../../components/Modal/Modal";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("Notice Modal", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render when error", () => {
    const type = "notice";
    const message = "error";
    const onClose = jest.fn();

    const { getByText } = render(
      <MockTheme>
        <Modal onClose={onClose} isNotNotice={false}>
          <Notice
            type={type}
            message={message}
          />
        </Modal>
      </MockTheme>
    );

    expect(getByText("error")).toBeInTheDocument();
  });

  it("should call onClose when clicked", () => {
    useDispatch.mockImplementation(() => function dispatch() {});

    const type = "notice";
    const message = "error";
    const onClose = jest.fn();

    const { getByText } = render(
      <MockTheme>
        <Modal onClose={onClose} isNotNotice={false}>
          <Notice
            type={type}
            message={message}
          />
        </Modal>
      </MockTheme>
    );

    const button = getByText("x");

    userEvent.click(button);
    expect(onClose).toBeCalledTimes(1);
  });
});
