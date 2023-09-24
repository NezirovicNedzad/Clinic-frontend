import { KARTON_LIST_REQUEST,KARTON_LIST_SUCCESS,KARTON_LIST_FAIL } from "../constants/kartonConstants";

export const kartoniDetailsReducers = (state = { karton: {} ,lekarK :{},pregledi:[]}, action) => {
    switch (action.type) {
      case KARTON_LIST_REQUEST:
        return { loading: true, ...state };
  
      case KARTON_LIST_SUCCESS:
        return { loading: false, karton: action.payload,lekarK:action.payload.lekar,pregledi:action.payload.pregledi };
  
      case KARTON_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  