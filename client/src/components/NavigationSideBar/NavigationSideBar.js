import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/CloseRounded";
import { Context } from "../../Context";
import { actionTypes } from "../../actions";
import Auth from "../Auth";
import { Logout } from "../Auth";

const useStyles = makeStyles(theme => ({
  container: {
    position: "relative"
  },
  drawerContents: {
    width: "320px"
  },
  avatar: {
    margin: theme.spacing(2)
  },
  appBar: {
    height: "64px",
    width: "100%",
    backgroundColor: theme.palette.grey[100]
  },
  closeButton: {
    position: "absolute",
    margin: "0",
    top: theme.spacing(0),
    right: theme.spacing(0)
  },
  menuItem: {
    margin: theme.spacing(2)
  },
  error: {
    margin: theme.spacing(2)
  }
}));
const NavigationSideBar = () => {
  const [error, setError] = useState(null);
  const { state, dispatch } = useContext(Context);
  const classes = useStyles();

  const onSuccessHandler = () => {
    setError(null);
    dispatch({ type: actionTypes.HIDE_NAV_SIDE });
  };

  const onFailureHandler = error => {
    setError(error);
  };

  return (
    <div className={classes.container}>
      <Drawer
        className={classes.drawer}
        PaperProps={{ square: true }}
        open={state.showNavigationSideBar}
        anchor="right"
        onClose={() => {
          setError(null);
          dispatch({ type: actionTypes.HIDE_NAV_SIDE });
        }}
      >
        <IconButton
          className={classes.closeButton}
          onClick={() => {
            setError(null);
            dispatch({ type: actionTypes.HIDE_NAV_SIDE });
          }}
        >
          <CloseIcon fontSize="normal"></CloseIcon>
        </IconButton>
        <div className={classes.appBar}>
          {state.isAuth ? (
            <Avatar
              className={classes.avatar}
              alt={state.appData.me.name}
              src={state.appData.me.picture}
            ></Avatar>
          ) : null}
        </div>

        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          wrap="nowrap"
          className={classes.drawerContents}
        >
          <Grid item xl={12} className={classes.menuItem}>
            <Link
              href="https://www.bewhalewise.org"
              target="_blank"
              textAlign="center"
              rel="noopener"
              variant="body1"
            >
              <Typography variant="body1"> Be Whale Wise</Typography>
            </Link>
          </Grid>
          <Grid item xl={12}>
            <Divider></Divider>
          </Grid>
          <Grid item xl={12} className={classes.menuItem}>
            <Link
              href="https://www.www.org"
              target="_blank"
              textAlign="center"
              rel="noopener"
              variant="body1"
            >
              <Typography variant="body1"> About</Typography>
            </Link>
          </Grid>
          <Grid item xl={12}>
            <Divider></Divider>
          </Grid>
          {error ? (
            <Grid item xs={12} className={classes.error}>
              <Typography variant="subtitle2" align="center" color="error">
                {error}
              </Typography>
            </Grid>
          ) : null}
          <Grid item xl={12} className={classes.menuItem}>
            {!state.appState.isAuth ? (
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
                wrap="nowrap"
              >
                <Grid item xl={6}>
                  <Auth
                    mode="SIGNUP"
                    loginText="Signup"
                    onSuccessHandler={onSuccessHandler}
                    onFailureHandler={onFailureHandler}
                  />
                </Grid>
                <Grid item xl={6}>
                  <Auth
                    mode="LOGIN"
                    loginText="Login"
                    onSuccessHandler={onSuccessHandler}
                    onFailureHandler={onFailureHandler}
                  />
                </Grid>
              </Grid>
            ) : (
              <Logout logoutText="Logout" onSuccessHandler={onSuccessHandler} />
            )}
          </Grid>
        </Grid>
      </Drawer>
    </div>
  );
};

export { NavigationSideBar as default };
