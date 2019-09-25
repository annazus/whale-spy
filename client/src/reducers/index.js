import { actionTypes } from "../actions";

const reducer = (state = {}, action) => {
  let pins = [];
  let newPins = [];
  switch (action.type) {
    case actionTypes.GET_SIGHTINGS:
      return {
        ...state,
        isLoading: false,
        appData: action.payload
      };

    case actionTypes.LOGIN_USER:
      return {
        ...state,
        isAuth: true,
        isLoading: false,
        appState: { ...state.appState, isAuth: true },
        appData: { ...state.appData, me: action.payload.user }
      };

    case actionTypes.ON_SIGHTING_ADDED:
      const sightings = state.appData.sightings;
      if (
        !sightings.find(sighting => sighting.id === action.payload.sighting.id)
      ) {
        return {
          ...state,
          appData: {
            ...state.appData,
            sightings: state.appData.sightings.concat(action.payload.sighting),
            error: null
          }
        };
      } else return state;

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
      return { ...state, appState: { ...state.appState, filterOpen: false } };
    case actionTypes.FILTER_OPEN:
      return {
        ...state,
        appState: { ...state.appState, filterOpen: true },
        appData: { ...state.appData }
      };

    case actionTypes.FILTER_DATE:
      return {
        ...state,
        filterCriteria: {
          ...state.filterCriteria,
          fromDate: action.payload.fromDate,
          toDate: action.payload.toDate
        },
        appData: { ...state.appData, popup: null },
        appState: {
          ...state.appState,
          showSighting: false
        }
      };
    case actionTypes.FILTER_MARINE_MAMMAL_TYPE:
      return {
        ...state,
        filterCriteria: {
          ...state.filterCriteria,
          speciesList: action.payload.marineMammalTypes
        },
        appData: { ...state.appData, popup: null },
        appState: {
          ...state.appState,
          showSighting: false
        }
      };
    case actionTypes.SHOW_NAV_SIDE:
      return {
        ...state,
        appState: {
          ...state.appState,
          showNavigationSideBar: true,
          filterOpen: false
        },

        appData: { ...state.appData }
      };
    case actionTypes.HIDE_NAV_SIDE:
      return {
        ...state,
        appState: {
          ...state.appState,
          showNavigationSideBar: false,
          filterOpen: false
        }
      };
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
    case actionTypes.TOGGLE_FULLSCREEN_PHOTO:
      return {
        ...state,
        appData: {
          ...state.appData,
          imageUrl: action.payload
        },
        appState: {
          ...state.appState,
          showPhotoFullScreen: !state.appState.showPhotoFullScreen
        }
      };

    default:
      return state;
  }
};
export default reducer;
