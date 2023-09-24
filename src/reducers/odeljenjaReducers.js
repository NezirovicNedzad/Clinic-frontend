import {
  ODELJENJA_LIST_FAIL,
  ODELJENJA_LIST_REQUEST,
  ODELJENJA_LIST_SUCCESS,
  ODELJENJE_DELETE_REQUEST,
  ODELJENJE_DELETE_SUCCESS,
  ODELJENJE_DELETE_FAIL,
  ODELJENJA_DETAILS_REQUEST,
  ODELJENJA_DETAILS_SUCCESS,
  ODELJENJE_CREATE_REQUEST,
  ODELJENJE_CREATE_RESET,
  ODELJENJE_CREATE_FAIL,
  ODELJENJE_CREATE_SUCCESS,
  ODELJENJE_UPDATE_REQUEST,
  ODELJENJE_UPDATE_SUCCESS,
  ODELJENJE_UPDATE_FAIL,
  ODELJENJE_UPDATE_RESET,
  ODELJENJA_DETAILS_FAIL,
} from "../constants/odeljenjaConstants";

export const listOdeljenjaReducers = (state = { odeljenja: [] }, action) => {
  switch (action.type) {
    case ODELJENJA_LIST_REQUEST:
      return { loading: true, odeljenja: [] };

    case ODELJENJA_LIST_SUCCESS:
      return { loading: false, odeljenja: action.payload };

    case ODELJENJA_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const OdeljenjaDetailsReducers = (state = { odeljenje: {} }, action) => {
  switch (action.type) {
    case ODELJENJA_DETAILS_REQUEST:
      return { loading: true, ...state };

    case ODELJENJA_DETAILS_SUCCESS:
      return { loading: false, odeljenje: action.payload };

    case ODELJENJA_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const odeljenjeCreateReducer = (state = {}, action) => {
  //3 tipa akcije

  switch (action.type) {
    case ODELJENJE_CREATE_REQUEST:
      return { loading: true };
    case ODELJENJE_CREATE_SUCCESS:
      return { loading: false, success: true, odeljenje: action.payload };
    case ODELJENJE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ODELJENJE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const odeljenjeUpdateReducer = (state = { odeljenje: {} }, action) => {
  //3 tipa akcije

  switch (action.type) {
    case ODELJENJE_UPDATE_REQUEST:
      return { loading: true };
    case ODELJENJE_UPDATE_SUCCESS:
      return { loading: false, success: true, odeljenje: action.payload };
    case ODELJENJE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ODELJENJE_UPDATE_RESET:
      return {
        odeljenje: {},
      };
    default:
      return state;
  }
};

export const deleteOdeljenjaReducers = (state = {}, action) => {
  switch (action.type) {
    case ODELJENJE_DELETE_REQUEST:
      return { loading: true };

    case ODELJENJE_DELETE_SUCCESS:
      return { loading: false, success: true };

    case ODELJENJE_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
