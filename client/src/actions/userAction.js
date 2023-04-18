import axios from "axios";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERROR,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL,
    LOADUSER_REQUEST, LOADUSER_SUCCESS, LOADUSER_FAIL,
    LOGOUT_SUCCESS, LOGOUT_FAIL,
    UPDATE_AVATAR_REQUEST, UPDATE_AVATAR_SUCCESS, UPDATE_AVATAR_FAIL, 
    UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, 
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL } from "../constants/userConstants";


export const login = (email, password) => async (dispatch)=>{
    try {
        dispatch({type: LOGIN_REQUEST});

        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

        const {data} = await axios.post(
            // 'http://localhost:5000/api/v1/login',
            'https://padosi-apiv1.onrender.com/api/v1/login',
            { email, password },
            config
        );

        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    }
     catch(error) {
        dispatch({type: LOGIN_FAIL, payload: error });
    }
}


export const register = (userdata) => async (dispatch) =>{
    try {
        dispatch({ type: REGISTER_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data"} };

        const {data} = await axios.post(
            //'/api/v1/register',
            'https://padosi-apiv1.onrender.com/api/v1/register',
            userdata,
            config
        );

        dispatch( {type: REGISTER_SUCCESS, payload: data.user } );
    } catch (error) {
        dispatch({type: REGISTER_FAIL, payload: error });
    }
}

export const editAvatar = (userdata)=> async (dispatch) =>{
    try {
        dispatch({ type: UPDATE_AVATAR_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data"} };
        
        const {data} = await axios.put(
            'https://padosi-apiv1.onrender.com/api/v1/me/update',
            userdata,
            config
        );

        dispatch( {type: UPDATE_AVATAR_SUCCESS, payload: data.success } );
    } catch (error) {
        dispatch({type: UPDATE_AVATAR_FAIL, payload: error});
    }
}


export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOADUSER_REQUEST});

        const {data} = await axios.get('https://padosi-apiv1.onrender.com/api/v1/me');

        dispatch( { type: LOADUSER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({type: LOADUSER_FAIL, payload: error });
    }
}


export const logoutUser = () => async (dispatch) => {
    try {
         await axios.get('https://padosi-apiv1.onrender.com/api/v1/logout');

        dispatch( { type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({type: LOGOUT_FAIL, payload: error });
    }
}


export const editProfile = (userdata)=> async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST});

        const config = { headers: { "Content-Type": "application/json" } };

        const {data} = await axios.put(
            'https://padosi-apiv1.onrender.com/api/v1/me/update',
            userdata,
            config
        );

        dispatch( {type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch( {type: UPDATE_PROFILE_FAIL, payload: error});
    }
}


export const editPassword = (passwords)=> async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST});

        const config = { headers: { "Content-Type": "application/json" } };

        const {data} = await axios.put(
            'https://padosi-apiv1.onrender.com/api/v1/password/update',
            passwords,
            config
        );

        dispatch( {type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch( {type: UPDATE_PASSWORD_FAIL, payload: error});
    }
}


export const forgotPassword = (email)=> async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const {data} = await axios.post(
            'https://padosi-apiv1.onrender.com/api/v1/password/forgot',
            email,
            config
        );
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    }
    catch(error){
        dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error });
    }
}


export const resetPassword = (token, password, confirmPassword)=> async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const {data} = await axios.post(
            `https://padosi-apiv1.onrender.com/api/v1/password/reset/${token}`,
            { password, confirmPassword },
            config
        );
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.user });
    }
    catch(error){
        dispatch({ type: RESET_PASSWORD_FAIL, payload: error });
    }
}

//clearing errors
export const clearErrors = ()=> async (dispatch) => {
    dispatch( {
        type: CLEAR_ERROR
    } );
}