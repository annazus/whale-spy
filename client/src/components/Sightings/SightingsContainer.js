import React, { useContext } from "react";
import { useAuthenticatedClient, getClient } from "../../graphql/client";
import { Context } from "../../Context";
import { actionTypes } from "../../actions";
import {
  MUTATION_CREATE_SIGHTING,
  MUTATION_CREATE_COMMENT
} from "../../graphql/definitions/mutations";
import { QUERY_ME } from "../../graphql/definitions/queries";
import Sightings from "./Sightings";
import { uploadToCloudinary } from "../../Utils/UploadToCloudinary";

const SightingContainer = () => {
  const { state, dispatch } = useContext(Context);
  const client = useAuthenticatedClient();

  const newSightingSaveHandler = async () => {
    try {
      dispatch({ type: actionTypes.START_BUSY });

      let imageUrl;

      if (state.draftPin.image)
        imageUrl = await uploadToCloudinary(state.draftPin.image);

      const variables = {
        latitude: state.draftPin.latitude,
        longitude: state.draftPin.longitude,
        countYoung: state.draftPin.countYoung
          ? state.draftPin.countYoung
          : null,
        countAdults: state.draftPin.countAdults
          ? state.draftPin.countAdults
          : null,
        species: state.draftPin.species,
        content: state.draftPin.content ? state.draftPin.content : null,
        dateSpotted: state.draftPin.dateSpotted,
        direction: state.draftPin.direction ? state.draftPin.direction : null,
        vocalizing: state.draftPin.vocalizing
          ? state.draftPin.vocalizing
          : null,
        activity: state.draftPin.activity ? state.draftPin.activity : null,
        observerInteraction: state.draftPin.observerInteraction
          ? state.draftPin.observerInteraction
          : null,
        observerDistance: state.draftPin.observerDistance
          ? state.draftPin.observerDistance
          : null,
        observerLocation: state.draftPin.observerLocation
          ? state.draftPin.observerLocation
          : null,
        imageUrl
      };
      console.log(variables);
      const { id_token } = window.gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getAuthResponse();
      console.log("idtoken", id_token);
      const client = getClient(id_token);
      const newSighting = await client.mutate({
        mutation: MUTATION_CREATE_SIGHTING,
        variables
      });
      console.log(newSighting);
      dispatch({ type: actionTypes.DRAFT_SAVED_SUCCESSFULLY });
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
