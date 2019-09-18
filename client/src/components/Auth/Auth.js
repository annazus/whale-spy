import React, { useContext, useState } from "react";
import { GoogleLogin } from "../../GoogleLogin";
import { getClient } from "../../graphql/client";
import { MUTATION_SIGNUP } from "../../graphql/definitions/mutations";
import { QUERY_ME } from "../../graphql/definitions/queries";
import { Context } from "../../Context";
import { actionTypes } from "../../actions";
const Auth = ({ mode, loginText, onSuccessHandler, onFailureHandler }) => {
  const { state, dispatch } = useContext(Context);
  const signup = async client => {
    let result;
    try {
      result = await client.mutate({ mutation: MUTATION_SIGNUP });
      dispatch({
        type: actionTypes.SIGNUP_USER,
        payload: { user: result.data.signup }
      });
      if (onSuccessHandler) onSuccessHandler();
    } catch (error) {
      onFailureHandler(error.message.replace("GraphQL error: ", ""));

      //if you hace already signed up let the person be logged in
    }
  };
  const login = async client => {
    let result;
    try {
      result = await client.query({ query: QUERY_ME });
      dispatch({
        type: actionTypes.LOGIN_USER,
        payload: { user: result.data.me }
      });
      if (onSuccessHandler) onSuccessHandler();
    } catch (error) {
      onFailureHandler(error.message.replace("GraphQL error: ", ""));
      //the person does not have an accout with this email - redirect to sign up
    }
  };
  const onRequest = googleUser => {};

  const onSuccess = async googleUser => {
    const { name, email, imageUrl, idToken } = googleUser;
    // const client = getClient(idToken);
    const client = getClient(idToken);
    if (mode === "SIGNUP") {
      await signup(client);
    } else {
      await login(client);
    }
  };
  const onFailure = () => {
    if (onFailureHandler) onFailureHandler("Google couldn't log you in");
  };
  const refreshToken = expiresIn => {
    setInterval(async () => {
      const { expires_in, id_token } = await window.gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .reloadAuthResponse();
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
