import {
  KORISNICKI_LOGIN_FAIL,
  KORISNICKI_LOGIN_REQUEST,
  KORISNICKI_LOGIN_SUCCESS,
  KORISNCIKI_LOGOUT,
  DODAJ_KORISNIKA_REQUEST,
  DODAJ_KORISNIKA_SUCCESS,
  DODAJ_KORISNIKA_FAIL,
  KORISNICI_LIST_REQUEST,
  KORISNICI_LIST_SUCCESS,
  KORISNICI_LIST_FAIL,
  UKLONI_KORISNIKA_REQUEST,
  UKLONI_KORISNIKA_SUCCESS,
  UKLONI_KORISNIKA_FAIL,
} from "../constants/korisniciConstants";

export const KorisnickiLoginReducers = (state = {}, action) => {
  switch (action.type) {
    case KORISNICKI_LOGIN_REQUEST:
      return { loading: true };

    case KORISNICKI_LOGIN_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };

    case KORISNICKI_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case KORISNCIKI_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const DodajKorisnikaReducers = (state = {}, action) => {
  switch (action.type) {
    case DODAJ_KORISNIKA_REQUEST:
      return { loading: true };

    case DODAJ_KORISNIKA_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      };

    case DODAJ_KORISNIKA_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const ListaKorisnikaReducers = (state = {}, action) => {
  switch (action.type) {
    case KORISNICI_LIST_REQUEST:
      return { loading: true };

    case KORISNICI_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        korisnici: action.payload,
      };

    case KORISNICI_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const UkloniKorisnikaReducers = (state = {}, action) => {
  switch (action.type) {
    case UKLONI_KORISNIKA_REQUEST:
      return { loading: true };

    case UKLONI_KORISNIKA_SUCCESS:
      return { loading: false, success: true };

    case UKLONI_KORISNIKA_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
