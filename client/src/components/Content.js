import React, { useContext, createRef } from "react";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";

import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import Map from "./Map";
import { Context } from "../Context";
import PinContent from "./Pin/PinContent";
import UpdatePin from "./Pin/UpdatePin";
import CommentsContainer from "./CommentsContainer";

const Content = () => {
  const { state } = useContext(Context);
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container direction="row" alignContent="center">
          <Grid item xs={12}>
            <Header />
          </Grid>

          {state.showComments ? (
            <Grid item xs={12} sm={6}>
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
          <Grid item xs={12}>
            <Map />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export { Content as default };
