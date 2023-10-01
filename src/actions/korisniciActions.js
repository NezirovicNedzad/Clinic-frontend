import {
  KORISNICKI_LOGIN_REQUEST,
  KORISNICKI_LOGIN_SUCCESS,
  KORISNICKI_LOGIN_FAIL,
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
  LEKAR_LIST_REQUEST,
  LEKAR_LIST_SUCCESS,
  LEKAR_LIST_FAIL,
} from "../constants/korisniciConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: KORISNICKI_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `http://localhost:5000/api/Account/login`,
      { email, password },
      config
    );

    dispatch({
      type: KORISNICKI_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: KORISNICKI_LOGIN_FAIL,
      payload: error.response.data,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: KORISNCIKI_LOGOUT,
  });
};

export const dodajKorisnika =
  (
    Email,
    Password,
    Role,
    Ime,
    Prezime,
    Username,
    Specijalizacija,
    OdeljenjeId
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: DODAJ_KORISNIKA_REQUEST });

      const { data } = await axios.post(
        "http://localhost:5000/api/Account/AdminCreateUser",
        {
          Ime,
          Prezime,
          Email,
          OdeljenjeId,
          Username,
          Password,
          Role,
          Specijalizacija,
        }
      );

      dispatch({ type: DODAJ_KORISNIKA_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DODAJ_KORISNIKA_FAIL,
        payload: error.response.data,
      });
    }
  };

export const listaKorisnika = () => async (dispatch) => {
  try {
    dispatch({ type: KORISNICI_LIST_REQUEST });

    const { data } = await axios.get(
      "http://localhost:5000/api/Account/GetAllUsers"
    );

    dispatch({ type: KORISNICI_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: KORISNICI_LIST_FAIL,
      payload: error.response.data,
    });
  }
};

export const ukloniKorisnika = (id) => async (dispatch) => {
  try {
    dispatch({ type: UKLONI_KORISNIKA_REQUEST });

    await axios.delete(
      `http://localhost:5000/api/Account/AdminDeleteUser?id=${id}`
    );

    dispatch({
      type: UKLONI_KORISNIKA_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: UKLONI_KORISNIKA_FAIL,
      payload: error.response.data,
    });
  }
};

export const listaLekara = () => async (dispatch) => {
  try {
    dispatch({ type: LEKAR_LIST_REQUEST });

    const { data } = await axios.get(
      "http://localhost:5000/api/Account/GetAllUsersWithOdeljenjeId"
    );

    dispatch({ type: LEKAR_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LEKAR_LIST_FAIL,
      payload: error.response.data,
    });
  }
};
