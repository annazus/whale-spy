import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Context } from "../../Context";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FullscreenIcon from "@material-ui/icons/Fullscreen";

import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import whaleCartoon from "./noun_Whale_126683.svg";
import Typography from "@material-ui/core/Typography";
import mmTypes from "../../Utils/whaleSpecies";
import { formatToDisplay } from "../../Utils/DateFormatFunctions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { actionTypes } from "../../actions";
const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    overflow: "scroll",
    height: window.innerHeight - 52
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
  displayField: {
    position: "relative"
  },
  label: {
    color: theme.palette.secondaryText,
    position: "absolute",
    fontSize: ".8em"
  },
  text: {
    position: "relative",
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    color: theme.palette.primaryText
  },
  media: {
    position: "relative",
    height: 0,
    paddingTop: "56.25%", // 16:9,
    marginBottom: theme.spacing(2)
  },
  avatar: {
    backgroundColor: red[500]
  },
  fullScreenIcon: {
    position: "absolute",
    color: "white",
    bottom: theme.spacing(0),
    right: theme.spacing(0),
    margin: 0,
    padding: 0,
    zIndex: theme.zIndex.mobileStepper
  }
}));

const DisplayField = ({ label, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.displayField}>
      <span className={classes.label}>{label}</span>
      <div className={classes.text}>{children}</div>
    </div>
  );
};

const ViewSighting = ({ match, history, showFullScreenHandler }) => {
  const { state, dispatch } = useContext(Context);
  const [sighting, setSighting] = useState(null);
  useEffect(() => {
    const sightingId = match.params.id;
    const sighting = state.appData.sightings.find(
      element => element.id === sightingId
    );
    setSighting(sighting);
  }, [match.params.id, state.appData.sightings]);
  const classes = useStyles();
  console.log(sighting);
  if (!sighting) return null;
  return (
    <Card className={classes.container}>
      <CardContent>
        <CardHeader
          avatar={
            <Avatar
              className={classes.avatar}
              alt={sighting.author.name}
              src={sighting.author.picture}
            ></Avatar>
          }
          action={
            <IconButton
              className={classes.closeIcon}
              onClick={() => history.goBack()}
            >
              <CloseIcon></CloseIcon>
            </IconButton>
          }
          title={mmTypes.find(elem => elem.val === sighting.species).name}
          subheader={formatToDisplay(sighting.dateSpotted)}
        />
        <CardMedia
          className={classes.media}
          image={
            sighting.images.length > 0 ? sighting.images[0].url : whaleCartoon
          }
          title={sighting.species}
        >
          {sighting.images.length > 0 ? (
            <IconButton
              className={classes.fullScreenIcon}
              onClick={() => {
                let imageUrl;
                if (sighting.images.length > 0) {
                  imageUrl = sighting.images[0].url;
                } else return;
                dispatch({
                  type: actionTypes.TOGGLE_FULLSCREEN_PHOTO,
                  payload: imageUrl
                });
              }}
            >
              <FullscreenIcon></FullscreenIcon>
            </IconButton>
          ) : null}
        </CardMedia>
        <DisplayField label="Location">
          <Typography variant="body1" gutterBottom>
            <LocationOnIcon />
            {`${sighting.latitude.toFixed(4)}, ${sighting.longitude.toFixed(
              4
            )}`}
          </Typography>
        </DisplayField>
        <DisplayField label="Notes">
          <Typography variant="body1" gutterBottom>
            {sighting.content ? sighting.content : "Not provided"}
          </Typography>
        </DisplayField>
        {sighting.species === "ORCA" ? (
          <DisplayField label="Pod">
            <Typography variant="body1" gutterBottom>
              {sighting.pod ? sighting.pod : "Not provided"}
            </Typography>
          </DisplayField>
        ) : null}

        <DisplayField label="# of Adults ">
          <Typography variant="body1" gutterBottom>
            {sighting.countAdult ? sighting.countAdult : "Not provided"}
          </Typography>
        </DisplayField>
        <DisplayField label="# of Juveniles ">
          <Typography variant="body1" gutterBottom>
            {sighting.countYoung ? sighting.countYoung : "Not provided"}
          </Typography>
        </DisplayField>
        <DisplayField label="Direction Swimming">
          <Typography variant="body1" gutterBottom>
            {sighting.direction ? sighting.direction : "Not provided"}
          </Typography>
        </DisplayField>
        <DisplayField label="Vocalizing">
          <Typography variant="body1" gutterBottom>
            {sighting.vocalizing ? "Yes" : "No"}
          </Typography>
        </DisplayField>
        <DisplayField label="Whale Activity">
          <Typography variant="body1" gutterBottom>
            {sighting.activity ? sighting.activity : "Not provided"}
          </Typography>
        </DisplayField>
        <DisplayField label="Interaction with Observers">
          <Typography variant="body1" gutterBottom>
            {sighting.observerInteraction
              ? sighting.observerInteraction
              : "Not provided"}
          </Typography>
        </DisplayField>

        <DisplayField label="Observer Location">
          <Typography variant="body1" gutterBottom>
            {sighting.observerLocation
              ? sighting.observerLocation
              : "Not provided"}
          </Typography>
        </DisplayField>
        <DisplayField label="Observer Distance">
          <Typography variant="body1" gutterBottom>
            {sighting.observerDistance
              ? sighting.observerDistance
              : "Not provided"}
          </Typography>
        </DisplayField>
      </CardContent>
    </Card>
  );
};
export default ViewSighting;
