import { logout } from '../api';

const LOGOUT = 'USERS_LOGOUT';

function logoutAction() {
    logout();
    return {
        type: LOGOUT
    };
}

export {
    LOGOUT,
    logoutAction,
}