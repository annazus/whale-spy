import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "../../Context";
const AuthRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(Context);

  return (
    <Route
      {...rest}
      render={props =>
        state.appState.isAuth ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/"></Redirect>
        )
      }
    ></Route>
  );
};

export default AuthRoute;
