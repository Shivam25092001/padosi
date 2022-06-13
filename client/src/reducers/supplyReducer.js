import { ALL_SUPPLY_FAIL, ALL_SUPPLY_SUCCESS, ALL_SUPPLY_REQUEST, CLEAR_ERROR,
    SUPPLY_DETAILS_REQUEST, SUPPLY_DETAILS_SUCCESS, SUPPLY_DETAILS_FAIL } from "../constants/supplyConstant";

export const supplyReducer = ((state = {supplies: []}, action)=>{

    switch(action.type){
        case ALL_SUPPLY_REQUEST:
            return {
                loading: true,
                supplies: [],
                supplyCount : 0,
                supplyperPage : 0,
                filteredSuppliesCount : 0
            }
        
        case ALL_SUPPLY_SUCCESS:
            return {
                loading: false,
                supplies: action.payload.supplies,
                supplyCount : action.payload.supplycount,
                supplyperPage : action.payload.suppliesperPage,
                filteredSuppliesCount : action.payload.filteredSuppliesCount
            }

        case ALL_SUPPLY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
});

export const supplyDetailsReducer = ((state = {supply: {}}, action)=>{

    switch(action.type){
        case SUPPLY_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            }
        
        case SUPPLY_DETAILS_SUCCESS:
            return {
                loading: false,
                supply: action.payload,
            }

        case SUPPLY_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }

        default:
            return state;
    }
});