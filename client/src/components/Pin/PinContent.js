import React, { useState, useEffect, useContext } from "react";
import { useAuthenticatedClient } from "../../graphql/client";
import { Context } from "../../Context";
import { actionTypes } from "../../actions";
import { MUTATION_CREATE_PIN } from "../../graphql/definitions/mutations";
import Pin from "./Pin";
import { uploadToCloudinary } from "../../Utils/UploadToCloudinary";
const PinContent = () => {
  const { state, dispatch } = useContext(Context);
  const client = useAuthenticatedClient();

  const handlePinSubmit = async () => {
    try {
      const pinUrl = await uploadToCloudinary(state.draftPin.image);
      console.log("draftPin", state.draftPin);
      const variables = {
        image: pinUrl,
        title: state.draftPin.title,
        content: state.draftPin.content,
        latitude: state.draftPin.latitude,
        longitude: state.draftPin.longitude,
        dateSpotted: state.draftPin.dateSpotted
      };
      console.log(variables);
      const newPin = await client.mutate({
        mutation: MUTATION_CREATE_PIN,
        variables
      });
      // dispatch({
      //   type: actionTypes.SAVE_DRAFT_AS_PIN,
      //   payload: {
      //     pin: {
      //       ...newPin.data.createPin,
      //       dateSpotted: new Date(newPin.data.createPin.dateSpotted)
      //     }
      //   }
      // });
      console.log(newPin);
    } catch (error) {
      console.log("error saving", error);
    }
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
};
export default PinContent;
