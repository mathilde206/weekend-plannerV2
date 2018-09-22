import {
    ITINERARIES_LIST_FAILURE,
    RECEIVE_ITINERARIES_LIST,
    REQUEST_ITINERARIES_LIST
} from '../actions';
import itineraries from './itineraries';

describe('Validate itineraries reducer', () => {
    it('it should return the same state for any non related actions', () => {
        expect(itineraries({}, { type: 'bla bla' })).toEqual({});
    });
    it('should return the right state for related actions', () => {
        expect(itineraries({}, {
            type: REQUEST_ITINERARIES_LIST,
        })).toEqual({
            isLoading: true,
        });
        expect(itineraries({}, {
            type: RECEIVE_ITINERARIES_LIST,
            itinerariesList: [ 1, 2, 3 ],
            navigation : {},
            count: 100,
            total_pages: 12,
            withQuery: true
        })).toEqual({
            itinerariesList: [ 1, 2, 3 ],
            count: 100,
            navigation: {},
            total_pages: 12,
            withQuery: true,
            isLoading: false,
        });
        expect(itineraries({}, {
            type: ITINERARIES_LIST_FAILURE,
            error: 'an error',
            withQuery: true,
        })).toEqual({
            isLoading: false,
            error: 'an error',
            withQuery: true,
        });
    });
});
