
import {legacy_createStore as createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { listOdeljenjaReducers ,deleteOdeljenjaReducers,OdeljenjaDetailsReducers,odeljenjeCreateReducer,odeljenjeUpdateReducer} from './reducers/odeljenjaReducers'
import {composeWithDevTools} from 'redux-devtools-extension'

const reducer=combineReducers({
odeljenjaList:listOdeljenjaReducers,
odeljenjaDelete:deleteOdeljenjaReducers,
odeljenjaDetails:OdeljenjaDetailsReducers,
odeljenjaCreate:odeljenjeCreateReducer,
odeljenjaUpdate:odeljenjeUpdateReducer

})


const userInfoFromStorage=
localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')):null

const initialState={

korisnickiLogin:{userInfo:userInfoFromStorage}
 
}
const middleaware=[thunk]


const store=createStore(reducer,initialState,
    composeWithDevTools(applyMiddleware(...middleaware)))



    export default store;