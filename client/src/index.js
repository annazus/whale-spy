import React, { useState, useReducer, useContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Content from "./components/Content";
import Auth from "./components/Auth";
import { Context } from "./Context";
import reducer from "./reducer";
// import App from "./App";
import * as serviceWorker from "./serviceWorker";

const App = () => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      <Content />
    </Context.Provider>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your anpp to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
