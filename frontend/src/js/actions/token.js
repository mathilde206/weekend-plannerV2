import  { refreshAccessToken } from '../api';

const TOKEN_REQUEST = 'TOKEN_REQUEST';
const TOKEN_RECEIVED = 'TOKEN_RECEIVED';
const TOKEN_FAILURE = 'TOKEN_FAILURE';

function requestAccessToken() {
    return {
        type: TOKEN_REQUEST,
    };
}

function accessTokenReceived(token) {
    return {
        type: TOKEN_RECEIVED,
        token: token.access,
    };
}

function accessTokenError(error) {
    return {
        type: TOKEN_FAILURE,
        error
    };
}

function refreshAccessAction(refreshToken) {
    return function refreshAccessActionThunk(dispatch) {
        dispatch(requestAccessToken(refreshToken));

        refreshAccessToken(refreshToken)
            .then(({ accessToken }) => {
                dispatch(accessTokenReceived(accessToken));
            })
            .catch(error => {
                dispatch(accessTokenError(error.toString()));
            });
    };
}

export {
    TOKEN_REQUEST,
    TOKEN_RECEIVED,
    TOKEN_FAILURE,
    refreshAccessAction,
};
