//Itesm to add
//Confidence of identification
//Were you on a boat, flying or from land?
//How far away were you?
//what was the whales doing?
//were they moving fast, slow or stationary
//Was it vocalizing
//Was there interaction with the observes?

import React, { createRef, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Link from "@material-ui/core/Link";
import InfoIcon from "@material-ui/icons/Info";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from "@material-ui/pickers";

import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import Direction from "../Direction";
import InputImage from "../Inputs/ImageInput";
import DateTimeInput from "../Inputs/DateTimeInput";
import { formatToDisplay } from "../../Utils/DateFormatFunctions";
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
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0
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

const Pin = ({
  mode,
  pin,
  handleSaveClick,
  handleDiscardClick,
  handleOnChange,
  imageUrl
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    setIsDisabled(!(pin.title && pin.content && pin.dateSpotted && pin.image));
    console.log(isDisabled);
  }, [isDisabled, pin.content, pin.dateSpotted, pin.image, pin.title]);
  const fileUploadWidget = createRef();
  const mmTypes = [
    // { name: "Pacific Harbor Seal", val: "Pacific Harbor Seal" },
    // { name: "California Sea Lion", val: "California Sea Lion" },
    // { name: "Steller Sea Lion", val: "Steller Sea Lion" },
    // { name: "Northern Elephant Seal", val: "Northern Elephant Seal" },
    // { name: "Harbor Porpoise", val: "Harbor Porpoise" },
    // { name: "Dall's Porpoise", val: "Dall's Porpoise" },
    // { name: "Some type of Whale", val: "Whale" },

    {
      name: "Orca (Killer Whale)",
      val: "Orca",
      helpUrl:
        "https://www.whalewatching.com/about-the-whales/puget-orca-whale/"
    },
    {
      name: "Gray Whale",
      val: "Gray",
      helpUrl: "https://www.whalewatching.com/about-the-whales/gray-whale/"
    },
    {
      name: "Humpback Whale",
      val: "Humpback",
      helpUrl: "https://www.whalewatching.com/about-the-whales/humpback-whale/"
    },
    {
      name: "Minke Whale",
      val: "Minke",
      helpUrl: "https://www.whalewatching.com/about-the-whales/minke-whale/"
    },
    { name: "Unknown/Couldn't identify", val: "Unknown", helpUrl: null }
  ];
  return (
    <Paper className={classes.container}>
      <IconButton onClick={handleDiscardClick} className={classes.closeButton}>
        <CloseIcon></CloseIcon>
      </IconButton>

      <form
        onSubmit={e => {
          e.preventDefault();
          handleSaveClick(fileUploadWidget);
        }}
      >
        <div>
          <LocationOnIcon />
          <Typography
            variant="subtitle1"
            component="span"
          >{`${pin.latitude.toFixed(4)}, ${pin.longitude.toFixed(
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

          <RadioGroup>
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

        <FormControl
          component="fieldset"
          fullWidth
          required
          variant="standard"
          margin="normal"
          defaultValue="Unknown"
        >
          <FormLabel component="legend">Pod</FormLabel>

          <RadioGroup value="Unknown">
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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            required
            fullWidth
            variant="standard"
            margin="normal"
            format="MM/dd/yyyy hh:mm a"
            id="date-picker-inline"
            label="Date and Time of sighting"
            onChange={e => {
              console.log("date", e.target.value);
              const event = {
                target: {
                  value: new Date(
                    e.target.value === "" ? null : e.target.value
                  ).getTime(),
                  name: "dateSpotted"
                }
              };
              handleOnChange(event);
            }}
          />
        </MuiPickersUtilsProvider>

        <FormControl fullWidth variant="standard" margin="normal" required>
          <InputLabel htmlFor="adultCount">Count of adults</InputLabel>

          <Select id="adultCount">
            {[0, 1, 2, 3, 4, 5, 6, "6+"].map(value => {
              return <MenuItem value={value}>{value}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="standard" margin="normal" required>
          <InputLabel htmlFor="babyCount">Count of juveniles</InputLabel>

          <Select id="babyCount">
            {[0, 1, 2, 3, 4, 5, 6, "6+"].map(value => {
              return <MenuItem value={value}>{value}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <Direction></Direction>

        <div className={classes.imageContainer}>
          <InputImage
            onChange={handleOnChange}
            imageUrl={pin.image}
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
                control={<Switch checked={false} value="false" />}
                label="Vocalizing"
              />
            </FormControl>
            <FormControl fullWidth variant="standard" margin="normal">
              <InputLabel htmlFor="whaleActivity">Activity</InputLabel>

              <Select id="whaleActivity">
                {["", "Feeding", "Hunting", "Breaching"].map(value => {
                  return <MenuItem value={value}>{value}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="standard" margin="normal">
              <InputLabel htmlFor="interactionObserver">
                Interaction with Observers
              </InputLabel>

              <Select id="interactionObserver">
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
              <InputLabel htmlFor="whaleActivity">
                Where was the observer
              </InputLabel>

              <Select id="observerPosition">
                {["", "Land", "Boat", "Air"].map(value => {
                  return <MenuItem value={value}>{value}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="standard" margin="normal">
              <InputLabel htmlFor="interactionObserver">
                Observer Distance
              </InputLabel>

              <Select id="observerDistance">
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
          onChange={handleOnChange}
          name="content"
          value={pin.content}
          margin="normal"
          fullWidth
        ></TextField>

        <div className={classes.done}>
          <Button
            variant="contained"
            color="secondary"
            onClick={e => {
              e.preventDefault();
              handleSaveClick(fileUploadWidget);
            }}
            disabled={isDisabled}
          >
            Save
            <DoneIcon color="white" className={classes.rightIcon} />
          </Button>
        </div>
      </form>
    </Paper>
  );
};
export default Pin;
