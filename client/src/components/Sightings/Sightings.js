import React, { createRef, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import MenuItem from "@material-ui/core/MenuItem";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

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

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from "@material-ui/pickers";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InfoIcon from "@material-ui/icons/Info";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DoneIcon from "@material-ui/icons/Done";

import Direction from "../Direction";
import InputImage from "../Inputs/ImageInput";

import mmTypes from "../../Utils/whaleSpecies";

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2)
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
  }
}));

const Sighting = ({ sighting, saveHandler, changeHandler, imageUrl }) => {
  const classes = useStyles();

  const saveIsDisabled = () => {
    const isDisabled =
      !sighting.dateSpotted ||
      !sighting.whaleSpecies ||
      !(sighting.adultCount || sighting.juvenileCount) ||
      !sighting.direction;

    console.log("isDisabled", isDisabled);
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
          <LocationOnIcon />
          <Typography
            variant="subtitle1"
            component="span"
          >{`${sighting.latitude.toFixed(4)}, ${sighting.longitude.toFixed(
            4
          )}`}</Typography>
        </div>

        <FormControl
          component="fieldset"
          fullWidth
          required
          variant="standard"
          margin="normal"
        >
          <FormLabel component="legend">Whale species</FormLabel>

          <RadioGroup
            name="whaleSpecies"
            value={sighting.whaleSpecies}
            onChange={changeHandler}
          >
            {mmTypes.map(({ name, val, helpUrl }) => {
              return (
                <FormControlLabel
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

        {sighting.whaleSpecies === "Orca" ? (
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
              console.log("date", date);
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

        <FormControl fullWidth variant="standard" margin="normal" required>
          <InputLabel htmlFor="adultCount">Count of adults</InputLabel>

          <Select
            value={sighting.adultCount}
            onChange={changeHandler}
            inputProps={{
              name: "adultCount",
              id: "adultCount"
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, "6+"].map(value => {
              return <MenuItem value={value}>{value}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="standard" margin="normal" required>
          <InputLabel htmlFor="babyCount">Count of juveniles</InputLabel>

          <Select
            id="juvenileCount"
            value={sighting.juvenileCount}
            onChange={changeHandler}
            inputProps={{
              name: "juvenileCount",
              id: "juvenileCount"
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, "6+"].map(value => {
              return <MenuItem value={value}>{value}</MenuItem>;
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
          <InputImage
            onChange={changeHandler}
            imageUrl={sighting.image}
          ></InputImage>
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
                    checked={sighting.isVocalizing}
                    value={sighting.isVocalizing}
                    onChange={changeHandler}
                    name="isVocalizing"
                  />
                }
                label="Vocalizing"
              />
            </FormControl>
            <FormControl fullWidth variant="standard" margin="normal">
              <InputLabel htmlFor="whaleActivity">Activity</InputLabel>

              <Select
                id="whaleActivity"
                name="whaleActivity"
                value={sighting.whaleActivity}
                onChange={changeHandler}
              >
                {[
                  "",
                  "Feeding",
                  "Hunting",
                  "Breaching",
                  "Sleeping",
                  "Playing"
                ].map(value => {
                  return <MenuItem value={value}>{value}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="standard" margin="normal">
              <InputLabel htmlFor="interactionObserver">
                Interaction with Observers
              </InputLabel>

              <Select
                id="interactionObserver"
                name="interactionObserver"
                value={sighting.interactionObserver}
                onChange={changeHandler}
              >
                {[
                  "",
                  "Approached observers",
                  "Appeared interested in observers",
                  "Moved away"
                ].map(value => {
                  return <MenuItem value={value}>{value}</MenuItem>;
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
                id="observerPosition"
                name="observerPosition"
                value={sighting.observerPosition}
                onChange={changeHandler}
              >
                {["", "Land", "Boat", "Air"].map(value => {
                  return <MenuItem value={value}>{value}</MenuItem>;
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
                  "<100 meters",
                  "100 meters",
                  "200 meters",
                  "1 mile",
                  "> 1 mile"
                ].map(value => {
                  return <MenuItem value={value}>{value}</MenuItem>;
                })}
              </Select>
              <FormHelperText>
                <Link
                  href="https://www.bewhalewise.org"
                  target="_blank"
                  textAlign="center"
                  color="error"
                  rel="noopener"
                >
                  (Recommendations to Be Whale Wise)
                </Link>
              </FormHelperText>
            </FormControl>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <TextField
          placeholder="Other information"
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
            <DoneIcon color="white" className={classes.rightIcon} />
          </Button>
        </div>
      </form>
    </Paper>
  );
};
export default Sighting;
