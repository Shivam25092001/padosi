import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { supplyReducer, supplyDetailsReducer, userSuppliesReducer } from "./reducers/supplyReducer";
import { loginReducer } from "./reducers/userReducer";

const reducer = combineReducers({
    supplies: supplyReducer,
    supplyDetails: supplyDetailsReducer,
    userDetails: loginReducer,
    userSupplies: userSuppliesReducer, 
});

let initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;