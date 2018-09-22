import {
    requestUserData,
    retreiveUserData,
    errorUserData,
} from './userData';

describe('Validate update user data actions', () => {
    it('it should return the right actions', () => {
        expect(requestUserData()).toEqual({
            type: 'GET_USER_REQUEST',
            isFetching: true
        });
        expect(retreiveUserData('mathilde', 1)).toEqual({
            type: 'GET_USER_SUCCESS',
            isFetching: false,
            user: 'mathilde',
            id: 1,
        });
        expect(errorUserData('an error')).toEqual({
            type: 'GET_USER_FAILURE',
            isFetching: false,
            error: 'an error',
        });
    });
});
