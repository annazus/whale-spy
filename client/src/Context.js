import { createContext } from "react";
import whaleSpecies from "./Utils/whaleSpecies";
export const Context = createContext({
  isLoading: false,
  currentPin: null,
  draftPin: null,
  pins: [],
  showComments: false,
  isAuth: false,

  //
  appState: {
    isAuth: false,
    isBusy: false,
    isNewSighting: false,
    isEditingSighting: false,
    showSightingSummary: false,
    showNavigationSideBar: false,
    filterOpen: false,
    showComments: false,
    showPhotoFullScreen: false,
    showSighting: false
  },
  filterCriteria: {
    fromDate: null,
    toDate: null,
    speciesList: whaleSpecies.map(({ val }) => val)
  },
  appData: {
    sightings: [],
    me: [],
    error: null,
    popup: null,
    imageUrl: null
  },
  map: {
    viewport: {
      height: window.innerHeight - 52,
      width: "100vw",
      latitude: 47.7237,
      longitude: -122.4713,
      zoom: 8
    }
  }
});
