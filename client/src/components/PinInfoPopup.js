import React, { PureComponent } from "react";
import classNames from "./pinInfoPopup.module.css";
export default class PinInfo extends PureComponent {
  render() {
    const { pin,clickHandler } = this.props;
    const { id, title, dateSpotted, image, latitude, longitude } = pin;
    return (
      <div className={classNames.pinInfo}>
        <img
          width={240}
          src={image}
          alt="whale"
          className={classNames.thumbNail}
        />
        <div className={classNames.pinInfoData}>
          <p className={classNames.label}> {title} </p>
          <p className={classNames.label}>Date & Time:</p>
          <p className={classNames.value}>
            {new Date(dateSpotted).toLocaleString()}
          </p>
          <p className={classNames.label}>Location:</p>
          <p className={classNames.value}>{`${latitude.toFixed(
            4
          )}, ${longitude.toFixed(4)}`}</p>
        </div>
        <button className={classNames.showDetail} href="./" onClick = {(e)=>clickHandler(pin)}>
          >
        </button>
      </div>
    );
  }
}
