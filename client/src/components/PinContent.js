import React, { useState, useEffect, useContext } from "react";
import { useAuthenticatedClient } from "../graphql/client";
import { Context } from "../Context";
import { actionTypes } from "../actions";
import { MUTATION_CREATE_PIN } from "../graphql/definitions/mutations";
import Pin from "./Pin";
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
const PinContent = () => {
  const { state, dispatch } = useContext(Context);
  const client = useAuthenticatedClient();
  const handlePinSubmit = async event => {
    event.preventDefault();
    const variables = {
      title: state.draftPin.title,
      content: state.draftPin.content,
      latitude: state.draftPin.latitude,
      longitude: state.draftPin.longitude,
      dateSpotted: new Date().getTime()
    };
    const newPin = await client.mutate({
      mutation: MUTATION_CREATE_PIN,
      variables
    });
    dispatch({
      type: actionTypes.SAVE_DRAFT_AS_PIN,
      payload: { pin: newPin.data.createPin }
    });
    console.log(newPin);
  };

  const onChange = event => {
    dispatch({
      type: actionTypes.CREATE_DRAFT_PIN,
      payload: {
        draftPin: { ...state.draftPin, [event.target.name]: event.target.value }
      }
    });
  };

  const handleDiscard = () => {
    dispatch({
      type: actionTypes.DISCARD_DRAFT
    });
  };

  return (
    <Pin
      pin={state.draftPin}
      handleSaveClick={handlePinSubmit}
      handleDiscardClick={handleDiscard}
      handleOnChange={onChange}
    />
  );
  // return (
  //   <div style={style}>
  //     <form onSubmit={handlePinSubmit}>
  //       <div style={rowStyle}>
  //         <label>Title</label>
  //         <input
  //           type="text"
  //           value={state.draftPin.title}
  //           name="title"
  //           onChange={onChange}
  //         />
  //       </div>
  //       <div style={rowStyle}>
  //         <label>Content</label>
  //         <textarea
  //           rows="4"
  //           name="content"
  //           value={state.draftPin.content}
  //           onChange={onChange}
  //         />
  //       </div>
  //       <div style={rowStyle}>
  //         <label>Date Spotted</label>
  //         <input
  //           type="text"
  //           name="dateSpotted"
  //           value={state.draftPin.dateSpotted}
  //           onChange={onChange}
  //         />
  //       </div>
  //       <button onSubmit={handlePinSubmit}>Submit</button>
  //       <button onClick={handleDiscard}>Discard</button>
  //     </form>
  //   </div>
  // );
};
export default PinContent;
