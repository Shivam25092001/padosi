import axios from "axios";
import { ALL_SUPPLY_FAIL, ALL_SUPPLY_SUCCESS, ALL_SUPPLY_REQUEST, CLEAR_ERROR, 
    SUPPLY_DETAILS_FAIL, SUPPLY_DETAILS_REQUEST, SUPPLY_DETAILS_SUCCESS, 
    USER_SUPPLY_REQUEST ,USER_SUPPLY_SUCCESS, USER_SUPPLY_FAIL,
    PRICE_FILTER_MIN, PRICE_FILTER_MAX } from "../constants/supplyConstant";

export const getSupply = (keyword="", currentPage=1, price=[PRICE_FILTER_MIN , PRICE_FILTER_MAX], category, rating=0)=> async (dispatch)=>{
    try {
        dispatch({type: ALL_SUPPLY_REQUEST});
        console.log(window.location)
        let fetchURL = `${window.location.origin}/api/v1/supplies?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`;
        
        if(category){
            fetchURL = `${window.location.origin}/api/v1/supplies?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${rating}`;
        }
        const {data} = await axios.get(fetchURL);

        dispatch({
            type: ALL_SUPPLY_SUCCESS,
            payload: data,
        });
    } 
    catch (error) {
        dispatch( {
            type: ALL_SUPPLY_FAIL,
            payload: error.response.data.message
        } );
    }
};

export const getSupplyDetails = (id)=>async (dispatch)=> {
    try{
        dispatch({ type: SUPPLY_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/supplies/${id}`); 

        dispatch({
            type: SUPPLY_DETAILS_SUCCESS,
            payload: data.item,
        });
    } 
    catch (error) {
        dispatch({
            type: SUPPLY_DETAILS_FAIL,
            payload: error
        });
    }
};


export const getUserSupplies = ()=> async (dispatch)=>{
    try{
        dispatch({ type: USER_SUPPLY_REQUEST });

        const { data } = await axios.get(`/api/v1/supplies/me`); 

        dispatch({
            type: USER_SUPPLY_SUCCESS,
            payload: data.supplies,
        });
    }
    catch (error) {
        dispatch({
            type: USER_SUPPLY_FAIL,
            payload: error
        });
    }
}


//clearing errors
export const clearErrors = ()=> async (dispatch) => {
    dispatch( {
        type: CLEAR_ERROR
    } );
}