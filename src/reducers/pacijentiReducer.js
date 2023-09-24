import { PACIJENT_DETAILS_FAIL, PACIJENT_DETAILS_REQUEST, PACIJENT_DETAILS_SUCCESS, PACIJENT_ODELJENJA_LIST_FAIL, PACIJENT_ODELJENJA_LIST_REQUEST, PACIJENT_ODELJENJA_LIST_SUCCESS } from "../constants/pacijentConstants";

export const listPacijentiOdeljenjaReducers = (state = { pacijenti: [] }, action) => {
    switch (action.type) {
      case PACIJENT_ODELJENJA_LIST_REQUEST:
        return { loading: true, pacijenti: [] };
  
      case PACIJENT_ODELJENJA_LIST_SUCCESS:
        return { loading: false, pacijenti: action.payload };
  
      case PACIJENT_ODELJENJA_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  

  export const pacijentDetailsReducers = (state = { pacijent: {} ,lekar:{}}, action) => {
    switch (action.type) {
      case PACIJENT_DETAILS_REQUEST:
        return { loading: true, ...state };
  
      case PACIJENT_DETAILS_SUCCESS:
        return { loading: false, pacijent: action.payload,lekar:action.payload.lekar };
  
      case PACIJENT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  
