import { userConstants } from '../constants';
import { userService } from '../services';

let user;

if(localStorage.getItem('auth')){
    const id = JSON.parse(localStorage.getItem('auth')).access.user_id;
    userService.getById(id).then((username) => {
        user = username;
    });
    console.log(user);
}
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
    case userConstants.LOGIN_REQUEST:
        return {
            loggingIn: true,
            user: action.user,
        };
    case userConstants.LOGIN_SUCCESS:
        return {
            loggedIn: true,
            user: action.user,
            token: action.token
        };
    case userConstants.LOGIN_FAILURE:
        return {};
    case userConstants.LOGOUT:
        return {};
    default:
        return state;
    }
}