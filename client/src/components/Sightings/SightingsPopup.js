import React from "react";

import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/Info";

import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import whaleSpecies from "../../Utils/whaleSpecies";
const useStyles = makeStyles(theme => ({
  card: { maxWidth: 240, position: "relative" },
  closeIcon: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    margin: 0,
    padding: 0
  }
}));

const SightingsPopup = ({
  sighting,
  showMoreHandler,
  commentsHandler,
  closeHandler
}) => {
  const classes = useStyles();

  const {
    latitude,
    longitude,
    dateSpotted,
    species,
    images,
    updatedAt
  } = sighting;
  console.log(sighting);

  let imageUrl;
  if (sighting.images.length > 0) {
    imageUrl = sighting.images[0].url;
  }
  const speciesInfo = whaleSpecies.find(({ val }) => val === sighting.species);
  return (
    <Card className={classes.card}>
      <IconButton className={classes.closeIcon} onClick={closeHandler}>
        <CloseIcon></CloseIcon>
      </IconButton>
      {imageUrl ? (
        <CardMedia
          component="img"
          alt={sighting.species}
          image={imageUrl}
          height="140"
          title={sighting.species}
        ></CardMedia>
      ) : null}
      <CardContent>
        <Grid container justifyContent="center" alignItems="center">
          <Typography variant="h6" component="h2">
            {speciesInfo.name}
          </Typography>
          <Link href={speciesInfo.helpUrl} target="_blank">
            <InfoIcon></InfoIcon>
          </Link>
        </Grid>

        <div>
          <LocationOnIcon />
          <Typography
            variant="subtitle1"
            component="span"
          >{`${sighting.latitude.toFixed(4)}, ${sighting.longitude.toFixed(
            4
          )}`}</Typography>
        </div>
        <Typography variant="subtitle2" gutterBottom color="textSecondary">
          Spotted @ {new Date(dateSpotted).toLocaleString()}
        </Typography>
      </CardContent>
      {
        //   <CardActions>
        //     <Button
        //       size="small"
        //       variant="text"
        //       onClick={e => showMoreHandler(sighting)}
        //       color="primary"
        //     >
        //       Show More
        //     </Button>
        //     <Button
        //       size="small"
        //       variant="text"
        //       onClick={e => commentsHandler(sighting)}
        //       color="primary"
        //     >
        //       Comments
        //     </Button>
        //   </CardActions>
      }
    </Card>
  );
};

export { SightingsPopup as default };
