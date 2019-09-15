import React, { useContext, createRef } from "react";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import Map from "./Map";
import { Context } from "../Context";
import PinContent from "./Pin/PinContent";
import UpdatePin from "./Pin/UpdatePin";
import CommentsContainer from "./CommentsContainer";
import FilterWindow from "./Filter";
import NavigationSideBar from "./NavigationSideBar";
const useStyles = makeStyles(theme => ({ container: { padding: 0 } }));
const Content = () => {
  const classes = useStyles();
  const { state } = useContext(Context);
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" className={classes.container}>
        <FilterWindow></FilterWindow>
        <NavigationSideBar></NavigationSideBar>

        <Grid container direction="row" alignItems="center">
          <Grid item xs={12}>
            <Header />
          </Grid>
          {state.draftPin && state.isAuth ? (
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                color="secondary"
                gutterBottom
                align="center"
              >
                Update the location of your sighting by moving the red whale
                icon or clicking on the map.
              </Typography>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <Map />
          </Grid>
          {state.showComments ? (
            <Grid item xs={12}>
              <CommentsContainer />
            </Grid>
          ) : state.draftPin && state.isAuth ? (
            <Grid item xs={12}>
              <PinContent />
            </Grid>
          ) : state.currentPin && state.isAuth ? (
            <Grid item xs={12}>
              <UpdatePin />
            </Grid>
          ) : null}
        </Grid>
      </Container>
    </>
  );
};

export { Content as default };
