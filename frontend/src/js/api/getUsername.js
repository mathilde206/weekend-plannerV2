import axios from 'axios/index';

function getUsername(id) {
    return axios.get(`/api/users/${id}/`)
        .then((response) => {
            return response.data.username;
        });
}

export default getUsername;
