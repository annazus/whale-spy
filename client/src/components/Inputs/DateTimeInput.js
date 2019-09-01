import React from "react";

import TextField from "@material-ui/core/TextField";
import ClockIcon from "@material-ui/icons/AccessTime";
import InputAdornment from "@material-ui/core/InputAdornment";

const InputDateTime = ({ label, className, onChange, value }) => {
  return (
    <TextField
      label={label}
      fullWidth
      type="datetime-local"
      className={className}
      value={value}
      margin="normal"
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <ClockIcon></ClockIcon>
          </InputAdornment>
        )
      }}
    ></TextField>
  );
};

export default InputDateTime;
