import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getAuthToken } from '../helpers/authHeader';

export const userApi = {
    login,
    logout,
    getUsername,
    register,
    refreshAccessToken,
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
            // localStorage.setItem('auth', JSON.stringify(auth));
            return auth;
        }).catch(response => ({
            access: null,
            refresh: null,
            errors: { 'non_field_errors': response.statusText },
        }));
}

function refreshAccessToken(token) {
    return axios.post('/api/auth/token/refresh/', { refresh: token })
        .then(({ data }) => {
            console.log(data);
            return ({
                access: {
                    token: data.access,
                    ...jwtDecode(data.access)
                }
            }
            );
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('persist:auth');
}

function getUsername(id) {
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
    }).then(response => response.data);
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
