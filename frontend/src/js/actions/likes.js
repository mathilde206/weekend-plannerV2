import {
    addLike,
    getUserLikes,
    refreshAccessToken,
} from '../api';

import {
    accessToken,
    isAccessTokenExpired,
    refreshToken,
} from '../reducers';

const ERROR_USER_LIKES = 'ERROR_USER_LIKES';
const RECEIVE_USER_LIKES = 'RECEIVE_USER_LIKES';
const REQUEST_USER_LIKES = 'REQUEST_USER_LIKES';

function errorUserItineraryLikes(error) {
    return {
        type: ERROR_USER_LIKES,
        error,
        isFetching: false,
    };
}

function receiveUserItineraryLikes(itinerary_likes) {
    return {
        type: RECEIVE_USER_LIKES,
        itinerary_likes,
        isFetching: false
    };
}

function requestUserItineraryLikes() {
    return {
        type: REQUEST_USER_LIKES,
        isFetching: true,
    };
}

function fetchUserItineraryLikes() {
    return function fetchUserItineraryLikesThunk(dispatch, getState) {
        const { user } = getState();
        const { id } = user;

        dispatch(requestUserItineraryLikes());

        getUserLikes(id)
            .then(({ likes }) => dispatch(receiveUserItineraryLikes(likes)))
            .catch(error => dispatch(errorUserItineraryLikes(error.message.data)));
    };
}

function likeItinerary(slug) {
    return function likeItineraryThunk(dispatch, getState) {
        const state = getState();
        const refresh = refreshToken(state);
        const access = accessToken(state);

        if (isAccessTokenExpired(state)) {
            refreshAccessToken(refresh)
                .then(({ access }) => {
                    addLike(slug, access.token)
                        .then(({ userLikes }) => {
                            dispatch(receiveUserItineraryLikes(userLikes));
                        });
                });
        } else {
            addLike(slug, access)
                .then(({ userLikes }) => {
                    dispatch(receiveUserItineraryLikes(userLikes));
                });
        }
    };
}

export {
    ERROR_USER_LIKES,
    RECEIVE_USER_LIKES,
    REQUEST_USER_LIKES,
    fetchUserItineraryLikes,
    likeItinerary,
};

