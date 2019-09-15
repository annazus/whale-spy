import React from "react";
import { makeStyles } from "@material-ui/core";
import LogoImage from "./whaleIcon.svg";

const useStyles = makeStyles(theme => ({
  logo: {
    width: "35px",
    height: "35px",
    textIndent: "-9999px"
  }
}));

const Logo = () => {
  const classes = useStyles();

  const logoStyle = {
    background: `url(${LogoImage})`,
    backgroundSize: "35px 35px"
  };
  return (
    <a href="/" className={classes.logo} style={logoStyle}>
      Whale Spy
    </a>
  );
};

export { Logo as default };
