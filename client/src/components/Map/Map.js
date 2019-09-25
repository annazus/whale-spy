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

import { getClient } from "../../graphql/client";
import { SightingPopup } from "../Sightings";
import getFilteredSightings from "../../Utils/getFilteredSightings";
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
  },
  draftWhaleIconStyle: {
    width: "30px",
    height: "30px",
    color: "red",
    zIndex: "0"
  }
}));

const Map = () => {
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

  const setPopupPin = popup => {
    dispatch({
      type: actionTypes.SET_POPUP,
      payload: popup
    });
  };
  const resizeMap = () => {
    dispatch({
      type: actionTypes.UPDATE_VIEWPORT,
      payload: {
        viewport: {
          ...state.map.viewport,
          width: "100%",
          height: window.innerHeight - 52
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

  const _onViewportChange = viewport => {
    dispatch({
      type: actionTypes.UPDATE_VIEWPORT,
      payload: {
        viewport: {
          ...viewport,
          width: "100%",
          height: window.innerHeight - 52
        }
      }
    });
  };
  const showSelectedPin = pin => {
    dispatch({
      type: actionTypes.SHOW_SIGHTING
    });
  };
  // const onNewPinClicked = () => {
  //   setShowPopup(false);
  //   setPopupPin(null);
  //   // dispatch({ type: actionTypes.ADDING_MODE });
  //   dispatch({
  //     type: actionTypes.CREATE_DRAFT_SIGHTING,
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
    if (!state.appState.isAuth) return;
    if (target.nodeName === "BUTTON" || target.nodeName === "svg") return;
  };

  const closeHandler = () => {
    setPopupPin(null);
  };

  const showComments = pin => {
    setPopupPin(null);

    dispatch({
      type: actionTypes.SET_CURRENT_SIGHTING,
      payload: { currentPin: pin }
    });
    dispatch({ type: actionTypes.SHOW_COMMENTS });
  };

  const renderPopup = () => {
    return (
      <Popup
        tipSize={5}
        anchor="top"
        longitude={state.appData.popup.longitude}
        latitude={state.appData.popup.latitude}
        closeOnClick={false}
        closeButton={false}
      >
        <SightingPopup
          sighting={state.appData.popup}
          showMoreHandler={showSelectedPin}
          commentsHandler={showComments}
          closeHandler={closeHandler}
          showFullScreenHandler={() => {
            let imageUrl;
            if (state.appData.popup.images.length > 0) {
              imageUrl = state.appData.popup.images[0].url;
            } else return;
            dispatch({
              type: actionTypes.TOGGLE_FULLSCREEN_PHOTO,
              payload: imageUrl
            });
          }}
        />
      </Popup>
    );
  };

  const markerRender = ({ sighting, longitude, latitude, draggable }) => {
    // if (!activeMarker) return;
    // const { lng, lat, title } = activeMarker;
    return (
      <Marker
        key={sighting.id}
        latitude={latitude}
        longitude={longitude}
        offsetLeft={-20}
        offsetTop={-10}
        draggable={false}
      >
        <div
          onClick={() => {
            setPopupPin(sighting);

            dispatch({
              type: actionTypes.UNSELECT_CURRENT_SIGHTING
            });
            dispatch({ type: actionTypes.HIDE_COMMENTS });
          }}
          style={{ zIndex: "-3" }}
        >
          <WhaleIcon className={classes.whaleIconStyle} />
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
        {
          <GeolocateControl
            className={classes.geoLocateStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            fitBoundsOptions={{ maxZoom: 8 }}
            showUserLocation={true}
            onViewportChange={_onViewportChange}
          />
        }

        {getFilteredSightings(
          state.appData.sightings,
          state.filterCriteria
        ).map(sighting =>
          markerRender({ sighting, ...sighting, draggable: false })
        )}
        {state.appData.popup ? renderPopup(state.appData.popup) : null}

        <div className={classes.fullscreenControlStyle}>
          <div className={classes.navStyle}>
            <NavigationControl />
          </div>
        </div>
      </ReactMapGL>
    </>
  );
};

export { Map as default };
