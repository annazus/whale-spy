import React, { PureComponent } from "react";

export default class PinInfo extends PureComponent {
  render() {
    const { title, imageUrl } = this.props;

    return (
      <div>
        <div>{title} </div>
        <img width={240} src={imageUrl} />
      </div>
    );
  }
}
