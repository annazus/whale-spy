import React, { useState, useEffect, useContext } from "react";
import { useAuthenticatedClient } from "../../graphql/client";
import { Context } from "../../Context";
import { actionTypes } from "../../actions";
import {
  MUTATON_UPDATE_PIN,
  MUTATION_DELETE_PIN
} from "../../graphql/definitions/mutations";
import Pin from "./Pin";

const UpdatePin = () => {
  const { state, dispatch } = useContext(Context);
  const client = useAuthenticatedClient();
  const handlePinSubmit = async fileUploadWidget => {
    const pinUrl = await fileUploadWidget.current.uploadToCloudinary();
    const variables = {
      pinId: state.currentPin.id,
      title: state.currentPin.title,
      content: state.currentPin.content,
      latitude: state.currentPin.latitude,
      longitude: state.currentPin.longitude,
      image: pinUrl,
      dateSpotted: new Date().getTime()
    };
    const updatedPin = await client.mutate({
      mutation: MUTATON_UPDATE_PIN,
      variables
    });
    dispatch({
      type: actionTypes.SAVE_CURRENT_PIN,
      payload: { pin: updatedPin.data.updatePin }
    });
  };

  const onChange = event => {
    dispatch({
      type: actionTypes.UPDATE_CURRENT_PIN,
      payload: {
        currentPin: {
          ...state.currentPin,
          [event.target.name]: event.target.value
        }
      }
    });
  };

  const handleDiscard = () => {
    dispatch({
      type: actionTypes.DISCARD_CURRENT_PIN_CHANGES
    });
  };

  return (
    <>
      <Pin
        pin={state.currentPin}
        handleSaveClick={handlePinSubmit}
        handleDiscardClick={handleDiscard}
        handleOnChange={onChange}
        imageUrl={state.currentPin.image}
      />
      <button
        onClick={() => {
          dispatch({ type: actionTypes.SHOW_COMMENTS });
        }}
      >
        Show Comments
      </button>
    </>
  );
  // return (
  //   <div style={style}>
  //     <form onSubmit={handlePinSubmit}>
  //       <div style={rowStyle}>
  //         <label>Title</label>
  //         <input
  //           type="text"
  //           value={state.currentPin.title}
  //           name="title"
  //           onChange={onChange}
  //         />
  //       </div>
  //       <div style={rowStyle}>
  //         <label>Content</label>
  //         <textarea
  //           rows="4"
  //           name="content"
  //           value={state.currentPin.content}
  //           onChange={onChange}
  //         />
  //       </div>
  //       <div style={rowStyle}>
  //         <label>Date Spotted</label>
  //         <input
  //           type="text"
  //           name="dateSpotted"
  //           value={state.currentPin.dateSpotted}
  //           onChange={onChange}
  //         />
  //       </div>
  //       <button onSubmit={handlePinSubmit}>Submit</button>
  //       <button onClick={handleDiscard}>Discard</button>
  //     </form>
  //   </div>
  // );
};
export default UpdatePin;
