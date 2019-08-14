import React, { useContext } from "react";
import { Context } from "../Context";
import classNames from "./header.module.css";
import Auth from "./Auth";
import Logout from "./Logout";
import Logo from "./Logo";

const Header = () => {
  const { state, dispatch } = useContext(Context);

  return (
    <header className={classNames.Header}>
      <Logo />
      <div className={classNames.AuthMenu}>
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
