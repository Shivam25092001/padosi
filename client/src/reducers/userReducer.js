import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERROR,
     REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL ,
     LOADUSER_REQUEST, LOADUSER_SUCCESS, LOADUSER_FAIL,
     LOGOUT_SUCCESS, LOGOUT_FAIL } from "../constants/userConstants";

export const loginReducer = ( state = {user: {}, isAuthenticated: false}, action ) => {
    switch(action.type){
        case LOGIN_REQUEST:
        case REGISTER_REQUEST: 
        case LOADUSER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            };

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOADUSER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case LOGOUT_SUCCESS:
            return{
                loading: false,
                user: {},
                isAuthenticated: false
            };

        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.payload,
                user: {}
            };

        case LOADUSER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload,
                user: {}
            };
        case LOGOUT_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };

        default:
            return {
                ...state
            };
    }
};


