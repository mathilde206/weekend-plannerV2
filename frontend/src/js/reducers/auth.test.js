import {
    ADD_TO_CART,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    TOKEN_RECEIVED,
    TOKEN_FAILURE,
    LOGOUT
} from '../actions';

import {
    auth,
    getAccessToken,
    getRefreshToken,
    getIsAccessTokenExpired,
    getIsRefreshTokenExpired,
    getIsAuthenticated,
} from './auth';

describe('Validate auth reducer', () => {
    it('it should return the same state for any non related actions', () => {
        expect(auth({}, { type: 'bla bla' })).toEqual({});
    });
    it('it should return the proper state for related actions', () => {
        expect(auth({}, {
            type: LOGIN_REQUEST,
            isLoggingIn: true,
        })).toEqual({
            isLoggingIn: true,
        });
        expect(auth({}, {
            type: LOGIN_SUCCESS,
            access: { token: '123' },
            refresh: { token: '123' }
        })).toEqual({
            access: { token: '123' },
            isLoggingIn: false,
            loggedIn: true,
            refresh: { token: '123' }
        });
        expect(auth({}, {
            type: TOKEN_RECEIVED,
            access: { token: '123' },
            refresh: { token: '123' }
        })).toEqual({
            access: { token: '123' },
            isLoggingIn: false,
            loggedIn: true,
            refresh: { token: '123' }
        });
        expect(auth({}, {
            type: TOKEN_RECEIVED,
            access: { token: '123' },
            refresh: { token: '123' }
        })).toEqual({
            access: { token: '123' },
            isLoggingIn: false,
            loggedIn: true,
            refresh: { token: '123' }
        });
        expect(auth({}, {
            type: LOGIN_FAILURE,
            error: 'an error',
            isLoggingIn: false,
        })).toEqual({
            access: null,
            error: 'an error',
            isLoggingIn: false,
            refresh: null
        });
        expect(auth({}, {
            type: TOKEN_FAILURE,
            error: 'an error',
            isLoggingIn: false,
        })).toEqual({
            access: null,
            error: 'an error',
            isLoggingIn: false,
            refresh: null
        });
        expect(auth({ access: { token: '123' }, refresh: { token: '123' } }, {
            type: LOGOUT,
        })).toEqual({});
    });
    it('it should return the proper authentication value from the state', () => {
        expect(getAccessToken({ access: { token: 'access123' }, refresh: { token: 'refresh123' } }))
            .toEqual('access123');
        expect(getRefreshToken({ access: { token: 'access123' }, refresh: { token: 'refresh123' } }))
            .toEqual('refresh123');
        expect(getIsAccessTokenExpired({ access: { token: 'access123', exp: Date.now + 2000 }, refresh: { token: 'refresh123' } }))
            .toBe(false);
        expect(getIsAccessTokenExpired({ access: { token: 'access123', exp: Date.now - 2000 }, refresh: { token: 'refresh123' } }))
            .toBe(true);
        expect(getIsRefreshTokenExpired({ access: { token: 'access123', exp: Date.now + 2000 }, refresh: { token: 'refresh123', exp: Date.now - 2000 } }))
            .toBe(true);
        expect(getIsRefreshTokenExpired({ access: { token: 'access123', exp: Date.now + 2000 }, refresh: { token: 'refresh123', exp: Date.now + 2000 } }))
            .toBe(false);
        expect(getIsAuthenticated({ access: { token: 'access123', exp: Date.now + 2000 }, refresh: { token: 'refresh123', exp: Date.now + 2000 } }))
            .toBe(true);
    });
});
