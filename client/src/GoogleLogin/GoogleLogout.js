/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import GoogleButton from "./Button";
import Button from "@material-ui/core/Button";

// const loadScript = (document, scriptSrc, tagName, cb) => {
//   const firstScriptTag = document.getElementsByTagName(tagName)[0];
//   const googleApiTag = document.createElement(tagName);
//   googleApiTag.src = scriptSrc;
//   if (firstScriptTag && firstScriptTag.parentNode) {
//     firstScriptTag.parentNode.insertBefore(googleApiTag, firstScriptTag);
//   } else {
//     document.head.appendChild(googleApiTag);
//   }
//   googleApiTag.onload = cb;
// };

const GoogleLogout = ({
  logoutText,
  googleAuthApiSrc,
  clientID,
  disabled,
  onLogoutSuccess
}) => {
  // useEffect(() => {
  //   console.log("useEffect to load Google Auth");
  //   loadScript(document, googleAuthApiSrc, "script", initializeApi);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const initializeApi = () => {
  //   window.gapi.load(
  //     "auth2",
  //     () => {},
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // };

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

  //   return <div onClick={signIn}> {loginText}</div>;
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
