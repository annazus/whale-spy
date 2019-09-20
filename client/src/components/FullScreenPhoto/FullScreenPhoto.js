import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import { Context } from "../../Context";
import { actionTypes } from "../../actions";
const useStyles = makeStyles(theme => ({
  image: {
    zIndex: theme.zIndex.modal,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    margin: "auto",
    objectFit: "cover"
  }
}));
const FullScreenPhoto = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(Context);
  console.log(state.appState.showPhotoFullScreen, state.appData.imageUrl);
  const output = state.appState.showPhotoFullScreen ? (
    <div>
      <img
        src={state.appData.imageUrl}
        alt={state.appData.imageUrl}
        className={classes.image}
        onClick={() =>
          dispatch({ type: actionTypes.TOGGLE_FULLSCREEN_PHOTO, payload: null })
        }
      ></img>
    </div>
  ) : null;
  console.log(output);
  return output;
};

export default FullScreenPhoto;
