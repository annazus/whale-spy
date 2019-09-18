import React, { useContext } from "react";
import GoogleLogout from "../../GoogleLogin/GoogleLogout";
import { Context } from "../../Context";
import { actionTypes } from "../../actions";
const Logout = ({ onSuccessHandler }) => {
  const { dispatch } = useContext(Context);
  const onLogoutSuccess = () => {
    dispatch({ type: actionTypes.SIGNOUT_USER });
    if (onSuccessHandler) onSuccessHandler();
  };
  return <GoogleLogout onLogoutSuccess={onLogoutSuccess} logoutText="Logout" />;
};
export default Logout;
