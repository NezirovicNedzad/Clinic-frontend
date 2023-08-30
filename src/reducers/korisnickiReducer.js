import {
  KORISNICKI_LOGIN_FAIL,
  KORISNICKI_LOGIN_REQUEST,
  KORISNICKI_LOGIN_SUCCESS,
  KORISNCIKI_LOGOUT,
} from "../constants/korisniciConstants";

export const KorisnickiLoginReducers = (state = {}, action) => {
  switch (action.type) {
    case KORISNICKI_LOGIN_REQUEST:
      return { loading: true };

    case KORISNICKI_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case KORISNICKI_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case KORISNCIKI_LOGOUT:
      return {};
    default:
      return state;
  }
};
