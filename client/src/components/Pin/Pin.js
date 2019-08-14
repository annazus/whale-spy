import React, { createRef, useState, useEffect } from "react";
import FileUpload from "../FileUpload";
import classNames from "./pin.module.css";
import DateTimePicker from "react-datetime-picker";

import {
  SaveIcon,
  DiscardIcon,
  LocationIcon,
  TimeIcon,
  ImageIcon
} from "../ProjectIcons";

const Image = ({ imageUrl }) => (
  <img src={imageUrl} alt="something" className={classNames.Image} />
);

const Pin = ({
  mode,
  pin,
  handleSaveClick,
  handleDiscardClick,
  handleOnChange,
  imageUrl
}) => {
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(!(pin.title && pin.content && pin.dateSpotted && pin.image));
    console.log(isDisabled);
  }, [isDisabled, pin.content, pin.dateSpotted, pin.image, pin.title]);
  const fileUploadWidget = createRef();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSaveClick(fileUploadWidget);
      }}
      className={classNames.PinForm}
    >
      <div className={classNames.Row}>
        <div className={classNames.FileUploadButton}>
          <FileUpload ref={fileUploadWidget} changeHandler={handleOnChange}>
            <ImageIcon />
          </FileUpload>
        </div>
      </div>
      <div className={classNames.Row}>
        {imageUrl ? <Image imageUrl={imageUrl} /> : null}
      </div>

      <div className={classNames.Row}>
        <div className={classNames.ColumnLabel}>
          <LocationIcon />
        </div>
        <span className={classNames.Value}>{`${pin.latitude.toFixed(
          4
        )}, ${pin.longitude.toFixed(4)}`}</span>
      </div>
      <div className={classNames.Row}>
        <div className={classNames.ColumnLabel} />
        <input
          type="text"
          value={pin.title}
          name="title"
          onChange={handleOnChange}
          placeholder="Add title"
          className={classNames.Text}
        />
      </div>
      <div className={classNames.Row}>
        <div className={classNames.ColumnLabel} />
        <textarea
          rows="4"
          name="content"
          placeholder="Add description"
          value={pin.content}
          onChange={handleOnChange}
          className={classNames.TextArea}
        />
      </div>
      <div className={classNames.Row}>
        <div className={classNames.ColumnLabel}>
          <TimeIcon />
        </div>
        <DateTimePicker
          className={classNames.Time}
          value={pin.dateSpotted}
          onChange={date => {
            const e = { target: { name: "dateSpotted", value: date } };
            handleOnChange(e);
          }}
        />
      </div>
      <div className={classNames.Row}>
        <button
          onSubmit={e => {
            e.preventDefault();
            handleSaveClick(fileUploadWidget);
          }}
          className={classNames.SaveButton}
          disabled={isDisabled}
        >
          <SaveIcon style={{ backgroundColor: "#0000ff" }} />
        </button>
        <button onClick={handleDiscardClick}>
          <DiscardIcon />
        </button>
      </div>
    </form>
  );
};
export default Pin;
