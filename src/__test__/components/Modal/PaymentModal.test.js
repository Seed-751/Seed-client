import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { render} from "@testing-library/react";

import MockTheme from "../../MockTheme";
import Payment from "../../../components/Modal/Payment";
import Modal from "../../../components/Modal/Modal";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("Payment Modal", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("has component", async () => {
    useSelector.mockImplementation((selectUser) => {
      return {
        userInfo: {
          isLoggedIn: true,
        }
      };
    });
    useDispatch.mockImplementation(() => function dispatch() { });
    const album = {
      title: "title",
      artist: {
        name: "artist",
      },
    };
    const userInfo = {
      email: "test@gmail.com",
    };
    const onClose = jest.fn();

    const { getByText } = render(
      <MockTheme>
        <Modal
          isNotNotice={true}
          onClose={onClose}
        >
          <Payment
            albumInfo={album}
            userInfo={userInfo}
            onClose={onClose}
          />
        </Modal>
      </MockTheme>
    );
    expect(getByText("후원하기")).toBeInTheDocument();
    expect(getByText("Pay With Kakao")).toBeInTheDocument();
  });
});
