import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import GrobalStyles from "../styles/index";
import theme from "../styles/theme";
import store from "../reducers/store";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

export default function MockProvider({ children }) {
  const history = createMemoryHistory();

  return (
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <GrobalStyles />
          {children}
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

MockProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
