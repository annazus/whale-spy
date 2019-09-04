import React, { createRef, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";

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

  console.log("dateSpotted", pin.dateSpotted, pin.dateSpotted.toLocaleString());
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
        <div className={classes.imageContainer}>
          <InputImage
            onChange={handleOnChange}
            imageUrl={pin.image}
          ></InputImage>
        </div>

        <div>
          <LocationOnIcon />
          <Typography
            variant="subtitle1"
            component="span"
          >{`${pin.latitude.toFixed(4)}, ${pin.longitude.toFixed(
            4
          )}`}</Typography>
        </div>
        <TextField
          value={pin.title}
          name="title"
          onChange={handleOnChange}
          placeholder="Add title"
          variant="standard"
          margin="normal"
          fullWidth
        ></TextField>
        <TextField
          placeholder="Add description"
          multiline
          variant="standard"
          onChange={handleOnChange}
          name="content"
          value={pin.content}
          margin="normal"
          fullWidth
        ></TextField>
        <DateTimeInput
          label="Date Spotted"
          name="dateSpotted"
          value={formatToDisplay(pin.dateSpotted)}
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
        ></DateTimeInput>

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
            Done
            <DoneIcon color="white" className={classes.rightIcon} />
          </Button>
        </div>
      </form>
    </Paper>
  );
};
export default Pin;
