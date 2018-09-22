import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGOUT } from '../actions';
import user from './user';

describe('Validate user reducer', () => {
    it('it should return the same state for any non related actions', () => {
        expect(user({}, { type: 'bla bla' })).toEqual({});
    });
    it('should return the right state for related actions', () => {
        expect(user({}, {
            type: GET_USER_REQUEST,
            isFetching: true,
        })).toEqual({ isFetching: true });
        expect(user({}, {
            type: GET_USER_SUCCESS,
            isFetching: false,
            user: 'bob',
            id: 1,
        })).toEqual({
            isFetching: false,
            user: 'bob',
            id: 1,
        });
        expect(user({}, {
            type: GET_USER_FAILURE,
            isFetching: false,
            error: 'an error'
        })).toEqual({
            isFetching: false,
            error: 'an error'
        });
        expect(user({}, { type: LOGOUT})).toEqual({});
    });
});
