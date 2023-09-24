import { PREGLED_CREATE_FAIL, PREGLED_CREATE_REQUEST, PREGLED_CREATE_RESET, PREGLED_CREATE_SUCCESS } from "../constants/pregledConstants";

export const pregledCreateReducers = (state = {}, action) => {
    //3 tipa akcije
  
    switch (action.type) {
      case PREGLED_CREATE_REQUEST:
        return { loading: true };
      case PREGLED_CREATE_SUCCESS:
        return { loading: false, success: true, pregled: action.payload };
      case PREGLED_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case PREGLED_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  