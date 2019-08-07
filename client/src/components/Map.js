import React, { useState, useContext, useEffect } from "react";
import ApolloClient from "apollo-boost";
import ReactMapGL, { GeolocateControl, Marker, Popup } from "react-map-gl";
import { ReactComponent as WhaleIcon } from "../whaleIcon.svg";
import { Context } from "../Context";
import { actionTypes } from "../actions";
import { QUERY_PINS } from "../graphql/definitions/queries";
import { GRAPHQL_SERVER_URL } from "../graphql/client";
import PinInfo from "./PinInfo";
const style = {};
const geoLocateStyle = {
  position: "absolute",
  top: 0,
  left: 0,
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
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 7
  };

  const [viewport, setViewport] = useState(initialViewport);

  useEffect(() => {
    const getData = async () => {
      const client = new ApolloClient({
        uri: GRAPHQL_SERVER_URL
      });
      const pinData = await client.query({ query: QUERY_PINS });
      dispatch({
        type: actionTypes.GET_PINS,
        payload: { pins: pinData.data.pins }
      });
    };
    getData();
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
          latitude: lngLat[1]
        }
      }
    });
    // setIsActiveMarker(true);
    // setActiveMarker({
    //   lng: lngLat[0],
    //   lat: lngLat[1],
    //   title: "New Marker"
    // });
    // console.log(type, target, lngLat);
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
    <ReactMapGL
      {...viewport}
      onViewportChange={viewport => setViewport(viewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
      onClick={clickHandler}
      style={style}
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
    </ReactMapGL>
  );
};

export default Map;
