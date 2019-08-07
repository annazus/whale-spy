import React, { useContext } from "react";
import { Context } from "../Context";
import Auth from "./Auth";
import Logout from "./Logout";
import Logo from "./Logo";
const styles = {
  position: "fixed",
  width: "100%",
  minWidth: "320px",
  maxWidth: "1024px",
  height: "80px",
  margin: "0 auto",
  top: 0,
  left: 0,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
};

const authBarStyle = {
  height: "60px",
  display: "flex",
  flexDirection: "row"
};
const button = {
  height: "80px",
  border: "1px solid red"
};
const Header = () => {
  const { state, dispatch } = useContext(Context);

  return (
    <header style={styles}>
      <Logo />
      <div style={authBarStyle}>
        {!state.isAuth ? (
          <>
            <Auth mode="SIGNUP" loginText="Signup" />
            <Auth mode="LOGIN" loginText="Login" />
          </>
        ) : (
          <Logout logoutText="Logout" />
        )}
      </div>
    </header>
  );
};
export { Header as default };
