import { refreshAccessToken, updateUserProfile } from '../api';
import { accessToken, isAccessTokenExpired, refreshToken } from '../reducers';
import { history } from '../helpers';

const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
const UPDATE_PROFILE_ERROR = 'UPDATE_PROFILE_ERROR';
const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
const RESET_PROFILE_UPDATE = 'RESET_PROFILE_UPDATE';

function updateProfileRequest() {
    return {
        type: UPDATE_PROFILE_REQUEST,
        updating: true,
    };
}

function updateProfileError(error) {
    return {
        type: UPDATE_PROFILE_ERROR,
        error,
        updating: false,
    };
}

function updateProfileSuccess() {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        updated: true,
        updating: false
    };
}

function resetProfileUpdate() {
    return {
        type: RESET_PROFILE_UPDATE,
        updated: false,
        updating: false
    };
}

function updateProfile(formObj) {
    return function updateProfileThunk(dispatch, getState) {
        const state = getState();
        const refresh = refreshToken(state);
        const access = accessToken(state);
        const { user } = state;
        const { id } = user;

        dispatch(updateProfileRequest());

        if (isAccessTokenExpired(state)) {
            refreshAccessToken(refresh)
                .then(({ access }) => {
                    updateUserProfile(id, access.token, formObj)
                        .then(() => {
                            dispatch(updateProfileSuccess());
                        })
                        .catch((error) => {
                            dispatch(updateProfileError(error));
                        });
                });
        } else {
            updateUserProfile(id, access.token, formObj)
                .then(() => {
                    dispatch(updateProfileSuccess());
                })
                .catch((error) => {
                    dispatch(updateProfileError(error));
                });
        }
    };
}

export {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_ERROR,
    RESET_PROFILE_UPDATE,
    resetProfileUpdate,
    updateProfile,
};
