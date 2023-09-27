
import axios from "axios";
import { KARTON_LIST_REQUEST,KARTON_LIST_FAIL,KARTON_LIST_SUCCESS, KARTON_PACIJENTA_LIST_REQUEST, KARTON_PACIJENTA_LIST_SUCCESS, KARTON_PACIJENTA_LIST_FAIL } from "../constants/kartonConstants";
export const listKartona = (idO,idP) => async (dispatch) => {
    try {
      dispatch({ type: KARTON_LIST_REQUEST});
  
      const { data } = await axios.get(`http://localhost:5000/api/Karton/${idO}/${idP}`);
  
      dispatch({
        type: KARTON_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: KARTON_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  export const listKartonaPacijenta = (idP) => async (dispatch) => {
    try {
      dispatch({ type: KARTON_PACIJENTA_LIST_REQUEST});
  
      const { data } = await axios.get(`http://localhost:5000/api/Karton/${idP}`);
  
      dispatch({
        type: KARTON_PACIJENTA_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: KARTON_PACIJENTA_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
