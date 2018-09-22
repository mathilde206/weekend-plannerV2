import {
    requestItinerariesList,
    itinerariesListFailure,
    receiveItinerariesList,
} from './itinerariesList';

describe('Validate itinerary list actions', () => {
    it('it should return the right actions', () => {
        expect(requestItinerariesList()).toEqual({
            type: 'REQUEST_ITINERARIES_LIST',
            isLoading: true,
        });
        expect(itinerariesListFailure('an error', 'a Query')).toEqual({
            type: 'ITINERARIES_LIST_FAILURE',
            isLoading: false,
            error: 'an error',
            withQuery: true
        });
        expect(receiveItinerariesList({
            results: [ 1, 2, 3 ],
            count: 1,
            navigation: {},
            total_pages: 12
        }, 'a query')).toEqual({
            type: 'RECEIVE_ITINERARIES_LIST',
            itinerariesList: [ 1, 2, 3 ],
            count: 1,
            navigation: {},
            total_pages: 12,
            withQuery: true
        });
    });
});
