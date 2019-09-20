import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./Header";
import Map from "./Map";
import { Context } from "../Context";
import { SightingHeader } from "./Sightings";
import { ViewSighting } from "./Sightings";
import Sightings from "./Sightings";
import CommentsContainer from "./CommentsContainer";
import FilterWindow from "./Filter";
import NavigationSideBar from "./NavigationSideBar";
import FullScreenProgressIndicator from "./ProgressIndicator";
import useGoogleAuth from "../GoogleLogin/GoogleAuth";
import FullScreenPhoto from "./FullScreenPhoto";
import { getClient } from "../graphql/client";
import { QUERY_ME, QUERY_SIGHTINGS } from "../graphql/definitions/queries";
import { actionTypes } from "../actions";
const useStyles = makeStyles(theme => ({
  container: {
    position: "relative",
    padding: 0,
    overflow: "hidden",
    height: "100%"
  }
}));
const Content = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(Context);
  const { googleUser } = useGoogleAuth();
  useEffect(() => {
    const getData = async () => {
      const client = getClient();
      try {
        const sightingsData = await client.query({ query: QUERY_SIGHTINGS });
        dispatch({
          type: actionTypes.GET_SIGHTINGS,
          payload: sightingsData.data
        });
      } catch (error) {
        console.log(error);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let idToken, client;
    if (googleUser) {
      idToken = googleUser.idToken;
      client = getClient(idToken);
    }

    const login = async () => {
      try {
        const result = await client.query({ query: QUERY_ME });
        dispatch({
          type: actionTypes.LOGIN_USER,
          payload: { user: result.data.me }
        });
      } catch (error) {
        //the person does not have an accout with this email - redirect to sign up
      }
    };
    if (idToken) login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleUser]);
  return (
    <>
      <CssBaseline />

      <Container maxWidth="md" className={classes.container}>
        <FullScreenPhoto></FullScreenPhoto>
        {state.appState.isBusy ? (
          <FullScreenProgressIndicator></FullScreenProgressIndicator>
        ) : null}
        <FilterWindow></FilterWindow>
        <NavigationSideBar></NavigationSideBar>
        <Header />
        {state.appState.showSighting ? (
          <ViewSighting
            sighting={state.appData.popup}
            closeHandler={() => dispatch({ type: actionTypes.CLOSE_SIGHTING })}
            showFullScreenHandler={() =>
              dispatch({
                type: actionTypes.TOGGLE_FULLSCREEN_PHOTO,
                payload: state.appData.popup.images.length
                  ? state.appData.popup.images[0].url
                  : null
              })
            }
          ></ViewSighting>
        ) : null}
        <SightingHeader></SightingHeader>
        {!state.appState.showSighting ? <Map /> : null}
        {state.showComments ? (
          <CommentsContainer />
        ) : state.appState.isNewSighting ? (
          <Sightings />
        ) : null}
      </Container>
    </>
  );
};

export { Content as default };
