import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

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
const useStyles = makeStyles(theme => ({
  container: { position: "relative", padding: 0 }
}));
const Content = () => {
  const classes = useStyles();
  const { state } = useContext(Context);
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" className={classes.container}>
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
