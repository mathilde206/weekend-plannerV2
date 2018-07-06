import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { authHeader } from '../helpers';

export const userService = {
    login,
    logout,
    getById,
    register,
};

function login(username, password) {
    return axios.post('/api/auth/token/obtain/', { username, password })
        .then(({ data }) => {
            const decoded = jwtDecode(data.access);
            const auth = {
                access: {
                    token: data.access,
                    ...jwtDecode(data.access)
                },
                refresh: {
                    token: data.refresh,
                    ...jwtDecode(data.refresh)
                },
                errors: {}
            };

            localStorage.setItem('auth', JSON.stringify(auth));
            return auth;
        }).catch(response => {
            return {
                access: null,
                refresh: null,
                errors: { 'non_field_errors': response.statusText },
            };
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('auth');
}

function getById(id) {
    return axios.get(`/api/users/${id}/`)
        .then((response) => {
            return response.data.username;
        });
}

function register({ username, email, email2, password }) {
    return axios.post('/api/users/register/', {
        username,
        email,
        email2,
        password,
    })
        .then(response => {
            console.log(response);
        });
}

// function update(user) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(), 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };
//
//     return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
// }
//
// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader()
//     };
//
//     return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
// }
