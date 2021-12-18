import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function MoreBox({ handlePageScroll }) {
  const trigger = useRef(null);
  const observer = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      handlePageScroll();
      return;
    }
  }, { threshold: 1.0 });

  useEffect(() => {
    observer.observe(trigger.current);

    return (() => {
      observer && observer.disconnect();
    });
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
