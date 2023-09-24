import axios from "axios";
import {
  ODELJENJA_LIST_FAIL,
  ODELJENJA_LIST_REQUEST,
  ODELJENJA_LIST_SUCCESS,
  ODELJENJE_DELETE_FAIL,
  ODELJENJE_DELETE_REQUEST,
  ODELJENJE_DELETE_SUCCESS,
  ODELJENJA_DETAILS_FAIL,
  ODELJENJA_DETAILS_SUCCESS,
  ODELJENJA_DETAILS_REQUEST,
  ODELJENJE_CREATE_SUCCESS,
  ODELJENJE_CREATE_FAIL,
  ODELJENJE_CREATE_REQUEST,
  ODELJENJE_UPDATE_REQUEST,
  ODELJENJE_UPDATE_SUCCESS,
  ODELJENJE_UPDATE_FAIL,
} from "../constants/odeljenjaConstants";

export const listOdeljenja = () => async (dispatch) => {
  try {
    dispatch({ type: ODELJENJA_LIST_REQUEST });

    const { data } = await axios.get("http://localhost:5000/api/Odeljenje");

    dispatch({
      type: ODELJENJA_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ODELJENJA_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteOdeljenje = (id) => async (dispatch) => {
  try {
    dispatch({ type: ODELJENJE_DELETE_REQUEST });

    await axios.delete(`http://localhost:5000/api/Odeljenje/${id}`);

    dispatch({
      type: ODELJENJE_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ODELJENJE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const DetailsOdeljenje = (id) => async (dispatch) => {
  try {
    dispatch({ type: ODELJENJA_DETAILS_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/api/Odeljenje/${id}`
    );

    dispatch({
      type: ODELJENJA_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ODELJENJA_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const CreateOdeljenje =
  (naziv, specijalizacijaNaziv, brojKreveta, brojPacijenata) =>
  async (dispatch) => {
    try {
      dispatch({ type: ODELJENJE_CREATE_REQUEST });

      const { data } = await axios.post("http://localhost:5000/api/Odeljenje", {
        naziv,
        specijalizacijaNaziv,
        brojKreveta,
        brojPacijenata,
      });

      dispatch({
        type: ODELJENJE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ODELJENJE_CREATE_FAIL,
        payload: error.response.data,
      });
    }
  };

export const OdeljenjeUpdate = (odeljenje) => async (dispatch, getState) => {
  try {
    dispatch({ type: ODELJENJE_UPDATE_REQUEST });

    const { data } = await axios.put(
      `http://localhost:5000/api/Odeljenje/${odeljenje.id}`,
      odeljenje
    ); //passing a object,dont send data
    dispatch({ type: ODELJENJE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ODELJENJE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
