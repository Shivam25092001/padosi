import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { supplyReducer, supplyDetailsReducer, userSuppliesReducer } from "./reducers/supplyReducer";
import { forgotPasswordReducer, loginReducer, resetPasswordReducer, UpdateAvatarReducer, UpdateProfileReducer } from "./reducers/userReducer";

const reducer = combineReducers({
    supplies: supplyReducer,
    supplyDetails: supplyDetailsReducer,
    userDetails: loginReducer,
    userSupplies: userSuppliesReducer, 
    editAvatar: UpdateAvatarReducer,
    editProfile: UpdateProfileReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;