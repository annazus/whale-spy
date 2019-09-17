import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import Map from "./Map";
import { Context } from "../Context";
import { SightingHeader } from "./Sightings";
import Sightings from "./Sightings";
import CommentsContainer from "./CommentsContainer";
import FilterWindow from "./Filter";
import NavigationSideBar from "./NavigationSideBar";
import FullScreenProgressIndicator from "./ProgressIndicator";
import useGoogleAuth from "../GoogleLogin/GoogleAuth";
import { getClient } from "../graphql/client";
import { QUERY_ME } from "../graphql/definitions/queries";
import { actionTypes } from "../actions";
const useStyles = makeStyles(theme => ({
  container: { position: "relative", padding: 0 }
}));
const Content = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(Context);
  const { isSignedIn, googleUser } = useGoogleAuth();
  useEffect(() => {
    let idToken, client;
    if (googleUser) {
      idToken = googleUser.idToken;
      client = getClient(idToken);
    }

    const login = async () => {
      try {
        const result = await client.query({ query: QUERY_ME });
        console.log("me", result.data.me);
        dispatch({
          type: actionTypes.LOGIN_USER,
          payload: { user: result.data.me }
        });
      } catch (error) {
        console.log("error", error);
        //the person does not have an accout with this email - redirect to sign up
      }
    };
    if (idToken) login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleUser]);
  console.log("googleUser", googleUser);
  return (
    <>
      <CssBaseline />

      <Container maxWidth="md" className={classes.container}>
        <Typography>
          {isSignedIn}
          {googleUser ? googleUser.email : null}
        </Typography>
        {state.appState.isBusy ? (
          <FullScreenProgressIndicator></FullScreenProgressIndicator>
        ) : null}
        <FilterWindow></FilterWindow>
        <NavigationSideBar></NavigationSideBar>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12}>
            <SightingHeader></SightingHeader>
          </Grid>

          <Grid item xs={12}>
            <Map />
          </Grid>
          {state.showComments ? (
            <Grid item xs={12}>
              <CommentsContainer />
            </Grid>
          ) : state.appState.isNewSighting ? (
            <Grid item xs={12}>
              <Sightings />
            </Grid>
          ) : null}
        </Grid>
      </Container>
    </>
  );
};

export { Content as default };
