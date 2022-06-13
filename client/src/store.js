import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { supplyReducer, supplyDetailsReducer } from "./reducers/supplyReducer";

const reducer = combineReducers({
    supplies: supplyReducer,
    supplyDetails: supplyDetailsReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;