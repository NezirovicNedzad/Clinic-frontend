import axios from "axios";
import { PREGLED_CREATE_FAIL, PREGLED_CREATE_REQUEST, PREGLED_CREATE_SUCCESS } from "../constants/pregledConstants";




export const CreatePregled =
  (id, anamneza, dijagnoza, terapija,idLekar,idKarton) => async (dispatch) => {
    try {
      dispatch({ type: PREGLED_CREATE_REQUEST });

      const { data } = await axios.post("http://localhost:5000/api/Pregled", {
        id,
       anamneza,
       dijagnoza,
       terapija,
       idKarton,
       idLekar,
      
      });

      dispatch({
        type: PREGLED_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PREGLED_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };