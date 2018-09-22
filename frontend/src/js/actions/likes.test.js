import {
    errorUserItineraryLikes,
    receiveUserItineraryLikes,
    requestUserItineraryLikes
} from './likes';

describe('Validate itinerary likes actions', () => {
    it('it should return the right actions', () => {
        expect(requestUserItineraryLikes()).toEqual({
            type: 'REQUEST_USER_LIKES',
            isFetching: true,
        });
        expect(errorUserItineraryLikes('an error')).toEqual({
            type: 'ERROR_USER_LIKES',
            isFetching: false,
            error: 'an error',
        });
        expect(receiveUserItineraryLikes([ 1,2,3 ])).toEqual({
            type: 'RECEIVE_USER_LIKES',
            itinerary_likes: [ 1,2,3 ],
            isFetching: false,
        });
    });
});
