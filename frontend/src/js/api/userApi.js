import axios from 'axios';
import jwtDecode from 'jwt-decode';

function getUsername(id) {
    return axios.get(`/api/users/${id}/`)
        .then((response) => {
            return response.data.username;
        });
}

function login(username, password) {
    return axios.post('/api/auth/token/obtain/', { username, password })
        .then(({ data }) => {
            const decoded = jwtDecode(data.access);
            return {
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
        }).catch(response => ({
            access: null,
            refresh: null,
            errors: { 'non_field_errors': response.statusText },
        }));
}

function refreshAccessToken(token) {
    return axios.post('/api/auth/token/refresh/', { refresh: token })
        .then(({ data }) => {
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


function register({ username, email, email2, password }) {
    return axios.post('/api/users/register/', {
        username,
        email,
        email2,
        password,
    }).then(response => response.data);
}

function getUserLikes(userId) {
    return axios.get(`/api/users/${userId}/getLikes/`)
        .then(response => response.data);
}


function getUserProfile(userId) {
    return axios.get(`/api/users/${userId}/profile/`)
        .then((response) => {
            return response.data;
        });
}

function updateUserProfile(userId, token, formObj) {
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'multipart/form-data'
        },
        data: formObj,
        url: `/api/users/${userId}/profile/edit/`,
    };
    return axios(options)
        .then(response => response.data);
}


function getUserBillingInfo(userId) {
    return axios.get(`/api/users/${userId}/billing/`)
        .then(response => response.data);
}

function updateBillingInfo(userId, token, formObj) {
    const options = {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'multipart/form-data'
        },
        data: formObj,
        url: `/api/users/${userId}/billing/edit/`,
    };
    return axios(options)
        .then(response => response.data);
}

function getUserOrders(token) {
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'multipart/form-data'
        },
        url: '/api/checkout/user/orders',
    };
    return axios(options)
        .then(response => response.data);
}

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader()
//     };
//
//     return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
// }

export {
    getUsername,
    getUserProfile,
    login,
    logout,
    register,
    refreshAccessToken,
    updateUserProfile,
    getUserLikes,
    getUserBillingInfo,
    updateBillingInfo,
    getUserOrders
};
