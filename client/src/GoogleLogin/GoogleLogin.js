/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import GoogleButton from "./Button";

const loadScript = (document, scriptSrc, tagName, cb) => {
  const firstScriptTag = document.getElementsByTagName(tagName)[0];
  const googleApiTag = document.createElement(tagName);
  googleApiTag.src = scriptSrc;
  if (firstScriptTag && firstScriptTag.parentNode) {
    firstScriptTag.parentNode.insertBefore(googleApiTag, firstScriptTag);
  } else {
    document.head.appendChild(googleApiTag);
  }
  googleApiTag.onload = cb;
};

const GoogleLogin = ({
  loginText,
  googleAuthApiSrc,
  clientID,
  disabled,
  onRequest,
  onSuccess,
  onFailure,
  refreshToken
}) => {
  // const [isSignedIn, setIsSignedIn] = useState(false);
  // console.log(loginText);
  // useEffect(() => {
  //   console.log("useEffect to load Google Auth");
  //   loadScript(document, googleAuthApiSrc, "script", initializeApi);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const initializeApi = () => {
  //   window.gapi.load("auth2", () => {
  //     const gAuth = window.gapi.auth2.init({
  //       client_id: clientID,
  //       cookie_policy: "single_host_origin",
  //       fetch_basic_profile: true,
  //       ux_mode: "popup"
  //     });
  //     gAuth.then(
  //       googleAuth => {
  //         const signedIn = googleAuth.isSignedIn.get();
  //         setIsSignedIn(signedIn);
  //         const currentUser = googleAuth.currentUser.get();
  //         if (signedIn) returnUserInfo(currentUser);
  //         console.log(signedIn);
  //       },
  //       error => {
  //         onFailure(error);
  //         console.log(error);
  //       }
  //     );
  //   });
  // };

  const returnUserInfo = googleUser => {
    const profile = googleUser.getBasicProfile();
    console.log(profile);
    const { access_token, id_token, expires_in } = googleUser.getAuthResponse(
      true
    );
    console.log("expires in", expires_in);
    const userInfo = {
      name: profile.getName(),
      email: profile.getEmail(),
      imageUrl: profile.getImageUrl(),
      accessToken: access_token,
      idToken: id_token
    };
    if (refreshToken) refreshToken(expires_in);

    onSuccess(userInfo);
  };

  const signInHandler = googleUser => {
    if (disabled) return;
    const auth2 = window.gapi.auth2.getAuthInstance();
    onRequest();
    auth2.signIn({ prompt: "consent" }).then(
      googleUser => {
        returnUserInfo(googleUser);
      },
      error => {
        onFailure(error);
        console.log(error);
      }
    );
  };

  return (
    <GoogleButton text={loginText} clickHandler={signInHandler} disabled />
  );
};
export { GoogleLogin as default };

GoogleLogin.defaultProps = {
  googleAuthApiSrc: "https://apis.google.com/js/platform.js",
  loginText: "Login with Google",
  disabled: false
};
