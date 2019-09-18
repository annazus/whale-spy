import { actionTypes } from "../actions";

const reducer = (state = {}, action) => {
  let pins = [];
  let newPins = [];
  switch (action.type) {
    // case actionTypes.ADDING_MODE:
    //   return {
    //     ...state,
    //   };
    case actionTypes.CREATE_COMMENT:
      let comments = state.currentPin.comments;

      if (!comments) comments = [];
      if (comments.find(comment => comment.id === action.payload.comment.id))
        return state;
      return {
        ...state,
        isLoading: false,
        currentPin: {
          ...state.currentPin,
          comments: comments.concat(action.payload.comment)
        }
      };
    case actionTypes.ON_COMMENT_ADDED:
      let comments1 = state.currentPin.comments;

      if (!comments1) comments1 = [];
      if (comments1.find(comment => comment.id === action.payload.comment.id))
        return state;
      return {
        ...state,
        isLoading: false,
        currentPin: {
          ...state.currentPin,
          comments: comments1.concat(action.payload.comment)
        }
      };
    case actionTypes.CREATE_DRAFT_PIN:
      return {
        ...state,
        draftPin: { ...action.payload.draftPin },
        appState: {
          ...state.appState,
          isNewSighting: true,
          isEditingSighting: false,
          showSightingSummary: false,
          showNavigationSideBar: false,
          showFilterWindow: false
        },
        map: {
          viewport: { ...state.map.viewport, width: "100%", height: "300px" }
        },
        appData: { ...state.appData, popup: null },

        currentPin: null
      };
    case actionTypes.UPDATE_DRAFT_LOCATION:
      return {
        ...state,
        draftPin: {
          ...state.draftPin,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude
        }
      };
    case actionTypes.UPDATE_CURRENT_PIN:
      return {
        ...state,
        currentPin: { ...action.payload.currentPin },
        draftPin: null
      };

    case actionTypes.DELETE_PIN:
      pins = state.pins;
      newPins = state.pins.filter(pin => pin.id !== state.currentPin.id);
      return { ...state, isLoading: false, pins: newPins, currentPin: null };
    case actionTypes.DISCARD_DRAFT:
      return {
        ...state,
        appData: { ...state.appData, error: null },

        draftPin: null,
        appState: {
          ...state.appState,
          isNewSighting: false
        },
        map: {
          viewport: {
            ...state.map.viewport,
            width: "100%",
            height: window.innerHeight - 52
          }
        }
      };
    case actionTypes.DRAFT_SAVED_SUCCESSFULLY:
      return {
        ...state,
        appData: { ...state.appData, error: null },

        draftPin: null,
        appState: {
          ...state.appState,
          isNewSighting: false
        },
        map: {
          viewport: {
            ...state.map.viewport,
            width: "100%",
            height: window.innerHeight - 52
          }
        }
      };

    case actionTypes.DISCARD_CURRENT_PIN_CHANGES:
      return { ...state, currentPin: null };

    case actionTypes.GET_COMMENTS:
      return {
        ...state,
        isLoading: false,
        currentPin: { ...state.currentPin, comments: action.payload.comments }
      };
    case actionTypes.GET_SIGHTINGS:
      return {
        ...state,
        isLoading: false,
        appData: action.payload
      };
    case actionTypes.SHOW_COMMENTS:
      return {
        ...state,
        showComments: true
      };
    case actionTypes.HIDE_COMMENTS:
      return {
        ...state,
        showComments: false
      };
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        appState: { ...state.appState, isAuth: true },
        appData: { ...state.appData, me: action.payload.user }
      };
    case actionTypes.MAKE_REQUEST:
      return { ...state, isLoading: true };

    case actionTypes.ON_SIGHTING_ADDED:
      const sightings = state.appData.sightings;
      if (
        !sightings.find(sighting => sighting.id === action.payload.sighting.id)
      ) {
        newPins = state.pins.concat(action.payload.pin);
        return {
          ...state,
          appData: {
            ...state.appData,
            sightings: state.appData.sightings.concat(action.payload.sighting),
            error: null
          }
        };
      } else return state;
    case actionTypes.ON_PIN_UPDATED:
      const updatedPin1 = action.payload.pin;
      const oldPinList1 = state.pins;
      const tempPinList1 = oldPinList1.filter(pin => pin.id !== updatedPin1.id);

      const newPinList1 = tempPinList1.concat(updatedPin1);
      return {
        ...state,
        isLoading: false,
        pins: newPinList1,
        currentPin: null,
        draftPin: null
      };
    case actionTypes.ON_PIN_DELETED:
      const pinIdDeleted = action.payload.pinId;
      const newPins1 = state.pins.filter(pin => pin.id !== pinIdDeleted);
      return { ...state, isLoading: false, pins: newPins1, currentPin: null };
    case actionTypes.SAVE_CURRENT_PIN:
      const updatedPin = action.payload.pin;
      const oldPinList = state.pins;
      const tempPinList = oldPinList.filter(pin => pin.id !== updatedPin.id);

      const newPinList = tempPinList.concat(updatedPin);
      return {
        ...state,
        isLoading: false,
        pins: newPinList,
        currentPin: null,
        draftPin: null
      };
    case actionTypes.SET_CURRENT_PIN:
      return {
        ...state,
        draftPin: null,
        currentPin: action.payload.currentPin,
        showComments: false
      };
    case actionTypes.UNSELECT_CURRENT_PIN:
      return {
        ...state,
        draftPin: null,
        currentPin: null,
        showComments: false
      };
    case actionTypes.SIGNOUT_USER:
      return {
        ...state,
        isAuth: false,
        isLoading: false,
        appState: {
          ...state.appState,
          isAuth: false,
          isNewSighting: false,
          isEditingSighting: false
        },
        appData: { ...state.appData, me: null }
      };

    case actionTypes.SIGNUP_USER:
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        appState: { ...state.appState, isAuth: true },
        appData: { ...state.appData, me: action.payload.user }
      };

    case actionTypes.FILTER_CLOSE:
      return { ...state, filterOpen: false };
    case actionTypes.FILTER_OPEN:
      return {
        ...state,
        filterOpen: true,
        appData: { ...state.appData, popup: null }
      };

    case actionTypes.FILTER_DATE:
      return {
        ...state,
        filterCriteria: {
          ...state.filterCriteria,
          fromDate: action.payload.fromDate,
          toDate: action.payload.toDate
        }
      };
    case actionTypes.FILTER_MARINE_MAMMAL_TYPE:
      return {
        ...state,
        filterCriteria: {
          ...state.filterCriteria,
          speciesList: action.payload.marineMammalTypes
        }
      };
    case actionTypes.SHOW_NAV_SIDE:
      return {
        ...state,
        showNavigationSideBar: true,
        appData: { ...state.appData, popup: null }
      };
    case actionTypes.HIDE_NAV_SIDE:
      return { ...state, showNavigationSideBar: false };
    case actionTypes.UPDATE_VIEWPORT:
      return { ...state, map: { viewport: action.payload.viewport } };
    case actionTypes.START_BUSY:
      return { ...state, appState: { ...state.appState, isBusy: true } };
    case actionTypes.END_BUSY:
      return { ...state, appState: { ...state.appState, isBusy: false } };
    case actionTypes.SET_POPUP:
      return {
        ...state,
        appData: { ...state.appData, popup: action.payload }
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        appData: { ...state.appData, error: action.payload }
      };
    default:
      return state;
  }
};
export default reducer;
