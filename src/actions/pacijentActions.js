import { PACIJENT_ODELJENJA_LIST_FAIL, PACIJENT_ODELJENJA_LIST_REQUEST, PACIJENT_ODELJENJA_LIST_SUCCESS } from "../constants/pacijentConstants";
import axios from "axios";
export const listPacijentOdeljenja = (id) => async (dispatch) => {
    try {
      dispatch({ type: PACIJENT_ODELJENJA_LIST_REQUEST });
  
      const { data } = await axios.get(`http://localhost:5000/api/Pacijent/odeljenja/${id}`);
  
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
  