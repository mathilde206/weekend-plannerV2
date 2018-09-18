import axios from 'axios/index';

function getUserLikes(userId) {
    return axios.get(`/api/users/${userId}/getLikes/`)
        .then(response => response.data);
}

export default getUserLikes;
