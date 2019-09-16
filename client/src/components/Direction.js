import React from "react";
import { makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Divider from "@material-ui/core/Divider";
const useStyles = makeStyles(theme => ({
  container: {
    position: "relative",
    height: "100px",
    width: "200px"
  },
  north: {
    position: "absolute",
    left: "50%",
    marginLeft: "-40px",
    width: "80px",
    align: "center"
  },
  south: {
    position: "absolute",
    left: "50%",
    width: "80px",
    bottom: "0px",
    marginLeft: "-40px"
  },
  northEast: {
    position: "absolute",
    top: "15%",
    left: "60%"
  },
  east: {
    position: "absolute",
    top: "50%",
    height: "20px",
    marginTop: "-10px",
    right: "0"
  },
  southEast: {
    position: "absolute",
    top: "50%",
    left: "60%"
  },
  southWest: {
    position: "absolute",
    top: "50%",
    left: "20%"
  },
  northWest: {
    position: "absolute",
    top: "15%",
    left: "20%"
  },
  west: {
    position: "absolute",
    top: "50%",
    height: "20px",
    marginTop: "-10px",
    left: 0
  },
  unknown: {
    position: "relative"
  }
}));
const Direction = ({ id, name, value, onChange }) => {
  const classes = useStyles();
  return (
    <FormControl
      component="fieldset"
      fullWidth
      variant="standard"
      margin="normal"
      required
    >
      <FormLabel component="legend">Direction whale was swimming</FormLabel>
      <RadioGroup id={id} name={name} value={value} onChange={onChange}>
        <div className={classes.container}>
          <FormControlLabel
            value="N"
            control={<Radio />}
            label="N"
            className={classes.north}
          ></FormControlLabel>
          <FormControlLabel
            value="E"
            control={<Radio />}
            label="E"
            className={classes.east}
          ></FormControlLabel>
          <FormControlLabel
            value="S"
            control={<Radio />}
            label="S"
            className={classes.south}
          ></FormControlLabel>
          <FormControlLabel
            value="W"
            control={<Radio />}
            label="W"
            className={classes.west}
          ></FormControlLabel>
        </div>

        <FormControlLabel
          value="U"
          control={<Radio />}
          label="UNKNOWN"
          className={classes.unknown}
        ></FormControlLabel>
        <Divider></Divider>
      </RadioGroup>
    </FormControl>
  );
};

export { Direction as default };
