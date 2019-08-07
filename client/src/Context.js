import { createContext } from "react";

export const Context = createContext({
  isLoading: false,
  currentPin: null,
  draftPin: null,
  pins: [],
  user: {},
  showComments: false
});
