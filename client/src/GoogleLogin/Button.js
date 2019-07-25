import React, { useState } from "react";
import icon from "./icon.svg";
/* onMouseEnter and onMouseLeave do not work when developer panel is open*/
const Button = ({ text, clickHandler, disabled }) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const buttonStyle = {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    borderRadius: 2,
    padding: 0,
    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)",
    border: "1px solid transparent",
    width: "200px",
    position: "relative",
    tabIndex: 0
  };

  const activeButtonStyle = {
    cursor: "pointer",
    backgroundColor: "#eee",
    opacity: 1
  };

  const hoveredButtonStyle = {
    color: "red",
    cursor: "pointer",
    opacity: 0.9
  };

  const googleIconStyle = {};
  const textStyle = {
    fontFamily: "Roboto,sans-serif",
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(0, 0, 0, 0.54)"
  };

  const style = hovered
    ? { ...buttonStyle, ...hoveredButtonStyle }
    : active
    ? { ...buttonStyle, ...activeButtonStyle }
    : buttonStyle;

  return (
    <div
      onClick={clickHandler}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setActive(false);
      }}
      onMouseDown={() => {
        setActive(true);
      }}
      onMouseUp={() => setActive(false)}
    >
      <img src={icon} alt="GoogleIcon" style={googleIconStyle} />
      <span style={textStyle}>{text}</span>
    </div>
  );
};

export default Button;
