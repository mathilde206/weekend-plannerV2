import axios from 'axios/index';

function getUserProfile(userId) {
    return axios.get(`/api/users/${userId}/profile/`)
        .then((response) => {
            return response.data;
        });
}

export default getUserProfile;
