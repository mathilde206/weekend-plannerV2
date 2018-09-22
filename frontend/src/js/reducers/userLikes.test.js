import { RECEIVE_USER_LIKES } from '../actions';
import userLikes from './userLikes';

describe('Validate userOrder reducer', () => {
    it('it should return the same state for any non related actions', () => {
        expect(userLikes({}, { type: 'bla bla' })).toEqual({});
    });
    it('should return the right state for related actions', () => {
        expect(userLikes({}, { type: RECEIVE_USER_LIKES, itinerary_likes: [ 1, 2, 3 ] }))
            .toEqual({ itinerary_likes: [ 1, 2, 3 ] });
    });
});