import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from "@material-ui/pickers";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
const DateFilter = ({
  title,
  fromDate,
  toDate,
  handleFromDateChange,
  handleToDateChange
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div>
        <ExpansionPanel defaultExpanded square>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}>
            <Typography>{title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item md={12} lg={6}>
                <KeyboardDateTimePicker
                  clearable
                  fullWidth
                  maxDate={toDate}
                  label="From Date"
                  value={fromDate}
                  onChange={handleFromDateChange}
                ></KeyboardDateTimePicker>
              </Grid>
              <Grid item md={12} lg={6}>
                <KeyboardDateTimePicker
                  clearable
                  fullWidth
                  value={toDate}
                  minDate={fromDate}
                  label="To Date"
                  onChange={handleToDateChange}
                ></KeyboardDateTimePicker>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default DateFilter;
