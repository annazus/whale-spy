import React, { useContext, useState } from "react";
import { useAuthenticatedClient } from "../graphql/client";
import { Context } from "../Context";
import { actionTypes } from "../actions";
import { MUTATION_CREATE_COMMENT } from "../graphql/definitions/mutations";
import { StatsReport } from "apollo-engine-reporting-protobuf";
const NewComment = ({ pinId }) => {
  const client = useAuthenticatedClient();
  const { state, dispatch } = useContext(Context);
  const [comment, setComment] = useState("");
  const submitHandler = async e => {
    e.preventDefault();

    try {
      const variables = { text: comment, pinId: state.currentPin.id };

      const newComment = await client.mutate({
        mutation: MUTATION_CREATE_COMMENT,
        variables
      });
      dispatch({
        type: actionTypes.CREATE_COMMENT,
        payload: { comment: newComment.data.createComment }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const discardHandler = e => {
    setComment("");
  };
  return (
    <form onSubmit={submitHandler}>
      <textarea
        cols="9"
        rows="4"
        value={comment}
        onChange={e => {
          setComment(e.target.value);
        }}
      />
      <button onClick={discardHandler}>Cancel</button>
      <button onClick={submitHandler}>Submit</button>
    </form>
  );
};

export { NewComment as default };
