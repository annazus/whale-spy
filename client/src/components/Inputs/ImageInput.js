import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";

import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import InsertPhoto from "@material-ui/icons/InsertPhoto";

const useStyles = makeStyles(theme => ({
  container: {
    width: "200px",
    height: "200px",
    backgroundColor: "grey",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: "60%",
    height: "60%",

    position: "relative"
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  trashPhoto: {
    position: "absolute",
    left: "50%",
    marginLeft: "-24px"
  },
  inputImage: {
    border: "1px solid red",

    display: "none"
  },
  uploadPhoto: {}
}));
const ImageInput = ({ onChange, imageUrl }) => {
  const classes = useStyles();
  const [showTrashPhotoButton, setShowTrashPhotoButton] = useState(false);
  const [localUrl, setLocalUrl] = useState("");

  const onClickPhoto = () => {
    console.log("onClickPhoto");
    if (!showTrashPhotoButton) setShowTrashPhotoButton(true);
  };
  const deletePhoto = e => {
    setShowTrashPhotoButton(false);
    setLocalUrl("");
    onChange({
      ...e,
      target: { name: "image", value: "" }
    });
  };
  const onChangeInputImage = e => {
    let _url;
    e.preventDefault();
    setShowTrashPhotoButton(false);

    const _file = e.target.files[0];

    if (_file && window.URL) {
      _url = window.URL.createObjectURL(_file);
    }
    setLocalUrl(_url);

    // this.setState({ localUrl: _url });

    if (onChange)
      onChange({
        ...e,
        target: { name: "image", value: _file }
      });
  };

  return (
    <Paper className={classes.container}>
      {localUrl || imageUrl ? (
        <ButtonBase onClick={onClickPhoto} className={classes.image}>
          <img
            src={localUrl ? localUrl : imageUrl}
            alt={localUrl ? localUrl : imageUrl}
            className={classes.img}
          ></img>
          {showTrashPhotoButton ? (
            <IconButton
              color="secondary"
              className={classes.trashPhoto}
              onClick={deletePhoto}
            >
              <DeleteIcon></DeleteIcon>
            </IconButton>
          ) : null}
        </ButtonBase>
      ) : (
        <>
          <input
            accept="image/*"
            id="image-input"
            className={classes.inputImage}
            onChange={onChangeInputImage}
            type="file"
          ></input>
          <label htmlFor="image-input">
            <Fab
              className={classes.uploadPhoto}
              color="primary"
              size="medium"
              component="div"
            >
              <InsertPhoto></InsertPhoto>
            </Fab>
          </label>
        </>
      )}
    </Paper>
  );
};

export { ImageInput as default };
