import {
    registerRequest,
    registerFailure,
    registerSuccess,
} from './register';

describe('Validate register actions', () => {
    it('it should return the right actions', () => {
        expect(registerRequest(2)).toEqual({
            type: 'USERS_REGISTER_REQUEST',
            user: 2,
            registering: true,
            registered: false,
        });
        expect(registerFailure('an error')).toEqual({
            type: 'USERS_REGISTER_FAILURE',
            error: 'an error',
            registering: false,
            registered: false,
        });
        expect(registerSuccess(2)).toEqual({
            type: 'USERS_REGISTER_SUCCESS',
            user: 2,
            registering: false,
            registered: true,
        });
    });
});
