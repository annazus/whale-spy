import React, { useState, useReducer, useContext, createRef } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Content from "./components/Content";
import { Context } from "./Context";
import reducer from "./reducer";
import { ApolloProvider } from "react-apollo";
import { MuiThemeProvider } from "@material-ui/core";
import AppTheme from "./Theme";
import * as serviceWorker from "./serviceWorker";
import { subServerClient } from "./graphql/client";
const App = () => {
  const initialState = useContext(Context);

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ApolloProvider client={subServerClient}>
      <Context.Provider value={{ state, dispatch }}>
        <MuiThemeProvider theme={AppTheme}>
          <Content />
        </MuiThemeProvider>
      </Context.Provider>
    </ApolloProvider>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your anpp to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
