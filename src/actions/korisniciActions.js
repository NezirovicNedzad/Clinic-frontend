import {
  KORISNICKI_LOGIN_REQUEST,
  KORISNICKI_LOGIN_SUCCESS,
  KORISNICKI_LOGIN_FAIL,
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
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};