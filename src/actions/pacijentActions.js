import {
  PACIJENT_DELETE_FAIL,
  PACIJENT_DELETE_REQUEST,
  PACIJENT_DELETE_SUCCESS,
  PACIJENT_DETAILS_FAIL,
  PACIJENT_DETAILS_REQUEST,
  PACIJENT_DETAILS_SUCCESS,
  PACIJENT_DODAJ_FAIL,
  PACIJENT_DODAJ_REQUEST,
  PACIJENT_DODAJ_SUCCESS,
  PACIJENT_IZABRANI_LIST_FAIL,
  PACIJENT_IZABRANI_LIST_REQUEST,
  PACIJENT_IZABRANI_LIST_SUCCESS,
  PACIJENT_ODELJENJA_LIST_FAIL,
  PACIJENT_ODELJENJA_LIST_REQUEST,
  PACIJENT_ODELJENJA_LIST_SUCCESS,
  PACIJENT_PREBACI_FAIL,
  PACIJENT_PREBACI_REQUEST,
  PACIJENT_PREBACI_SUCCESS,
} from "../constants/pacijentConstants";
import axios from "axios";
export const listPacijentOdeljenja = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PACIJENT_ODELJENJA_LIST_REQUEST });
    const {
      korisnickiLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/Pacijent/odeljenja/${id}`,
      config
    );

    dispatch({
      type: PACIJENT_ODELJENJA_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PACIJENT_ODELJENJA_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const izabraniPacijenti = (idLekara) => async (dispatch, getState) => {
  try {
    dispatch({ type: PACIJENT_IZABRANI_LIST_REQUEST });
    const {
      korisnickiLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:5000/api/Pacijent/IzabraniLekar/${idLekara}`,
      config
    );

    dispatch({
      type: PACIJENT_IZABRANI_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PACIJENT_IZABRANI_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const detailsPatient = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PACIJENT_DETAILS_REQUEST });
    const {
      korisnickiLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/Pacijent/${id}`,
      config
    );

    dispatch({
      type: PACIJENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PACIJENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const prebaciPacijenta =
  (idP, idO, idL) => async (dispatch, getState) => {
    try {
      dispatch({ type: PACIJENT_PREBACI_REQUEST });
      const {
        korisnickiLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/Pacijent/prebaci/${idP}/${idO}/${idL}`,
        config
      );

      dispatch({
        type: PACIJENT_PREBACI_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PACIJENT_PREBACI_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deletePacijent = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PACIJENT_DELETE_REQUEST });

    const {
      korisnickiLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`http://localhost:5000/api/Pacijent/${id}`, config);

    dispatch({
      type: PACIJENT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PACIJENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const dodajPacijenta =
  (ime, prezime, jmbg, brojGodina, pol, idLekara, idOdeljenja) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PACIJENT_DODAJ_REQUEST });

      const {
        korisnickiLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/Pacijent",
        {
          ime,
          prezime,
          jmbg,
          brojGodina,
          pol,
          idLekara,
          idOdeljenja,
        },
        config
      );

      dispatch({ type: PACIJENT_DODAJ_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PACIJENT_DODAJ_FAIL,
        payload: error.response.data,
      });
    }
  };
