import React, { useState, useContext, useEffect } from "react";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  Popup,
  NavigationControl
} from "react-map-gl";
import { makeStyles } from "@material-ui/core";

import { ReactComponent as WhaleIcon } from "./whaleIcon.svg";
import { ReactComponent as DraftWhaleIcon } from "./draftWhaleIcon.svg";
import { Context } from "../../Context";
import { actionTypes } from "../../actions";
import { QUERY_PINS } from "../../graphql/definitions/queries";
import {
  PIN_ADDED_SUBSCRIPTION,
  PIN_DELETED_SUBSCRIPTION,
  PIN_UPDATED_SUBSCRIPTION
} from "../../graphql/definitions/subscription";
import { getClient } from "../../graphql/client";
import { Subscription } from "react-apollo";
import PinInfoPopup from "../PinInfoPopup";

const useStyles = makeStyles(t => ({
  root: {},
  newPin: { position: "absolute", right: t.spacing(3), bottom: t.spacing(3) },

  navStyle: {
    margin: t.spacing(1),

    position: "absolute",
    top: 0,
    left: 0
  },

  geoLocateStyle: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: t.spacing(1)
  },

  whaleIconStyle: {
    width: "20px",
    height: "20px",
    color: "red",
    zIndex: "0"
  }
}));

const Map = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPin, setPopupPin] = useState(null);
  // const initialViewport = {
  //   height: window.innerHeight - 48,
  //   width: "100%",
  //   latitude: 47.7237,
  //   longitude: -122.4713,
  //   zoom: 12
  // };
  // const [viewport, setViewport] = useState(initialViewport);

  const { state, dispatch } = useContext(Context);
  const classes = useStyles();

  useEffect(() => {
    window.addEventListener("resize", resizeMap);

    return resizeRemover;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const resizeMap = () => {
    console.log("resizing window");
    dispatch({
      type: actionTypes.UPDATE_VIEWPORT,
      payload: {
        viewport: {
          ...state.map.viewport,
          width: "100%",
          height: state.appState.isNewSighting ? 300 : window.innerHeight - 48
        }
      }
    });
  };
  const resizeRemover = () => {
    window.removeEventListener("resize", resizeMap);
  };
  // useEffect(() => {
  //   if (state.draftPin)
  //     setViewport({ ...viewport, height: window.innerHeight / 2 });
  //   else setViewport({ ...viewport, height: window.innerHeight - 48 });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state.draftPin]);
  useEffect(() => {
    const getData = async () => {
      const client = getClient();
      const pinData = await client.query({ query: QUERY_PINS });
      dispatch({
        type: actionTypes.GET_PINS,
        payload: { pins: pinData.data.pins }
      });

      // navigator.geolocation.getCurrentPosition(
      //   pos => {
      //     setViewport({
      //       ...viewport,
      //       longitude: pos.coords.longitude,
      //       latitude: pos.coords.latitude
      //     });
      //   },
      //   error => {
      //     console.log(error);
      //   }
      // );
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const _onViewportChange = viewport => {
    // setViewport(viewport);

    dispatch({
      type: actionTypes.UPDATE_VIEWPORT,
      payload: {
        viewport: {
          ...viewport,
          width: "100%",
          height: state.appState.isNewSighting ? 300 : window.innerHeight - 48
        }
      }
    });
  };
  const showSelectedPin = pin => {
    console.log("sele", pin);
    setShowPopup(false);

    dispatch({
      type: actionTypes.SET_CURRENT_PIN,
      payload: { currentPin: pin }
    });
  };
  // const onNewPinClicked = () => {
  //   setShowPopup(false);
  //   setPopupPin(null);
  //   // dispatch({ type: actionTypes.ADDING_MODE });
  //   dispatch({
  //     type: actionTypes.CREATE_DRAFT_PIN,
  //     payload: {
  //       draftPin: {
  //         ...state.draftPin,
  //         dateSpotted: new Date().getTime(),
  //         longitude: state.map.viewport.longitude,
  //         latitude: state.map.viewport.latitude
  //       }
  //     }
  //   });
  // };
  const clickHandler = ({ lngLat, type, target }) => {
    console.log(target.nodeName);
    if (!state.appState.isAuth) return;
    if (target.nodeName === "BUTTON" || target.nodeName === "svg") return;
    if (state.appState.isNewSighting) {
      dispatch({
        type: actionTypes.UPDATE_DRAFT_LOCATION,
        payload: {
          longitude: lngLat[0],
          latitude: lngLat[1]
        }
      });
    }
  };

  const closeHandler = () => {
    setShowPopup(false);
    setPopupPin(null);
  };

  const showComments = pin => {
    setShowPopup(false);

    dispatch({
      type: actionTypes.SET_CURRENT_PIN,
      payload: { currentPin: pin }
    });
    dispatch({ type: actionTypes.SHOW_COMMENTS });
  };

  const renderPopup = () => {
    return (
      <Popup
        tipSize={5}
        anchor="top"
        longitude={popupPin.longitude}
        latitude={popupPin.latitude}
        closeOnClick={false}
        closeButton={false}
      >
        <PinInfoPopup
          pin={popupPin}
          showMoreHandler={showSelectedPin}
          commentsHandler={showComments}
          closeHandler={closeHandler}
        />
      </Popup>
    );
  };

  const onDragEndHandler = ({ lngLat }) => {
    if (state.appState.isNewSighting) {
      dispatch({
        type: actionTypes.UPDATE_DRAFT_LOCATION,
        payload: {
          longitude: lngLat[0],
          latitude: lngLat[1]
        }
      });
    }
  };
  const markerRender = ({ pin, longitude, latitude, draggable }) => {
    // if (!activeMarker) return;
    // const { lng, lat, title } = activeMarker;
    return (
      <Marker
        key={pin.id}
        latitude={latitude}
        longitude={longitude}
        offsetLeft={-20}
        offsetTop={-10}
        draggable={draggable}
        onDragEnd={onDragEndHandler}
      >
        <div
          onClick={() => {
            if (state.appState.isNewSighting) return;

            setShowPopup(true);
            setPopupPin(pin);

            dispatch({
              type: actionTypes.UNSELECT_CURRENT_PIN
            });
            dispatch({ type: actionTypes.HIDE_COMMENTS });
          }}
          style={{ zIndex: "-3" }}
        >
          {draggable ? (
            <DraftWhaleIcon className={classes.whaleIconStyle} />
          ) : (
            <WhaleIcon className={classes.whaleIconStyle} />
          )}
        </div>
      </Marker>
    );
  };
  return (
    <>
      <ReactMapGL
        {...state.map.viewport}
        onViewportChange={_onViewportChange}
        mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
        onClick={clickHandler}
        mapStyle={process.env.REACT_APP_MAP_LAYER}
      >
        <GeolocateControl
          className={classes.geoLocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          fitBoundsOptions={{ maxZoom: 8 }}
          onViewportChange={_onViewportChange}
        />
        {state.draftPin
          ? markerRender({ ...state.draftPin, draggable: true, pin: { id: 0 } })
          : null}
        {state.pins.map(pin => markerRender({ pin, ...pin, draggable: false }))}
        {showPopup ? renderPopup(popupPin) : null}

        <div className={classes.fullscreenControlStyle}>
          <div className={classes.navStyle}>
            <NavigationControl />
          </div>
        </div>
        {
          //  state.isAuth &&
          //       !state.draftPin &&
          //       !state.showComments &&
          //       !state.currentPin ? (
          //         <div className={classes.newPin}>
          //           <NewButton onClick={onNewPinClicked}></NewButton>
          //         </div>
          //       ) : null
        }
      </ReactMapGL>

      {/* Subscriptions for Creating / Updating / Deleting Pins */}
      <Subscription
        subscription={PIN_ADDED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          const { pinAdded } = subscriptionData.data;
          dispatch({
            type: actionTypes.ON_PIN_ADDED,
            payload: {
              pin: { ...pinAdded, dateSpotted: new Date(pinAdded.dateSpotted) }
            }
          });
        }}
      />
      <Subscription
        subscription={PIN_UPDATED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          const { pinUpdated } = subscriptionData.data;
          dispatch({
            type: actionTypes.ON_PIN_UPDATED,
            payload: {
              pin: {
                ...pinUpdated,
                dateSpotted: new Date(pinUpdated.dateSpotted)
              }
            }
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

export { Map as default };
