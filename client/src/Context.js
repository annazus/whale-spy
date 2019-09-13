import { createContext } from "react";

export const Context = createContext({
  isLoading: false,
  currentPin: null,
  draftPin: null,
  pins: [],
  user: {},
  showComments: false,
  filterOpen: false,
  marineMammalTypes: ["Orca", "Gray Whale", "Minke Whale"],
  fromDate: new Date("1/1/1969"),
  toDate: new Date("1/1/2050")
});
