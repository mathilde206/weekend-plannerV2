import {
    logoutAction,
} from './logout';

describe('Validate logout actions', () => {
    it('it should return the right actions', () => {
        expect(logoutAction()).toEqual({
            type: 'USERS_LOGOUT',
        });
    });
});
