import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from '../actions';
import registration from './registration';

describe('Validate registration reducer', () => {
    it('it should return the same state for any non related actions', () => {
        expect(registration({}, {type: 'bla bla'})).toEqual({});
    });
    it('should return the right state for related actions', () => {
        expect(registration({}, {
            type: REGISTER_REQUEST,
            registering: true,
            registered: false,
        })).toEqual({
            registering: true,
            registered: false,
        });
        expect(registration({}, {
            type: REGISTER_SUCCESS,
            registering: false,
            registered: true,
        })).toEqual({
            registering: false,
            registered: true,
        });
        expect(registration({}, {
            type: REGISTER_FAILURE,
            registering: false,
            registered: false,
            error: 'an error'
        })).toEqual({
            registering: false,
            registered: false,
            error: 'an error'
        });
    });
});
