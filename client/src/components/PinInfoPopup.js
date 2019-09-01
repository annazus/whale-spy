import React from "react";

import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

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

const PinInfo = ({ pin, showMoreHandler, commentsHandler, closeHandler }) => {
  const classes = useStyles();

  const { title, content, dateSpotted, image } = pin;
  return (
    <Card className={classes.card}>
      <IconButton className={classes.closeIcon} onClick={closeHandler}>
        <CloseIcon></CloseIcon>
      </IconButton>
      <CardMedia
        component="img"
        alt={title}
        image={image}
        height="140"
        title={title}
      ></CardMedia>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography
          variant="subtitle2"
          component="h3"
          gutterBottom
          color="textSecondary"
        >
          {new Date().toLocaleString()}
        </Typography>
        <Typography
          gutterbottom
          variant="body2"
          color="textSecondary"
          component="p"
          noWrap
        >
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="text"
          onClick={e => showMoreHandler(pin)}
          color="primary"
        >
          Show More
        </Button>
        <Button
          size="small"
          variant="text"
          onClick={e => commentsHandler(pin)}
          color="primary"
        >
          Comments
        </Button>
      </CardActions>
    </Card>
  );
};

export { PinInfo as default };
