import {
    RECEIVE_USER_LIKES
} from '../actions';

function userLikes(state = {}, action) {
    switch (action.type) {
    case RECEIVE_USER_LIKES:
        return {
            ...state,
            itinerary_likes: action.itinerary_likes,
        };
    default:
        return state;
    }
}

export default userLikes;


