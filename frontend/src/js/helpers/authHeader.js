function getAuthToken() {
    // return authorization header with jwt token
    if (localStorage.getItem('persist:auth')
        && JSON.parse(JSON.parse(localStorage.getItem('persist:auth')).auth).access
    )
        return JSON.parse(JSON.parse(localStorage.getItem('persist:auth')).auth).access.token;
};

export default getAuthToken;