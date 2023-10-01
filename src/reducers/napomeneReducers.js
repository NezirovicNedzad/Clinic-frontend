import {
  NAPOMENA_CREATE_FAIL,
  NAPOMENA_CREATE_REQUEST,
  NAPOMENA_CREATE_RESET,
  NAPOMENA_CREATE_SUCCESS,
} from "../constants/napomeneConstants";

export const napomenaCreateReducers = (state = {}, action) => {
  switch (action.type) {
    case NAPOMENA_CREATE_REQUEST:
      return { loading: true };
    case NAPOMENA_CREATE_SUCCESS:
      return { loading: false, success: true, napomena: action.payload };
    case NAPOMENA_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case NAPOMENA_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
