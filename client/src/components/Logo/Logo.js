import React from "react";
import LogoImage from "./whaleIcon.svg";
import styles from "./logo.module.css";
const Logo = () => {
  const logoStyle = {
    background: `url(${LogoImage})`,
    backgroundSize: "45px 45px"
  };
  return (
    <a href="/" className={styles.logo} style={logoStyle}>
      Whale Spy
    </a>
  );
};

export { Logo as default };
