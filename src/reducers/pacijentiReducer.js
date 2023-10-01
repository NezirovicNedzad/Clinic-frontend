import { PACIJENT_DELETE_FAIL, PACIJENT_DELETE_REQUEST, PACIJENT_DELETE_RESET, PACIJENT_DELETE_SUCCESS, PACIJENT_DETAILS_FAIL, PACIJENT_DETAILS_REQUEST, PACIJENT_DETAILS_SUCCESS, PACIJENT_IZABRANI_LIST_FAIL, PACIJENT_IZABRANI_LIST_REQUEST, PACIJENT_IZABRANI_LIST_SUCCESS, PACIJENT_ODELJENJA_LIST_FAIL, PACIJENT_ODELJENJA_LIST_REQUEST, PACIJENT_ODELJENJA_LIST_SUCCESS, PACIJENT_PREBACI_FAIL, PACIJENT_PREBACI_REQUEST, PACIJENT_PREBACI_RESET, PACIJENT_PREBACI_SUCCESS } from "../constants/pacijentConstants";

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
  export const listPacijentiIzabraniReducers = (state = { pacijenti: [] }, action) => {
    switch (action.type) {
      case PACIJENT_IZABRANI_LIST_REQUEST:
        return { loading: true, pacijenti: [] };
  
      case PACIJENT_IZABRANI_LIST_SUCCESS:
        return { loading: false, pacijenti: action.payload };
  
      case PACIJENT_IZABRANI_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  

  export const pacijentDetailsReducers = (state = { pacijent: {} }, action) => {
    switch (action.type) {
      case PACIJENT_DETAILS_REQUEST:
        return { loading: true, ...state };
  
      case PACIJENT_DETAILS_SUCCESS:
        return { loading: false, pacijent: action.payload };
  
      case PACIJENT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  
  export const pacijentPrebaciReducers = (state = {}, action) => {
    //3 tipa akcije
  
    switch (action.type) {
      case PACIJENT_PREBACI_REQUEST:
        return { loading: true ,...state};
      case PACIJENT_PREBACI_SUCCESS:
        return { loading: false, success: true };
      case PACIJENT_PREBACI_FAIL:
        return { loading: false, error: action.payload };
      case PACIJENT_PREBACI_RESET:
        return {};
      default:
        return state;
    }
  };


  
export const deletePacijentReducers = (state = {}, action) => {
  switch (action.type) {
    case PACIJENT_DELETE_REQUEST:
      return { loading: true };

    case PACIJENT_DELETE_SUCCESS:
      return { loading: false, successDelete: true };

    case PACIJENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
      case PACIJENT_DELETE_RESET:
        return {};

    default:
      return state;
  }
};