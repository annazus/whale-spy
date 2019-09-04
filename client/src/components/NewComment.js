import React, { useContext, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import { useAuthenticatedClient } from "../graphql/client";
import { Context } from "../Context";
import { actionTypes } from "../actions";
import { MUTATION_CREATE_COMMENT } from "../graphql/definitions/mutations";

const useStyles = makeStyles(theme => ({
  root: {
    position: "static",
    margin: theme.spacing(5)
  }
}));
const NewComment = ({ pinId }) => {
  const classes = useStyles();
  const client = useAuthenticatedClient();
  const { state, dispatch } = useContext(Context);
  const [comment, setComment] = useState("");
  console.log(classes.root);
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
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };
  const discardHandler = e => {
    setComment("");
  };
  return (
    <div className={classes.root}>
      <form onSubmit={submitHandler}>
        <TextField
          multiline
          rows="4"
          fullWidth
          margin="normal"
          placeholder="Enter Comment"
          value={comment}
          onChange={e => {
            setComment(e.target.value);
          }}
        />
        <IconButton onClick={submitHandler}>
          <CheckIcon></CheckIcon>
        </IconButton>

        <IconButton onClick={discardHandler}>
          <DeleteIcon></DeleteIcon>
        </IconButton>
      </form>
    </div>
  );
};

export { NewComment as default };
