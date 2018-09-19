import { getUsername } from '../api';

const GET_USER_REQUEST = 'GET_USER_REQUEST';
const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const GET_USER_FAILURE = 'GET_USER_FAILURE';

function requestUserData() {
    return {
        type: GET_USER_REQUEST,
        isFetching: true,
    };
}

function retreiveUserData(user, id) {
    return {
        type: GET_USER_SUCCESS,
        isFetching: false,
        user,
        id,
    };
}

function errorUserData(error) {
    return {
        type: GET_USER_SUCCESS,
        isFetching: false,
        error: error,
    };
}

function fetchUserData(id) {
    return function fetchUserThunk(dispatch) {
        dispatch(requestUserData());

        getUsername(id)
            .then((user) => {
                dispatch(retreiveUserData(user, id));
            })
            .catch((error) => {
                dispatch(errorUserData(error.message.data));
            });
    };
}

export {
    GET_USER_SUCCESS,
    GET_USER_REQUEST,
    GET_USER_FAILURE,
    fetchUserData,
};
