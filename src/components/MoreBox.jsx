import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function MoreBox({ handlePageScroll }) {
  const trigger = useRef(null);
  const observer = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      handlePageScroll();
    }
  });

  useEffect(() => {
    observer.observe(trigger.current);
  }, []);

  return (
    <div
      ref={trigger}
    />
  );
}

MoreBox.propTypes = {
  handlePageScroll: PropTypes.func,
};
