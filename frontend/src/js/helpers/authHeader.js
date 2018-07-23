export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('auth'));

    if (user && user.access && user.access.token) {
        return { 'Authorization': 'Bearer ' + user.access.token };
    } else {
        return {};
    }
}