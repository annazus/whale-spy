import React from "react";
import classNames from "./roundButton.module.css";
const RoundButton = ({ children, clickHandler }) => {
  const onClick = e => {
    e.preventDefault();
    clickHandler();
  };
  return (
    <button onClick={onClick} className={classNames.RoundButton}>
      {children}
    </button>
  );
};

export default RoundButton;
