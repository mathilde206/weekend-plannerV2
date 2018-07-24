export function getAuthToken() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('auth'));

    if (user && user.access && user.access.token) {
        return user.access.token;
    }
}