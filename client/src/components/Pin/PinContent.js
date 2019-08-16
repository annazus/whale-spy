import React, { useState, useEffect, useContext } from "react";
import { useAuthenticatedClient } from "../../graphql/client";
import { Context } from "../../Context";
import { actionTypes } from "../../actions";
import { MUTATION_CREATE_PIN } from "../../graphql/definitions/mutations";
import Pin from "./Pin";

const PinContent = () => {
  const { state, dispatch } = useContext(Context);
  const client = useAuthenticatedClient();
  const handlePinSubmit = async fileUploadWidget => {
    const pinUrl = await fileUploadWidget.current.uploadToCloudinary();
    console.log("draftPin",state.draftPin)
    const variables = {
      image: pinUrl,
      title: state.draftPin.title,
      content: state.draftPin.content,
      latitude: state.draftPin.latitude,
      longitude: state.draftPin.longitude,
      dateSpotted: state.draftPin.dateSpotted
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
    console.log(event);
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
      imageUrl={state.draftPin.image}
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
