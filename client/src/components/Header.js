import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { Context } from "../Context";
import { actionTypes } from "../actions";
import Auth from "./Auth";
import Logout from "./Logout";
import Logo from "./Logo";

const useStyles = makeStyles(theme => ({
  root: { flexGrow: 1 },
  title: {
    flexGrow: 1
  }
}));

const Header = () => {
  const { state, dispatch } = useContext(Context);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" component="header">
        <Toolbar>
          <Logo />
          <Typography variant="h6" className={classes.title}>
            Whale Spy
          </Typography>
          {!state.isAuth ? (
            <>
              <Button
                onClick={() => dispatch({ type: actionTypes.FILTER_OPEN })}
              >
                <Typography
                  variant="button"
                  className={classes.title}
                  color="inherit"
                >
                  Filter
                </Typography>
              </Button>
              <Auth mode="SIGNUP" loginText="Signup" />
              <Auth mode="LOGIN" loginText="Login" />
            </>
          ) : (
            <Logout logoutText="Logout" />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
export { Header as default };
