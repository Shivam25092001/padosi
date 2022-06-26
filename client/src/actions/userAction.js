import axios from "axios";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERROR,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL,
    LOADUSER_REQUEST, LOADUSER_SUCCESS, LOADUSER_FAIL,
    LOGOUT_SUCCESS, LOGOUT_FAIL } from "../constants/userConstants";

export const login = (email, password) => async (dispatch)=>{
    try {
        dispatch({type: LOGIN_REQUEST});

        const config = { headers: { "Content-Type": "application/json" } };

        const {data} = await axios.post(
            '/api/v1/login',
            { email, password },
            config
        );

        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    }
     catch(error) {
        dispatch({type: LOGIN_FAIL, payload: error.response.data.message });
    }
}


export const register = (userdata) => async (dispatch) =>{
    try {
        dispatch({ type: REGISTER_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data"} };

        const {data} = await axios.post(
            '/api/v1/register',
            userdata,
            config
        );

        dispatch( {type: REGISTER_SUCCESS, payload: data.user } );
    } catch (error) {
        dispatch({type: REGISTER_FAIL, payload: error.response.data.message });
    }
}


export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOADUSER_REQUEST});

        const {data} = await axios.get('/api/v1/me');

        dispatch( { type: LOADUSER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({type: LOADUSER_FAIL, payload: error.response.data.message });
    }
}


export const logoutUser = () => async (dispatch) => {
    try {
         await axios.get('/api/v1/logout');

        dispatch( { type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({type: LOGOUT_FAIL, payload: error.response.data.message });
    }
}


//clearing errors
export const clearErrors = ()=> async (dispatch) => {
    dispatch( {
        type: CLEAR_ERROR
    } );
}