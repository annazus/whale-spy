import React, { useContext } from "react";
import { useAuthenticatedClient } from "../../graphql/client";
import { Context } from "../../Context";
import { actionTypes } from "../../actions";
import { MUTATON_UPDATE_PIN } from "../../graphql/definitions/mutations";
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
      dateSpotted: state.currentPin.getTime()
    };
    const updatedPin = await client.mutate({
      mutation: MUTATON_UPDATE_PIN,
      variables
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
    <Pin
      pin={state.currentPin}
      handleSaveClick={handlePinSubmit}
      handleDiscardClick={handleDiscard}
      handleOnChange={onChange}
      imageUrl={state.currentPin.image}
    />
  );
};
export default UpdatePin;
