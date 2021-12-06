import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import GrobalStyles from "../styles/index";
import theme from "../styles/theme";

export default function MockTheme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <GrobalStyles />
      {children}
    </ThemeProvider>
  );
}

MockTheme.propTypes = {
  children: PropTypes.element.isRequired,
};
