import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { confirm } from "../../reducers/noticeSlice";

const ModalWrapper = styled.div`
  position: fixed;
  display:flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 1000;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
`;

const ModalInner = styled.div`
  display: flex;
  min-width: 500px;
  box-sizing: border-box;
  position: relative;
  background-color: #fff;
  margin: 0 auto;
  padding: 30px 10px;

  .close {
    position: absolute;
    top: 0.3rem;
    right: 1.0rem;
    font-size: 1.2rem;
    color: #333;
    cursor: pointer;
    border: none;
    background: none;
  }
`;

export default function Modal({ children }) {
  const dispatch = useDispatch();

  function onClose() {
    dispatch(confirm());
  }

  return (
    <ModalWrapper>
      <ModalInner tabIndex={0} className="modal-inner">
        <button
          type="button"
          className="close"
          onClick={onClose}
        >
          x
        </button>
        {children}
      </ModalInner>
    </ModalWrapper>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
