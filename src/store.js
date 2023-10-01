import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import {
  listOdeljenjaReducers,
  deleteOdeljenjaReducers,
  OdeljenjaDetailsReducers,
  odeljenjeCreateReducer,
  odeljenjeUpdateReducer,
} from "./reducers/odeljenjaReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  DodajKorisnikaReducers,
  KorisnickiLoginReducers,
  ListaKorisnikaReducers,
  UkloniKorisnikaReducers,
} from "./reducers/korisnickiReducer";
import { deletePacijentReducers, listPacijentiIzabraniReducers, listPacijentiOdeljenjaReducers, pacijentDetailsReducers, pacijentPrebaciReducers } from "./reducers/pacijentiReducer";
import { kartoniDetailsReducers, kartoniPacijentducers } from "./reducers/kartoniReducers";
import {  pregledCreateReducers } from "./reducers/preglediReducers";

const reducer = combineReducers({
  odeljenjaList: listOdeljenjaReducers,
  odeljenjaDelete: deleteOdeljenjaReducers,
  odeljenjaDetails: OdeljenjaDetailsReducers,
  odeljenjaCreate: odeljenjeCreateReducer,
  odeljenjaUpdate: odeljenjeUpdateReducer,
  dodajKorisnikaState: DodajKorisnikaReducers,
  korisniciList: ListaKorisnikaReducers,
  korisniciUkloni: UkloniKorisnikaReducers,
  korisnickiLogin: KorisnickiLoginReducers,
  pacijentiListReducer: listPacijentiOdeljenjaReducers,
  pacijentDetails:pacijentDetailsReducers,
  pacijentPrebaci:pacijentPrebaciReducers,
  pacijentIzabrani:listPacijentiIzabraniReducers,
  pacijentDelete:deletePacijentReducers,
  kartoniList:kartoniDetailsReducers,
  kartoniPacijent:kartoniPacijentducers,
  pregledCreate:pregledCreateReducers,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  korisnickiLogin: { userInfo: userInfoFromStorage },
};
const middleaware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleaware))
);

export default store;
