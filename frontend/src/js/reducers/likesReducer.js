import {
    RECEIVE_USER_LIKES
} from '../actions';

function userLikesReducer(state = {}, action) {
    switch (action.type) {
    case RECEIVE_USER_LIKES:
        return {
            itinerary_likes: action.itinerary_likes,
        };
    default:
        return state;
    }
}

export default userLikesReducer;


