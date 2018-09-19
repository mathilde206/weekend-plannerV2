import { getFilteredItineraryList, getItineraryList } from '../api';

const REQUEST_ITINERARIES_LIST = 'REQUEST_ITINERARIES_LIST';
const RECEIVE_ITINERARIES_LIST = 'RECEIVE_ITINERARIES_LIST';
const ITINERARIES_LIST_FAILURE = 'ITINERARIES_LIST_FAILURE';

function requestItinerariesList() {
    return {
        type: REQUEST_ITINERARIES_LIST,
        isLoading: true,
    };
}

function itinerariesListFailure(error, query) {
    return {
        type: ITINERARIES_LIST_FAILURE,
        isLoading: false,
        error,
        withQuery: Boolean(query)
    };
}

function receiveItinerariesList(data, query='') {
    return {
        type: RECEIVE_ITINERARIES_LIST,
        itinerariesList: data.results,
        count: data.count,
        navigation: data.navigation,
        total_pages: data.total_pages,
        withQuery: Boolean(query)
    };
}

function fetchItineraries(page=1, query = '') {
    return function fetchItinerariesThunk(dispatch) {
        dispatch(requestItinerariesList());

        getItineraryList(page, query)
            .then((response) => {
                dispatch(receiveItinerariesList(response, query));
            })
            .catch(error => dispatch(itinerariesListFailure(error, query)));
    };
}

function fetchFilteredItineraries(page=1, query = '') {
    return function fetchFilteredItinerariesThunk(dispatch) {
        dispatch(requestItinerariesList());

        getFilteredItineraryList(1, query)
            .then((response) => {
                dispatch(receiveItinerariesList(response, query));
            })
            .catch(error => dispatch(itinerariesListFailure(error.message.data, query)));
    };
}

export {
    ITINERARIES_LIST_FAILURE,
    REQUEST_ITINERARIES_LIST,
    RECEIVE_ITINERARIES_LIST,
    fetchItineraries,
    fetchFilteredItineraries
};
