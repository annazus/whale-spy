import React, { useContext } from "react";
import { useAuthenticatedClient } from "../../graphql/client";
import { Context } from "../../Context";
import { actionTypes } from "../../actions";
import { MUTATION_CREATE_PIN } from "../../graphql/definitions/mutations";
import Sightings from "./Sightings";
import { uploadToCloudinary } from "../../Utils/UploadToCloudinary";

const SightingContainer = () => {
  const { state, dispatch } = useContext(Context);
  const client = useAuthenticatedClient();

  const newSightingSaveHandler = async () => {
    try {
      dispatch({ type: actionTypes.START_BUSY });
      const pinUrl = await uploadToCloudinary(state.draftPin.image);
      const variables = {
        image: pinUrl,
        title: state.draftPin.title,
        content: state.draftPin.content,
        latitude: state.draftPin.latitude,
        longitude: state.draftPin.longitude,
        dateSpotted: state.draftPin.dateSpotted
      };
      const newSighting = await client.mutate({
        mutation: MUTATION_CREATE_PIN,
        variables
      });
      dispatch({ type: actionTypes.END_BUSY });
    } catch (error) {
      dispatch({ type: actionTypes.END_BUSY });
      console.log("error saving", error);
    }
  };

  const onChange = event => {
    dispatch({
      type: actionTypes.CREATE_DRAFT_PIN,
      payload: {
        draftPin: { ...state.draftPin, [event.target.name]: event.target.value }
      }
    });
  };

  return (
    <Sightings
      sighting={state.draftPin}
      saveHandler={newSightingSaveHandler}
      changeHandler={onChange}
      imageUrl={state.draftPin.image}
    />
  );
};
export default SightingContainer;
