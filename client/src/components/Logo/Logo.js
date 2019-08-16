import React from "react";
import LogoImage from "./whaleIcon.svg";
import styles from "./logo.module.css";
const Logo = () => {
  const logoStyle = {
    background: `url(${LogoImage})`,
    backgroundSize: "40px 40px"
  };
  return (
    <>
      <div className={styles.logoBlock}>
        <a href="/" className={styles.logo} style={logoStyle}>
          Whale Spy
        </a>
        <h4 className={styles.heading}>Whale Spy</h4>
      </div>
    </>
  );
};

export { Logo as default };
