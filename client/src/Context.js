import { createContext } from "react";

export const Context = createContext({
  isLoading: false,
  currentPin: null,
  draftPin: null,
  pins: [],
  user: {},
  showComments: false,
  filterOpen: false,
  showNavigationSideBar: false,
  marineMammalTypes: ["Orca", "Gray", "Minke", "Humpback"],
  fromDate: new Date("1/1/1969"),
  toDate: new Date("1/1/2050"),

  //
  appState: {
    isAuth: false,
    isLoading: false,
    isNewSighting: false,
    isEditingSighting: false,
    showSightingSummary: false,
    showNavigationSideBar: false,
    showFilterWindow: false
  },
  filterCriteria: {
    fromDate: null,
    toDate: null,
    speciesList: ["Orca", "Gray", "Minke", "Humpback", "Unknown"]
  },
  appData: {
    sightings: [],
    me: []
  },
  mapCenterPosition: { lat: null, lng: null }
});
