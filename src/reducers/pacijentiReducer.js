import { PACIJENT_ODELJENJA_LIST_FAIL, PACIJENT_ODELJENJA_LIST_REQUEST, PACIJENT_ODELJENJA_LIST_SUCCESS } from "../constants/pacijentConstants";

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
  
