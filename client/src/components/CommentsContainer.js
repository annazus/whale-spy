import React, { useEffect, useContext, useState } from "react";
import { Context } from "../Context";
import CommentsList from "./CommentsList";
import NewComment from "./NewComment";
import ApolloClient from "apollo-boost";
import { GRAPHQL_SERVER_URL } from "../graphql/client";
import { actionTypes } from "../actions";
import { QUERY_COMMENTS } from "../graphql/definitions/queries";
import { COMMENT_ADDED_SUBSCRIPTION } from "../graphql/definitions/subscription";
import { Subscription } from "react-apollo";
const CommentsContainer = () => {
  const { state, dispatch } = useContext(Context);
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
      console.log(commentData);
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
  };
  return (
    <div>
      <button onClick={closeComments}>Close Comments</button>
      {state.isAuth ? <NewComment /> : null}
      {state.currentPin.comments ? (
        <CommentsList commentsList={state.currentPin.comments} />
      ) : null}
      <Subscription
        subscription={COMMENT_ADDED_SUBSCRIPTION}
        variables={{ pinId: state.currentPin.id }}
        onSubscriptionData={({ subscriptionData }) => {
          console.log("subcomment", subscriptionData);
          const { commentAdded } = subscriptionData.data;
          dispatch({
            type: actionTypes.ON_COMMENT_ADDED,
            payload: { comment: commentAdded }
          });
        }}
      />
    </div>
  );
};

export { CommentsContainer as default };
