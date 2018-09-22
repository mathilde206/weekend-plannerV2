import {
    UPDATE_CITY_REQUEST,
    UPDATE_CITY_SUCCESS,
    UPDATE_CITY_ERROR,
    UPDATE_CITY_RESET,
} from '../actions';
import cityUpdate from './city';

describe('Validate city reducer', () => {
    it('it should return the same state for any non related actions', () => {
        expect(cityUpdate({}, { type: 'bla bla' })).toEqual({});
    });
    it('should return the right state for related actions', () => {
        expect(cityUpdate({}, {
            type: UPDATE_CITY_REQUEST,
            isLoading: true,
        })).toEqual({
            isLoading: true,
        });
        expect(cityUpdate({}, {
            type: UPDATE_CITY_SUCCESS,
            city: 'Paris',
            updated: true,
            isLoading: false,
        })).toEqual({
            city: 'Paris',
            updated: true,
            isLoading: false,
        });
        expect(cityUpdate({}, {
            type: UPDATE_CITY_ERROR,
            updated: false,
            isLoading: false,
            error: 'an error'
        })).toEqual({
            updated: false,
            isLoading: false,
            error: 'an error'
        });
        expect(cityUpdate({update: true}, {
            type: UPDATE_CITY_RESET,
        })).toEqual({
        });
    });
});
