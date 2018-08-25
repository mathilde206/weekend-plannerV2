const RECEIVE_USER_LIKES = 'RECEIVE_USER_LIKES';

function receiveUserItineraryLikes(itinerary_likes) {
    return {
        type: RECEIVE_USER_LIKES,
        itinerary_likes,
    };
}

export {
    RECEIVE_USER_LIKES,
    receiveUserItineraryLikes,
};

