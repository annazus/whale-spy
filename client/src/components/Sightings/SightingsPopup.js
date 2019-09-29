import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import whaleSpecies from "../../Utils/whaleSpecies";
import { formatToDisplay } from "../../Utils/DateFormatFunctions";
const useStyles = makeStyles(theme => ({
  card: { maxWidth: 240 },
  picture: { height: 140, position: "relative" },
  closeIcon: {
    // position: "absolute",
    // top: theme.spacing(0),
    // right: theme.spacing(0),
    // margin: 0,
    // zIndex: theme.zIndex.mobileStepper,
    // padding: 0
  },
  fullScreenIcon: {
    position: "absolute",
    color: "white",
    bottom: theme.spacing(0),
    right: theme.spacing(0),
    margin: 0,
    padding: 0,
    zIndex: theme.zIndex.mobileStepper
  },
  imageFullScreen: {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    objectFit: "cover",
    zIndex: theme.zIndex.mobileStepper + 4000
  }
}));

const SightingsPopup = ({
  sighting,
  showMoreHandler,
  commentsHandler,
  closeHandler,
  showFullScreenHandler
}) => {
  const classes = useStyles();
  const { dateSpotted } = sighting;

  let imageUrl;
  if (sighting.images.length > 0) {
    imageUrl = sighting.images[0].url;
  }
  const speciesInfo = whaleSpecies.find(({ val }) => val === sighting.species);
  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          disableTypography
          action={
            <IconButton onClick={closeHandler}>
              <CloseIcon></CloseIcon>
            </IconButton>
          }
          title={<Typography variant="h6">{speciesInfo.name}</Typography>}
          subheader={
            <Typography variant="body2">
              {formatToDisplay(dateSpotted)}
            </Typography>
          }
        />

        {imageUrl ? (
          <>
            <CardMedia
              className={classes.picture}
              image={imageUrl}
              title={sighting.species}
            >
              <IconButton
                onClick={showFullScreenHandler}
                className={classes.fullScreenIcon}
              >
                <FullscreenIcon fontSize="small"></FullscreenIcon>
              </IconButton>
            </CardMedia>
          </>
        ) : null}

        <CardContent>
          <div>
            <LocationOnIcon />
            <Typography
              variant="subtitle2"
              component="span"
            >{`${sighting.latitude.toFixed(4)}, ${sighting.longitude.toFixed(
              4
            )}`}</Typography>
          </div>

          {sighting.content ? (
            <Typography variant="body2" gutterBottom color="textPrimary">
              {sighting.content}
            </Typography>
          ) : null}
        </CardContent>
        {
          <CardActions>
            <Button
              size="small"
              variant="text"
              to={`/sighting/${sighting.id}`}
              // onClick={e => showMoreHandler(sighting)}
              color="primary"
              component={RouterLink}
            >
              Show More
            </Button>
          </CardActions>

          //     <Button
          //       size="small"
          //       variant="text"
          //       onClick={e => commentsHandler(sighting)}
          //       color="primary"
          //     >
          //       Comments
          //     </Button>
        }
      </Card>
    </>
  );
};

export { SightingsPopup as default };
