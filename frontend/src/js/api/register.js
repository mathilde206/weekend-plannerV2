import axios from 'axios/index';

function register({ username, email, email2, password }) {
    return axios.post('/api/users/register/', {
        username,
        email,
        email2,
        password,
    }).then(response => response.data);
}

export default register;
