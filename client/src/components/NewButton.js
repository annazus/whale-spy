import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const NewButton = ({ onClick }) => {
  return (
    <Fab aria-label="New Pin" color="primary" onClick={onClick}>
      <AddIcon></AddIcon>
    </Fab>
  );
};

export default NewButton;
