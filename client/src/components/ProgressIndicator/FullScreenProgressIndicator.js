import React from "react";
import { makeStyles } from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: theme.zIndex.modal,
    backgroundColor: "rgba(0,0,0,.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  progress: {
    position: "fixed",
    left: "50%",
    top: "50%",
    marginLeft: "-12px",
    marginTop: "-12px"
  }
}));
const FullScreenProgressIndicator = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.background} square>
      <CircularProgress
        color="secondary"
        className={classes.progress}
      ></CircularProgress>
    </Paper>
  );
};

export { FullScreenProgressIndicator as default };
