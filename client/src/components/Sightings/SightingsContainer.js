import React, { useContext, useEffect, useState } from "react";
import { useAuthenticatedClient, getClient } from "../../graphql/client";
import { Context } from "../../Context";
import { actionTypes } from "../../actions";
import { MUTATION_CREATE_SIGHTING } from "../../graphql/definitions/mutations";
import Sightings from "./Sightings";
import { uploadToCloudinary } from "../../Utils/UploadToCloudinary";

const SightingContainer = ({ history }) => {
  const { state, dispatch } = useContext(Context);
  const [draftPin, setDraftPin] = useState(null);
  useEffect(() => {
    setDraftPin({
      latitude: state.map.viewport.latitude,
      longitude: state.map.viewport.longitude,
      dateSpotted: new Date().getTime()
    });
  }, [state.map.viewport.latitude, state.map.viewport.longitude]);
  const client = useAuthenticatedClient();
  const clickHandler = ({ lngLat, type, target }) => {
    if (target.nodeName === "BUTTON" || target.nodeName === "svg") return;

    setDraftPin({
      ...draftPin,
      latitude: lngLat[1],
      longitude: lngLat[0]
    });
  };
  const onDragEndHandler = ({ lngLat }) => {
    console.log(lngLat);
    setDraftPin({
      ...draftPin,
      latitude: lngLat[1],
      longitude: lngLat[0]
    });
  };
  const newSightingSaveHandler = async () => {
    try {
      dispatch({ type: actionTypes.START_BUSY });

      let imageUrl;

      if (draftPin.image) imageUrl = await uploadToCloudinary(draftPin.image);

      const variables = {
        latitude: draftPin.latitude,
        longitude: draftPin.longitude,
        countYoung: draftPin.countYoung ? draftPin.countYoung : null,
        countAdults: draftPin.countAdults ? draftPin.countAdults : null,
        species: draftPin.species,
        content: draftPin.content ? draftPin.content : null,
        dateSpotted: draftPin.dateSpotted,
        direction: draftPin.direction ? draftPin.direction : null,
        vocalizing: draftPin.vocalizing ? draftPin.vocalizing : null,
        activity: draftPin.activity ? draftPin.activity : null,
        interactionWithObservers: draftPin.interactionWithObservers
          ? draftPin.interactionWithObservers
          : null,
        observerDistance: draftPin.observerDistance
          ? draftPin.observerDistance
          : null,
        observerLocation: draftPin.observerLocation
          ? draftPin.observerLocation
          : null,
        imageUrl
      };
      const { id_token } = window.gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getAuthResponse();
      const client = getClient(id_token);
      const newSighting = await client.mutate({
        mutation: MUTATION_CREATE_SIGHTING,
        variables
      });
      dispatch({ type: actionTypes.DRAFT_SAVED_SUCCESSFULLY });
      dispatch({ type: actionTypes.END_BUSY });
      history.goBack();
    } catch (error) {
      dispatch({ type: actionTypes.END_BUSY });
      console.log("error saving", error);
    }
  };

  const onChange = event => {
    setDraftPin({ ...draftPin, [event.target.name]: event.target.value });
  };
  if (!draftPin) return null;
  return (
    <Sightings
      history={history}
      onDragEndHandler={onDragEndHandler}
      clickHandler={clickHandler}
      sighting={draftPin}
      saveHandler={newSightingSaveHandler}
      changeHandler={onChange}
      imageUrl={draftPin.image}
    />
  );
};
export default SightingContainer;
