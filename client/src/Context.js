import { createContext } from "react";
import whaleSpecies from "./Utils/whaleSpecies";
export const Context = createContext({
  isLoading: false,
  currentPin: null,
  draftPin: null,
  pins: [],
  user: {},
  showComments: false,
  filterOpen: false,
  showNavigationSideBar: false,

  //
  appState: {
    isAuth: false,
    isBusy: false,
    isNewSighting: false,
    isEditingSighting: false,
    showSightingSummary: false,
    showNavigationSideBar: false,
    showFilterWindow: false,
    showComments: false
  },
  filterCriteria: {
    fromDate: null,
    toDate: null,
    speciesList: whaleSpecies.map(({ val }) => val)
  },
  appData: {
    sightings: [],
    me: []
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
