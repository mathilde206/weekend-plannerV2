import axios from 'axios/index';

function getUserBillingInfo(userId) {
    return axios.get(`/api/users/${userId}/billing/`)
        .then(response => response.data);
}

export default getUserBillingInfo;
