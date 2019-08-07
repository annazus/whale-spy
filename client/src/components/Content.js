import React, { useContext } from "react";
import Header from "./Header";
import Map from "./Map";
import { Context } from "../Context";
import PinContent from "./PinContent";
import UpdatePin from "./UpdatePin";
import CommentsContainer from "./CommentsContainer";
const style = {
  display: "flex",
  flexDirection: "column"
};
const contentStyle = {
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  top: "81px",
  left: "0px",
  width: "100%"
};
const mapStyle = {
  width: "100%"
};
const pinContentStyle = {
  width: "100%"
};
const Content = () => {
  const { state, dispatch } = useContext(Context);

  return (
    <div style={style}>
      <Header />
      <div style={contentStyle}>
        {state.showComments ? (
          <CommentsContainer />
        ) : (
          <div style={pinContentStyle}>
            {state.draftPin && state.isAuth ? <PinContent /> : null}
            {state.currentPin && state.isAuth ? <UpdatePin /> : null}
          </div>
        )}
        <div style={mapStyle}>
          <Map />
        </div>
      </div>
    </div>
  );
};

export { Content as default };
