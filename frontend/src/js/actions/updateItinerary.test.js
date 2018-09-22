import {
    requestItineraryUpdate,
    itineraryUpdated,
    itineraryUpdateFailure,
} from './updateItinerary';

describe('Validate update itinerary actions', () => {
    it('it should return the right actions', () => {
        expect(requestItineraryUpdate()).toEqual({
            type: 'REQUEST_ITINERARY_UPDATE',
        });
        expect(itineraryUpdated({ key1: '123', key2: 123 })).toEqual({
            type: 'ITINERARY_UPDATED',
            updated: true,
            data: { key1: '123', key2: 123 },
        });
        expect(itineraryUpdateFailure('an error')).toEqual({
            type: 'ITINERARY_UPDATED_FAILURE',
            djangoError: 'an error',
        });
    });
});
