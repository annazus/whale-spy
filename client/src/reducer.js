import { actionTypes } from "./actions";

const reducer = (state = {}, action) => {
  console.log(action);
  let pins = [];
  let newPins = [];
  switch (action.type) {
    case actionTypes.ADDING_MODE:
      return {
        ...state,
        addingMode: true
      };
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
      return { ...state, draftPin: null, addingMode: false };

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
      if (pins.find(pin => pin.id === action.payload.pin.id)) return state;
      newPins = state.pins.concat(action.payload.pin);
      return {
        ...state,
        isLoading: false,
        pins: newPins,
        currentPin: null,
        draftPin: null,
        addingMode: false
      };
    case actionTypes.ON_PIN_ADDED:
      pins = state.pins;
      if (pins.find(pin => pin.id === action.payload.pin.id)) return state;
      newPins = state.pins.concat(action.payload.pin);
      return {
        ...state,
        isLoading: false,
        pins: newPins,
        currentPin: null,
        draftPin: null
      };
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
      console.log("currentpin", action.payload.currentPin);
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
      return { ...state, isAuth: false, isLoading: false };

    case actionTypes.SIGNUP_USER:
      return { ...state, isAuth: true, isLoading: false, user: action.payload };

    case actionTypes.FILTER_CLOSE:
      return { ...state, filterOpen: false };
    case actionTypes.FILTER_OPEN:
      return { ...state, filterOpen: true };

    case actionTypes.FILTER_DATE:
      return {
        ...state,
        fromDate: action.payload.fromDate,
        toDate: action.payload.toDate
      };
    case actionTypes.FILTER_MARINE_MAMMAL_TYPE:
      console.log("marines", action.payload.marineMammalTypes);
      return {
        ...state,
        marineMammalTypes: action.payload.marineMammalTypes
      };
    default:
      return state;
  }
};
export default reducer;
