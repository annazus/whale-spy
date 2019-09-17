import React, { useContext, useState } from "react";
import { GoogleLogin } from "../../GoogleLogin";
import { getClient } from "../../graphql/client";
import { MUTATION_SIGNUP } from "../../graphql/definitions/mutations";
import { QUERY_ME } from "../../graphql/definitions/queries";
import { Context } from "../../Context";
import { actionTypes } from "../../actions";
const Auth = ({ mode, loginText, onSuccessHandler, onFailureHandler }) => {
  console.log(loginText);
  const { state, dispatch } = useContext(Context);
  const signup = async client => {
    let result;
    try {
      result = await client.mutate({ mutation: MUTATION_SIGNUP });
      console.log(result.data.signUp);
      dispatch({
        type: actionTypes.SIGNUP_USER,
        payload: { user: result.data.signup }
      });
      if (onSuccessHandler) onSuccessHandler();
    } catch (error) {
      console.log(error);
      onFailureHandler(error.message.replace("GraphQL error: ", ""));

      //if you hace already signed up let the person be logged in
    }
  };
  const login = async client => {
    let result;
    try {
      result = await client.query({ query: QUERY_ME });
      console.log("me", result.data.me);
      dispatch({
        type: actionTypes.LOGIN_USER,
        payload: { user: result.data.me }
      });
      if (onSuccessHandler) onSuccessHandler();
    } catch (error) {
      console.log("error", error);
      onFailureHandler(error.message.replace("GraphQL error: ", ""));
      //the person does not have an accout with this email - redirect to sign up
    }
  };
  const onRequest = googleUser => {};

  const onSuccess = async googleUser => {
    const { name, email, imageUrl, idToken } = googleUser;
    console.log("onSuccess", name, email, imageUrl, idToken);
    // const client = getClient(idToken);
    const client = getClient(idToken);
    if (mode === "SIGNUP") {
      await signup(client);
    } else {
      await login(client);
    }
  };
  const onFailure = () => {
    console.log("onFailure");
    if (onFailureHandler) onFailureHandler("Google couldn't log you in");
  };
  const refreshToken = expiresIn => {
    setInterval(async () => {
      const { expires_in, id_token } = await window.gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .reloadAuthResponse();
      console.log("here", expires_in, id_token);
      refreshToken(expires_in);
    }, expiresIn * 1000);
  };
  return (
    <GoogleLogin
      onRequest={onRequest}
      onSuccess={onSuccess}
      onFailure={onFailure}
      loginText={loginText}
      clientID={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      refreshToken={refreshToken}
    />
  );
};

Auth.defaultProps = {
  mode: "LOGIN"
};
export default Auth;