import React, { useContext, createRef } from "react";
import classNames from "./content.module.css";
import Header from "./Header";
import Map from "./Map";
import { Context } from "../Context";
import PinContent from "./Pin/PinContent";
import UpdatePin from "./Pin/UpdatePin";
import CommentsContainer from "./CommentsContainer";

const Content = () => {
  const { state, dispatch } = useContext(Context);

  return (
    <div className={classNames.Content}>
      <Header />
      <div className={classNames.ContentAppContainer}>
        {state.showComments ? (
          <CommentsContainer />
        ) : state.draftPin && state.isAuth ? (
          <PinContent />
        ) : state.currentPin && state.isAuth ? (
          <UpdatePin />
        ) : null}

        <Map />
      </div>
    </div>
  );
};

export { Content as default };
