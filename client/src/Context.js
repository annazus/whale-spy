import { createContext } from "react";
import whaleSpecies from "./Utils/whaleSpecies";
export const Context = createContext({
  //
  appState: {
    isAuth: false,
    isBusy: false,
    showNavigationSideBar: false,
    filterOpen: false,
    showPhotoFullScreen: false
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
    imageUrl: null
  },
  map: {
    viewport: {
      height: window.innerHeight - 52,
      width: "100%",
      latitude: 47.7237,
      longitude: -122.4713,
      zoom: 8
    }
  }
});
