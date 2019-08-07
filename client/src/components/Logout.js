import React, { useContext } from "react";
import GoogleLogout from "../GoogleLogin/GoogleLogout";
import { Context } from "../Context";
import { actionTypes } from "../actions";
const Logout = () => {
  const { state, dispatch } = useContext(Context);
  const onLogoutSuccess = () => {
    dispatch({ type: actionTypes.SIGNOUT_USER });
  };
  return (
    <GoogleLogout
      onLogoutSuccess={onLogoutSuccess}
      clientID={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      logoutText="Logout"
    />
  );
};
export default Logout;
