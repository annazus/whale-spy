import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import Filter from "./Filter";
import DateFilter from "./DateFilter";
import { Context } from "../../Context";
import { actionTypes } from "../../actions";
import whaleSpecies from "../../Utils/whaleSpecies";
const styles = theme => {
  return {
    container: { position: "static" },
    closeButton: {
      position: "absolute",
      top: theme.spacing(1),
      right: theme.spacing(1)
    },
    title: {
      margin: theme.spacing(2)
    }
  };
};

const useStyles = makeStyles(styles);
const FilterWindow = ({ isOpen, handleClose }) => {
  const { state, dispatch } = useContext(Context);
  const classes = useStyles();
  const mmTypes = [{ name: "All", val: "ALL" }].concat(whaleSpecies);

  const onChangeSpeciesHandler = event => {
    let marineMammalTypes;

    if (event.target.value === "ALL") {
      if (event.target.checked)
        marineMammalTypes = mmTypes.map(({ name, val }) => val);
      else marineMammalTypes = [];
    } else {
      if (event.target.checked)
        marineMammalTypes = state.filterCriteria.speciesList.concat([
          event.target.value
        ]);
      else
        marineMammalTypes = state.filterCriteria.speciesList.filter(
          item => item !== event.target.value
        );
    }

    dispatch({
      type: actionTypes.FILTER_MARINE_MAMMAL_TYPE,
      payload: { marineMammalTypes }
    });
  };

  const handleReset = () => {
    dispatch({
      type: actionTypes.FILTER_DATE,
      payload: { fromDate: new Date("1/1/1969"), toDate: new Date("1/1/2050") }
    });
    dispatch({
      type: actionTypes.FILTER_MARINE_MAMMAL_TYPE,
      payload: { marineMammalTypes: mmTypes.map(({ name, val }) => val) }
    });
  };

  const handleFromDateChange = date => {
    console.log(date);
    dispatch({
      type: actionTypes.FILTER_DATE,
      payload: { fromDate: new Date(date), toDate: state.toDate }
    });
  };

  const handleToDateChange = date => {
    console.log(date);
    dispatch({
      type: actionTypes.FILTER_DATE,
      payload: { fromDate: state.fromDate, toDate: new Date(date) }
    });
  };
  return (
    <div className={classes.container}>
      <Drawer
        anchor="left"
        onClose={() => dispatch({ type: actionTypes.FILTER_CLOSE })}
        open={state.filterOpen}
      >
        <IconButton
          className={classes.closeButton}
          onClick={() => dispatch({ type: actionTypes.FILTER_CLOSE })}
        >
          <CloseIcon></CloseIcon>
        </IconButton>

        <Grid
          container
          className={classes.title}
          flexDirection="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={6}>
            <Typography variant="h6">Filter</Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              size="medium"
              color="primary"
              className={classes.resetToDefault}
              onClick={handleReset}
              variant="outlined"
            >
              Reset
            </Button>
          </Grid>
        </Grid>

        <DateFilter
          title="Date Window"
          fromDate={state.fromDate}
          toDate={state.toDate}
          handleFromDateChange={handleFromDateChange}
          handleToDateChange={handleToDateChange}
        ></DateFilter>

        <Filter
          title="Whale Species"
          selectedValues={
            state.filterCriteria.speciesList.length === whaleSpecies.length
              ? state.filterCriteria.speciesList.concat(["ALL"])
              : state.filterCriteria.speciesList
          }
          list={mmTypes}
          onChangeHandler={onChangeSpeciesHandler}
        ></Filter>
      </Drawer>
    </div>
  );
};

export { FilterWindow as default };
