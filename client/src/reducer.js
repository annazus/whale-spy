import { actionTypes } from "./actions";

const reducer = (state = {}, action) => {
  console.log(action);
  let pins = [];
  let newPins = [];
  switch (action.type) {
    case actionTypes.CREATE_COMMENT:
      let comments = state.currentPin.comments;
      if (!comments) comments = [];
      return {
        ...state,
        isLoading: false,
        currentPin: {
          ...state.currentPin,
          comments: comments.concat(action.payload.comment)
        }
      };
    case actionTypes.CREATE_DRAFT_PIN:
      return {
        ...state,
        draftPin: { ...action.payload.draftPin },
        currentPin: null
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
      return { ...state, draftPin: null };
    case actionTypes.DISCARD_CURRENT_PIN_CHANGES:
      return { ...state, currentPin: null };

    case actionTypes.GET_COMMENTS:
      return {
        ...state,
        isLoading: false,
        currentPin: { ...state.currentPin, comments: action.payload.comments }
      };
    case actionTypes.GET_PINS:
      return {
        ...state,
        isLoading: false,
        pins: action.payload.pins
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
      return { ...state, isAuth: true, isLoading: false, user: action.payload };
    case actionTypes.MAKE_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.SAVE_DRAFT_AS_PIN:
      pins = state.pins;
      newPins = state.pins.concat(action.payload.pin);
      return {
        ...state,
        isLoading: false,
        pins: newPins,
        currentPin: null,
        draftPin: null
      };
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
        currentPin: action.payload.currentPin
      };
    case actionTypes.UNSELECT_CURRENT_PIN:
      return {
        ...state,
        draftPin: null,
        currentPin: null
      };
    case actionTypes.SIGNOUT_USER:
      return { ...state, isAuth: false, isLoading: false };

    case actionTypes.SIGNUP_USER:
      return { ...state, isAuth: true, isLoading: false, user: action.payload };

    default:
      return state;
  }
};
export default reducer;
