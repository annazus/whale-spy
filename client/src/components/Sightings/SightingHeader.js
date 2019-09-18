import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/CloseRounded";

import { actionTypes } from "../../actions";
import { Context } from "../../Context";

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1),
    position: "relative"
  },

  closeButton: {
    position: "absolute",
    top: 0,
    right: 0
  },
  title: {
    marginTop: theme.spacing(3)
  }
}));

const SightingHeader = () => {
  const { state, dispatch } = useContext(Context);
  const classes = useStyles();

  const closeHandler = () => {
    if (state.appState.isNewSighting) {
      dispatch({ type: actionTypes.DISCARD_DRAFT });
    } else {
      dispatch({ type: actionTypes.DISCARD_CURRENT_PIN_CHANGES });
    }
  };

  if (!state.appState.isNewSighting && !state.appState.isEditingSighting) {
    return null;
  } else
    return (
      <Paper className={classes.container} square>
        <IconButton onClick={closeHandler} className={classes.closeButton}>
          <CloseIcon></CloseIcon>
        </IconButton>
        <Typography variant="h6" color="primary" align="center">
          {state.appState.isNewSighting ? "New" : "Update"} Sighting
        </Typography>
        {state.appData.error ? (
          <Typography variant="subtitle1" color="error" align="center">
            {state.appData.error}
          </Typography>
        ) : null}

        <Typography variant="subtitle2" color="secondary" align="center">
          Update the location of your sighting by dragging the red whale icon or
          clicking at the new location.
        </Typography>
      </Paper>
    );
};

export { SightingHeader as default };
