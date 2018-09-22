import {
    ITINERARIES_LIST_FAILURE,
    RECEIVE_ITINERARIES_LIST,
    REQUEST_ITINERARIES_LIST
} from '../actions';

function itineraries(state = {}, action) {
    const {
        count,
        itinerariesList,
        navigation,
        total_pages,
        type,
        withQuery,
        error,
    } = action;

    switch (type) {
    case REQUEST_ITINERARIES_LIST:
        return {
            ...state,
            isLoading: true,
        };
    case RECEIVE_ITINERARIES_LIST: {
        return {
            ...state,
            isLoading: false,
            itinerariesList: itinerariesList,
            count: count,
            navigation: navigation,
            total_pages: total_pages,
            withQuery,
        };
    }
    case ITINERARIES_LIST_FAILURE:
        return {
            ...state,
            error,
            isLoading: false,
            withQuery,
        };
    default:
        return state;
    }
}

export default itineraries;
