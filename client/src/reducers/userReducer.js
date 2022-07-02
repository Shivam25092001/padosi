import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERROR,
     REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL ,
     LOADUSER_REQUEST, LOADUSER_SUCCESS, LOADUSER_FAIL,
     LOGOUT_SUCCESS, LOGOUT_FAIL,
     UPDATE_AVATAR_REQUEST, UPDATE_AVATAR_SUCCESS, UPDATE_AVATAR_RESET, UPDATE_AVATAR_FAIL,
     UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_RESET, UPDATE_PROFILE_FAIL, } from "../constants/userConstants";

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


export const UpdateAvatarReducer = ( state = { }, action ) => {
    switch(action.type){
        case UPDATE_AVATAR_REQUEST:
            return {
                ...state,
                uploading: true
            };

        case UPDATE_AVATAR_SUCCESS:
        return {
                ...state,
                uploading: false,
                isUpdated: action.payload
            };
       
        case UPDATE_AVATAR_FAIL:
            return {
                ...state,
                uploading: false,
                error: action.payload,
            };

        case UPDATE_AVATAR_RESET:
            return {
                ...state,
                isUpdated: false,
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



export const UpdateProfileReducer = ( state = { }, action ) => {
    switch(action.type){
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            };

        case UPDATE_PROFILE_SUCCESS:
        return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
       
        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case UPDATE_PROFILE_RESET:
            return {
                ...state,
                isUpdated: false,
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