import React, { useState, useContext, useEffect } from "react";
import ApolloClient from "apollo-boost";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  Popup,
  FullscreenControl,
  NavigationControl
} from "react-map-gl";
import { ReactComponent as WhaleIcon } from "../whaleIcon.svg";
import { Context } from "../Context";
import { actionTypes } from "../actions";
import { QUERY_PINS } from "../graphql/definitions/queries";
import {
  PIN_ADDED_SUBSCRIPTION,
  PIN_DELETED_SUBSCRIPTION,
  PIN_UPDATED_SUBSCRIPTION
} from "../graphql/definitions/subscription";

import { GRAPHQL_SERVER_URL, getClient } from "../graphql/client";
import { Subscription, useSubscription } from "react-apollo";
import PinInfo from "./PinInfo";
const style = {};
const fullscreenControlStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};
const navStyle = {
  position: "absolute",
  top: 36,
  left: 0,
  padding: "10px"
};

const geoLocateStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  margin: 10
};

const whaleIconStyle = {
  width: "20px",
  height: "20px"
};
const Map = () => {
  const { state, dispatch } = useContext(Context);

  const initialViewport = {
    width: "100%",
    height: 600,
    latitude: 47.7237,
    longitude: -122.4713,
    zoom: 12
  };

  const [viewport, setViewport] = useState(initialViewport);

  useEffect(() => {
    const getData = async () => {
      const client = getClient();
      const pinData = await client.query({ query: QUERY_PINS });
      dispatch({
        type: actionTypes.GET_PINS,
        payload: { pins: pinData.data.pins }
      });

      navigator.geolocation.getCurrentPosition(
        pos => {
          setViewport({
            ...initialViewport,
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude
          });
        },
        error => {
          console.log(error);
        }
      );
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const clickHandler = ({ lngLat, type, target }) => {
    console.log(target);
    console.log(target.nodeName);
    if (!state.isAuth) return;
    if (target.nodeName === "BUTTON") return;
    dispatch({
      type: actionTypes.CREATE_DRAFT_PIN,
      payload: {
        draftPin: {
          ...state.draftPin,
          longitude: lngLat[0],
          latitude: lngLat[1],
          dateSpotted: new Date()
        }
      }
    });
  };

  const renderPopup = () => {
    return (
      <Popup
        tipSize={5}
        anchor="top"
        longitude={state.currentPin.longitude}
        latitude={state.currentPin.latitude}
        closeOnClick={false}
        onClose={() => dispatch({ type: actionTypes.UNSELECT_CURRENT_PIN })}
      >
        <PinInfo
          title={state.currentPin.title}
          imageUrl={state.currentPin.imageUrl}
        />
      </Popup>
    );
  };

  const onDragEndHandler = ({ lngLat }) => {
    if (state.draftPin) {
      dispatch({
        type: actionTypes.CREATE_DRAFT_PIN,
        payload: {
          draftPin: {
            ...state.draftPin,
            longitude: lngLat[0],
            latitude: lngLat[1]
          }
        }
      });
    }
  };
  const markerRender = ({
    pin,
    longitude,
    latitude,
    title,
    content,
    draggable
  }) => {
    // if (!activeMarker) return;
    // const { lng, lat, title } = activeMarker;
    return (
      <Marker
        latitude={latitude}
        longitude={longitude}
        offsetLeft={-20}
        offsetTop={-10}
        draggable={draggable}
        onDragEnd={onDragEndHandler}
      >
        <div
          onClick={() => {
            pin &&
              dispatch({
                type: actionTypes.SET_CURRENT_PIN,
                payload: { currentPin: pin }
              });
          }}
        >
          <WhaleIcon style={whaleIconStyle} />
        </div>
      </Marker>
    );
  };
  return (
    <>
      <ReactMapGL
        {...viewport}
        style={{ width: "100%" }}
        onViewportChange={viewport => setViewport(viewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
        onClick={clickHandler}
        mapStyle={process.env.REACT_APP_MAP_LAYER}
      >
        {state.currentPin ? renderPopup() : null}
        <GeolocateControl
          style={geoLocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        {state.draftPin
          ? markerRender({ ...state.draftPin, draggable: true })
          : null}
        {state.pins.map(pin => markerRender({ pin, ...pin, draggable: false }))}
        <div style={fullscreenControlStyle}>
          <FullscreenControl />
          <div className="nav" style={navStyle}>
            <NavigationControl />
          </div>
        </div>
      </ReactMapGL>
      {/* Subscriptions for Creating / Updating / Deleting Pins */}
      <Subscription
        subscription={PIN_ADDED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          const { pinAdded } = subscriptionData.data;
          dispatch({
            type: actionTypes.ON_PIN_ADDED,
            payload: { pin: pinAdded }
          });
        }}
      />
      <Subscription
        subscription={PIN_UPDATED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          const { pinUpdated } = subscriptionData.data;
          dispatch({
            type: actionTypes.ON_PIN_UPDATED,
            payload: { pin: pinUpdated }
          });
        }}
      />
      <Subscription
        subscription={PIN_DELETED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          const { pinDeleted } = subscriptionData.data;
          dispatch({
            type: actionTypes.ON_PIN_DELETED,
            payload: { pinId: pinDeleted.id }
          });
        }}
      />
    </>
  );
};

export default Map;
