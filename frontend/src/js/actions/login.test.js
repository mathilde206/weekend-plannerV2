import {
    successLogin,
    requestLogin,
    failureLogin,
} from './login';

describe('Validate login actions', () => {
    it('it should return the right actions', () => {
        expect(requestLogin()).toEqual({
            type: 'USERS_LOGIN_REQUEST',
            isLoggingIn: true,
        });
        expect(failureLogin('an error')).toEqual({
            type: 'USERS_LOGIN_FAILURE',
            error: 'an error',
            isLoggingIn: false,
            access: null,
            refresh: null,
        });
        expect(successLogin({
            access: { accessToken: 'abc123' },
            refresh: { refreshToken: '123abc' }
        })).toEqual({
            type: 'USERS_LOGIN_SUCCESS',
            access: { accessToken: 'abc123' },
            refresh: { refreshToken: '123abc' },
        });
    });
});
