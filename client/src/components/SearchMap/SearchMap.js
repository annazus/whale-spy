import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";

import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  container: { flex: 1 },
  input: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginLeft: theme.spacing(2)
  },
  iconButton: {
    marginRight: theme.spacing(2)
  },

  searchMapInput: {
    color: "inherit",
    flex: 1
  },
  list: { width: "100%" }
}));

const PlacesList = ({ places }) => {
  const [showPlacesList, setShowPlaces] = useState(false);
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.input}>
        <InputBase
          className={classes.searchMapInput}
          placeholder="Search Map"
          autoFocus
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton
          className={classes.iconButton}
          aria-label="search"
          color="inherit"
          onClick={() =>
            alert("The search map functionality has not been implemented")
          }
        >
          <SearchIcon color="inherit" />
        </IconButton>
      </div>

      {showPlacesList ? (
        <List className={classes.list}>
          {places.map(element => (
            <ListItem alignItems="flex=start" autoFocus divider>
              <ListItemText>{element.label}</ListItemText>
            </ListItem>
          ))}
        </List>
      ) : null}
    </div>
  );
};

export default PlacesList;
