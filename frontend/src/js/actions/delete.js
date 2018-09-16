import {
    deleteApi,
} from '../api';


const DELETE_REQUEST = 'USERS_DELETE_REQUEST';
const DELETE_SUCCESS = 'USERS_DELETE_SUCCESS';
const DELETE_FAILURE = 'USERS_DELETE_FAILURE';


const PROFILE_UPDATE_SUBMITTED = 'PROFILE_UPDATE_SUBMITTED';
const PROFILE_UPDATED = 'PROFILE_UPDATED';

function deleteAction(id) {
    function request(id) {
        return { type: DELETE_REQUEST, id };
    }

    function success(id) {
        return { type: DELETE_SUCCESS, id };
    }

    function failure(id, error) {
        return { type: DELETE_FAILURE, id, error };
    }

    return dispatch => {
        dispatch(request(id));

        //TODO: add the api to delete a user
        deleteApi(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };
}

export {
    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAILURE,
    deleteAction,
};
