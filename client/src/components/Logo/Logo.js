import React from "react";
import LogoImage from "./whaleIcon.svg";
const Logo = () => {
  const logoStyle = {
    display: "block",
    textIndent: "-9999px",
    width: "60px",
    height: "60px",
    background: `url(${LogoImage})`,
    backgroundSize: "60px 60px",
    margin: "5px"
  };
  return (
    <a href="/" style={logoStyle}>
      Whale Spy
    </a>
  );
};

export { Logo as default };
