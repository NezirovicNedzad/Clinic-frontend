import axios from "axios";
import {
  NAPOMENA_CREATE_FAIL,
  NAPOMENA_CREATE_REQUEST,
  NAPOMENA_CREATE_SUCCESS,
} from "../constants/napomeneConstants";

export const CreateNapomena =
  (id, nezeljenoDejstvo, primedba, idKarton, idSestra) => async (dispatch) => {
    try {
      dispatch({ type: NAPOMENA_CREATE_REQUEST });

      const { data } = await axios.post("http://localhost:5000/api/Napomena", {
        id,
        nezeljenoDejstvo,
        primedba,
        idKarton,
        idSestra,
      });

      dispatch({
        type: NAPOMENA_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NAPOMENA_CREATE_FAIL,
        payload: error.response.data,
      });
    }
  };
