import React from "react";

const style = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column"
};
const rowStyle = {
  display: "flex",
  flexDirection: "row"
};
const Pin = ({
  mode,
  pin,
  handleSaveClick,
  handleDiscardClick,
  handleOnChange
}) => {
  return (
    <div style={style}>
      <form onSubmit={handleSaveClick}>
        <div style={rowStyle}>
          <label>Title</label>
          <input
            type="text"
            value={pin.title}
            name="title"
            onChange={handleOnChange}
          />
        </div>

        <div style={rowStyle}>
          <label>Content</label>
          <textarea
            rows="4"
            name="content"
            value={pin.content}
            onChange={handleOnChange}
          />
        </div>
        <div style={rowStyle}>
          <label>Date Spotted</label>
          <input
            type="text"
            name="dateSpotted"
            value={pin.dateSpotted}
            onChange={handleOnChange}
          />
        </div>
        <button onSubmit={handleSaveClick}>Submit</button>
        <button onClick={handleDiscardClick}>Discard</button>
      </form>
    </div>
  );
};
export default Pin;
