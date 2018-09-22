import { RESET_PROFILE_UPDATE, UPDATE_PROFILE_ERROR, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from '../actions';
import profileUpdate from './profileUpdate';

describe('Validate profile update reducer', () => {
    it('it should return the same state for any non related actions', () => {
        expect(profileUpdate({}, { type: 'bla bla' })).toEqual({});
    });
    it('should return the right state for related actions', () => {
        expect(profileUpdate({}, {
            type: UPDATE_PROFILE_REQUEST,
            updating: true,
        })).toEqual({
            updating: true,
        });
        expect(profileUpdate({}, {
            type: UPDATE_PROFILE_SUCCESS,
            updating: false,
            updated: true,
        })).toEqual({
            updating: false,
            updated: true,
        });
        expect(profileUpdate({}, {
            type: UPDATE_PROFILE_ERROR,
            updating: false,
            error: 'an error'
        })).toEqual({
            updating: false,
            error: 'an error'
        });
        expect(profileUpdate({}, {
            type: RESET_PROFILE_UPDATE,
            updating: false,
            updated: false,
        })).toEqual({
            updating: false,
            updated: false,
        });
    });
});
