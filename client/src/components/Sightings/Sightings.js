import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { ReactComponent as DraftWhaleIcon } from "../Map/draftWhaleIcon.svg";

import ReactMapGL, { GeolocateControl, Marker } from "react-map-gl";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import MenuItem from "@material-ui/core/MenuItem";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import CloseIcon from "@material-ui/icons/Close";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from "@material-ui/pickers";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InfoIcon from "@material-ui/icons/Info";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DoneIcon from "@material-ui/icons/Done";

import { Direction, ImageInput } from "../Inputs";

import mmTypes from "../../Utils/whaleSpecies";

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    position: "relative"
  },
  imageContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(2)
  },
  done: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(2)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  expansionPanel: {},
  panelDetails: {
    padding: theme.spacing(1),
    flexDirection: "column"
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0
  },
  title: {
    marginTop: theme.spacing(3)
  },
  navStyle: {
    margin: theme.spacing(1),

    position: "absolute",
    top: 0,
    left: 0
  },

  geoLocateStyle: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: theme.spacing(1)
  },

  whaleIconStyle: {
    width: "20px",
    height: "20px",
    color: "red",
    zIndex: "0"
  },
  draftWhaleIconStyle: {
    width: "30px",
    height: "30px",
    color: "red",
    zIndex: "0"
  }
}));

const Sighting = ({
  history,
  sighting,
  saveHandler,
  changeHandler,
  imageUrl,
  clickHandler,
  onDragEndHandler
}) => {
  const [viewport, setViewport] = useState({
    height: 300,
    width: "100%",
    latitude: 47.7237,
    longitude: -122.4713,
    zoom: 8
  });
  const classes = useStyles();
  useEffect(() => {
    window.addEventListener("resize", resizeMap);

    return resizeRemover;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const resizeMap = () => {
    setViewport({
      ...viewport,
      width: "100%"
    });
  };
  const resizeRemover = () => {
    window.removeEventListener("resize", resizeMap);
  };
  const saveIsDisabled = () => {
    const isDisabled = !sighting.dateSpotted || !sighting.species;
    return isDisabled;
  };

  return (
    <Paper className={classes.container}>
      <form
        onSubmit={e => {
          e.preventDefault();
          saveHandler();
        }}
      >
        <div>
          <IconButton
            onClick={() => history.goBack()}
            className={classes.closeButton}
          >
            <CloseIcon></CloseIcon>
          </IconButton>
          <Typography variant="h6" color="primary" align="center">
            New Sighting
          </Typography>
          {sighting.error ? (
            <Typography variant="subtitle1" color="error" align="center">
              {sighting.error}
            </Typography>
          ) : null}
          <FormControl
            component="fieldset"
            fullWidth
            required
            variant="standard"
            margin="normal"
          >
            <FormLabel component="legend">Whale species</FormLabel>

            <RadioGroup
              name="species"
              value={sighting.species}
              onChange={changeHandler}
            >
              {mmTypes.map(({ name, val, helpUrl }) => {
                return (
                  <FormControlLabel
                    key={val}
                    value={val}
                    control={<Radio />}
                    label={
                      <span>
                        {name}
                        {helpUrl ? (
                          <Link href={helpUrl} rel="noopener" target="_blank">
                            <InfoIcon></InfoIcon>
                          </Link>
                        ) : null}
                      </span>
                    }
                  ></FormControlLabel>
                );
              })}
            </RadioGroup>
          </FormControl>
          <Typography variant="subtitle2" color="secondary" align="center">
            Update the location of your sighting by dragging the red whale icon
            or clicking at the new location.
          </Typography>
          <ReactMapGL
            {...viewport}
            onViewportChange={viewport => setViewport(viewport)}
            mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
            onClick={clickHandler}
            mapStyle={process.env.REACT_APP_MAP_LAYER}
          >
            {
              <GeolocateControl
                className={classes.geoLocateStyle}
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
                fitBoundsOptions={{ maxZoom: 8 }}
                showUserLocation={true}
                onViewportChange={setViewport}
              />
            }
            <Marker
              latitude={sighting.latitude}
              longitude={sighting.longitude}
              offsetLeft={-20}
              offsetTop={-10}
              draggable={true}
              onDragEnd={onDragEndHandler}
            >
              <DraftWhaleIcon className={classes.draftWhaleIconStyle} />
            </Marker>
          </ReactMapGL>
          <LocationOnIcon />
          <Typography
            variant="subtitle1"
            component="span"
          >{`${sighting.latitude.toFixed(4)}, ${sighting.longitude.toFixed(
            4
          )}`}</Typography>
        </div>

        {sighting.species === "ORCA" ? (
          <FormControl
            component="fieldset"
            fullWidth
            variant="standard"
            margin="normal"
            defaultValue={null}
          >
            <FormLabel component="legend">Pod</FormLabel>

            <RadioGroup
              value={sighting.pod}
              name="pod"
              onChange={changeHandler}
            >
              {["Unknown", "J", "K", "L", "Transient"].map(val => {
                return (
                  <FormControlLabel
                    key={val}
                    value={val}
                    control={<Radio />}
                    label={val}
                  ></FormControlLabel>
                );
              })}
            </RadioGroup>
          </FormControl>
        ) : null}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            required
            fullWidth
            variant="standard"
            margin="normal"
            value={new Date(sighting.dateSpotted)}
            format="MM/dd/yyyy hh:mm a"
            id="date-picker-inline"
            label="Date and Time of sighting"
            onChange={date => {
              const event = {
                target: {
                  value: new Date(date).getTime(),
                  name: "dateSpotted"
                }
              };
              changeHandler(event);
            }}
          />
        </MuiPickersUtilsProvider>

        <FormControl fullWidth variant="standard" margin="normal">
          <InputLabel htmlFor="countAdults">Count of adults</InputLabel>

          <Select
            value={sighting.countAdults}
            onChange={changeHandler}
            inputProps={{
              name: "countAdults",
              id: "s"
            }}
          >
            {["0", "1", "2", "3", "4", "5", "6", "7+"].map(value => {
              return (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="standard" margin="normal">
          <InputLabel htmlFor="babyCount">Count of juveniles</InputLabel>

          <Select
            id="countYoung"
            value={sighting.countYoung}
            onChange={changeHandler}
            inputProps={{
              name: "countYoung",
              id: "countYoung"
            }}
          >
            {["0", "1", "2", "3", "4", "5", "6", "7+"].map(value => {
              return (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Direction
          id="direction"
          name="direction"
          value={sighting.direction}
          onChange={changeHandler}
        ></Direction>

        <div className={classes.imageContainer}>
          <ImageInput
            onChange={changeHandler}
            imageUrl={sighting.image}
          ></ImageInput>
        </div>
        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Whale Behavior (optional)</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.panelDetails}>
            <FormControl fullWidth variant="standard" margin="normal">
              <FormControlLabel
                control={
                  <Switch
                    checked={sighting.vocalizing}
                    value={sighting.vocalizing}
                    onChange={e => {
                      changeHandler({
                        target: {
                          name: "vocalizing",
                          value: e.target.checked
                        }
                      });
                    }}
                    name="vocalizing"
                  />
                }
                label="Vocalizing"
              />
            </FormControl>
            <FormControl fullWidth variant="standard" margin="normal">
              <InputLabel htmlFor="activity">Activity</InputLabel>

              <Select
                id="activity"
                name="activity"
                value={sighting.activity}
                onChange={changeHandler}
              >
                {[
                  "",
                  "Breaching",
                  "Feeding",
                  "Hunting",
                  "Sleeping",
                  "Playing",
                  "Spyhopping"
                ].map(value => {
                  return (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="standard" margin="normal">
              <InputLabel htmlFor="interactionWithObservers">
                Interaction with Observers
              </InputLabel>

              <Select
                id="interactionWithObservers"
                name="interactionWithObservers"
                value={sighting.interactionWithObservers}
                onChange={changeHandler}
              >
                {[
                  "",
                  "Approached observers",
                  "Appeared interested in observers",
                  "Moved away"
                ].map(value => {
                  return (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel square className={classes.expansionPanel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Observer Details (optional)</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.panelDetails}>
            <FormControl fullWidth variant="standard" margin="normal">
              <InputLabel htmlFor="observerPosition">
                Where was the observer
              </InputLabel>

              <Select
                id="observerLocation"
                name="observerLocation"
                value={sighting.observerLocation}
                onChange={changeHandler}
              >
                {["", "Water", "Land", "Air"].map(value => {
                  return (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="standard" margin="normal">
              <InputLabel htmlFor="observerDistance">
                Observer Distance
              </InputLabel>

              <Select
                id="observerDistance"
                name="observerDistance"
                value={sighting.observerDistance}
                onChange={changeHandler}
              >
                {[
                  "",
                  "<100 meters",
                  "100 meters",
                  "200 meters",
                  "1 mile",
                  "> 1 mile"
                ].map(value => {
                  return (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>
                <Link
                  href="https://www.bewhalewise.org"
                  target="_blank"
                  color="secondary"
                  rel="noopener"
                >
                  (Recommendations to Be Whale Wise)
                </Link>
              </FormHelperText>
            </FormControl>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <TextField
          placeholder="Notes"
          rows={4}
          rowsMax={4}
          multiline
          variant="standard"
          onChange={changeHandler}
          name="content"
          value={sighting.content}
          margin="normal"
          fullWidth
        ></TextField>

        <div className={classes.done}>
          <Button
            variant="contained"
            color="secondary"
            onClick={e => {
              e.preventDefault();
              saveHandler();
            }}
            disabled={saveIsDisabled()}
          >
            Save
            <DoneIcon className={classes.rightIcon} />
          </Button>
        </div>
      </form>
    </Paper>
  );
};
export default Sighting;
