/* eslint-disable no-use-before-define */
import React from "react";
import Button from "@material-ui/core/Button";

const GoogleLogout = ({ logoutText, disabled, onLogoutSuccess }) => {
  const signOutHandler = () => {
    if (disabled) return;
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(
      () => {
        if (onLogoutSuccess) onLogoutSuccess();
      },
      error => {
        console.log(error);
      }
    );
  };

  return (
    <Button onClick={signOutHandler} size="small" color="inherit">
      {logoutText}
    </Button>
  );
};
export { GoogleLogout as default };

GoogleLogout.defaultProps = {
  googleAuthApiSrc: "https://apis.google.com/js/platform.js",
  logoutText: "Logout",
  disabled: false
};
