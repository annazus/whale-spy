import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/MenuRounded";
import FilterListIcon from "@material-ui/icons/FilterListRounded";
import EyeIcon from "@material-ui/icons/VisibilityRounded";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import { makeStyles } from "@material-ui/core";

import { Context } from "../../Context";
import { actionTypes } from "../../actions";
import Logo from "../Logo";

const useStyles = makeStyles(theme => ({
  container: {},
  grow: {},
  title: {
    marginLeft: theme.spacing(2),
    display: "none",
    [theme.breakpoints.up("sm")]: { display: "block" }
  },
  filterButton: {
    marginRight: theme.spacing(1)
  },
  searchMapInput: {
    marginLeft: theme.spacing(2),
    color: "inherit",
    flex: 1
  },
  divider: {
    height: 28,
    width: 1,
    marginRight: 4,
    backgroundColor: theme.palette.primary.light
  },

  menuButton: {}
}));

const Header = () => {
  const { state, dispatch } = useContext(Context);

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <AppBar position="static" component="header">
        <Toolbar>
          <Logo />
          <Typography variant="h6" className={classes.title}>
            Whale Spy
          </Typography>
          <div className={classes.grow}></div>
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
          >
            <SearchIcon color="inherit" />
          </IconButton>
          {!state.appState.isNewSighting &&
          !state.appState.isEditingSighting ? (
            <Divider
              className={classes.divider}
              orientation="vertical"
              light={true}
            />
          ) : null}

          {state.appState.isAuth &&
          !state.appState.isNewSighting &&
          !state.appState.isEditingSighting ? (
            <Tooltip title="Add a sighting">
              <IconButton
                color="inherit"
                edge="end"
                onClick={() => {
                  dispatch({
                    type: actionTypes.CREATE_DRAFT_PIN,
                    payload: {
                      draftPin: {
                        ...state.draftPin,
                        dateSpotted: new Date().getTime(),
                        longitude: state.map.viewport.longitude,
                        latitude: state.map.viewport.latitude
                      }
                    }
                  });
                }}
              >
                <EyeIcon fontSize="normal"></EyeIcon>
              </IconButton>
            </Tooltip>
          ) : null}
          {!state.appState.isNewSighting &&
          !state.appState.isEditingSighting ? (
            <>
              <Tooltip title="Filter sightings">
                <IconButton
                  className={classes.filterButton}
                  color="inherit"
                  edge="end"
                  onClick={() => dispatch({ type: actionTypes.FILTER_OPEN })}
                >
                  <FilterListIcon fontSize="small"></FilterListIcon>
                </IconButton>
              </Tooltip>

              <IconButton
                color="inherit"
                className={classes.menuButton}
                edge="end"
                onClick={() => dispatch({ type: actionTypes.SHOW_NAV_SIDE })}
              >
                <MenuIcon fontSize="large"></MenuIcon>
              </IconButton>
            </>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
};
export { Header as default };

// {!state.isAuth ? (
//   <>
//     <Button
//       onClick={() => dispatch({ type: actionTypes.FILTER_OPEN })}
//     >
//       <Typography
//         variant="button"
//         className={classes.title}
//         color="inherit"
//       >
//         Filter
//       </Typography>
//     </Button>
//     <Auth mode="SIGNUP" loginText="Signup" />
//     <Auth mode="LOGIN" loginText="Login" />
//   </>
// ) : (
//   <Logout logoutText="Logout" />
// )}

// <Typography variant="h6" className={classes.title}>
// Whale Spy
// </Typography>
