import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./Header";
import Map from "./Map";
import { Subscription } from "react-apollo";
import AuthRoute from "./Auth/AuthRoute";
import { Context } from "../Context";
import { ViewSighting } from "./Sightings";
import Sightings from "./Sightings";
import FilterWindow from "./Filter";
import NavigationSideBar from "./NavigationSideBar";
import FullScreenProgressIndicator from "./ProgressIndicator";
import useGoogleAuth from "../GoogleLogin/GoogleAuth";
import FullScreenPhoto from "./FullScreenPhoto";
import { getClient } from "../graphql/client";
import { QUERY_ME, QUERY_SIGHTINGS } from "../graphql/definitions/queries";
import { actionTypes } from "../actions";
import {
  SIGHTING_ADDED_SUBSCRIPTION,
  SIGHTING_DELETED_SUBSCRIPTION,
  SIGHTING_UPDATED_SUBSCRIPTION
} from "../graphql/definitions/subscription";
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
    <BrowserRouter>
      <CssBaseline />

      <Container maxWidth="md" className={classes.container}>
        <FullScreenPhoto></FullScreenPhoto>
        {state.appState.isBusy ? (
          <FullScreenProgressIndicator></FullScreenProgressIndicator>
        ) : null}
        <FilterWindow></FilterWindow>
        <NavigationSideBar></NavigationSideBar>
        <Header />
        <Switch>
          <Route exact path="/" component={Map} />
          <AuthRoute path="/new-sighting" component={Sightings} />
          <Route path="/sighting/:id" component={ViewSighting} />
          <Route component={Map} />
        </Switch>
      </Container>

      {/* Subscriptions for Creating / Updating / Deleting Pins */}
      <Subscription
        subscription={SIGHTING_ADDED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          const { sightingAdded } = subscriptionData.data;
          dispatch({
            type: actionTypes.ON_SIGHTING_ADDED,
            payload: {
              sighting: {
                ...sightingAdded,
                dateSpotted: new Date(sightingAdded.dateSpotted)
              }
            }
          });
        }}
      />
      <Subscription
        subscription={SIGHTING_UPDATED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          const { pinUpdated } = subscriptionData.data;
          dispatch({
            type: actionTypes.ON_SIGHTING_UPDATED,
            payload: {
              pin: {
                ...pinUpdated,
                dateSpotted: new Date(pinUpdated.dateSpotted)
              }
            }
          });
        }}
      />
      <Subscription
        subscription={SIGHTING_DELETED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          const { sightingDeleted } = subscriptionData.data;
          dispatch({
            type: actionTypes.ON_SIGHTING_DELETED,
            payload: { sightingId: sightingDeleted.id }
          });
        }}
      />
    </BrowserRouter>
  );
};

export { Content as default };
