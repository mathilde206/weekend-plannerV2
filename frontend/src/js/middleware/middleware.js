import * as reducers from '../reducers';
import { userApi } from '../api/userApi';

export function createApiMiddleware() {
    return ({ dispatch, getState }) => {
        return (next) => (action) => {

            if (typeof action === 'function') {
                const state = getState();
                const token = reducers.refreshToken(state);
                if (token && reducers.isAccessTokenExpired) {
                    return userApi.refreshAccessToken(token)
                        .then(() => next(action));
                }
                return next(action);
            }
            return next(action);
        };
    };
}

export default createApiMiddleware();