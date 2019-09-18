/* eslint-disable no-use-before-define */
import React from "react";
import GoogleButton from "./Button";

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
  const returnUserInfo = googleUser => {
    const profile = googleUser.getBasicProfile();
    const { access_token, id_token, expires_in } = googleUser.getAuthResponse(
      true
    );
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
