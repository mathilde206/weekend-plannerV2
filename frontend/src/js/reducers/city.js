import {
    UPDATE_CITY_REQUEST,
    UPDATE_CITY_SUCCESS,
    UPDATE_CITY_ERROR,
    UPDATE_CITY_RESET,
} from '../actions';

function cityUpdate(state={}, action) {
    const{
        city,
        isLoading,
        error,
        type,
        updated,
    } = action;

    switch (type){
        case UPDATE_CITY_REQUEST:
            return {
                isLoading,
            }
        case UPDATE_CITY_ERROR:
            return {
                updated,
                isLoading,
                error,
            };
        case UPDATE_CITY_SUCCESS:
            return {
                city,
                updated,
                isLoading
            };
        case UPDATE_CITY_RESET:{
            return {}
        }
        default:
            return state;
    }
}
