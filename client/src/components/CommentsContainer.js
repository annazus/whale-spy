import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Context } from "../Context";
import CommentsList from "./CommentsList";
import NewComment from "./NewComment";
import ApolloClient from "apollo-boost";
import { GRAPHQL_SERVER_URL } from "../graphql/client";
import { actionTypes } from "../actions";
import { QUERY_COMMENTS } from "../graphql/definitions/queries";
import { COMMENT_ADDED_SUBSCRIPTION } from "../graphql/definitions/subscription";
import { Subscription } from "react-apollo";

const useStyles = makeStyles(theme => ({
  container: { width: "100%", position: "relative" },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1)
  }
}));
const CommentsContainer = () => {
  const { state, dispatch } = useContext(Context);
  const classes = useStyles();
  useEffect(() => {
    const getComments = async () => {
      const client = new ApolloClient({
        uri: GRAPHQL_SERVER_URL
      });
      const variables = {
        pinId: state.currentPin.id
      };
      const commentData = await client.query({
        query: QUERY_COMMENTS,
        variables
      });
      if (commentData)
        dispatch({
          type: actionTypes.GET_COMMENTS,
          payload: { comments: commentData.data.comments }
        });
    };
    getComments();
  }, [dispatch, state.currentPin.id]);
  const closeComments = () => {
    dispatch({ type: actionTypes.HIDE_COMMENTS });
    dispatch({ type: actionTypes.UNSELECT_CURRENT_PIN });
  };

  return (
    <Paper className={classes.container}>
      <IconButton onClick={closeComments} className={classes.closeButton}>
        <CloseIcon></CloseIcon>
      </IconButton>

      {state.isAuth ? <NewComment /> : null}
      {state.currentPin.comments ? (
        <CommentsList commentsList={state.currentPin.comments} />
      ) : null}
      <Subscription
        subscription={COMMENT_ADDED_SUBSCRIPTION}
        variables={{ pinId: state.currentPin.id }}
        onSubscriptionData={({ subscriptionData }) => {
          const { commentAdded } = subscriptionData.data;
          dispatch({
            type: actionTypes.ON_COMMENT_ADDED,
            payload: { comment: commentAdded }
          });
        }}
      />
    </Paper>
  );
};

export { CommentsContainer as default };
