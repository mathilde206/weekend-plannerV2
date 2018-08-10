const ALERT_SUCCESS = 'ALERT_SUCCESS';
const ALERT_ERROR = 'ALERT_ERROR';
const ALERT_CLEAR = 'ALERT_CLEAR';

function alertSuccessAction(message) {
    return {
        type: ALERT_SUCCESS,
        message
    };
}

function alertErrorAction(message) {
    return {
        type: ALERT_ERROR,
        message
    };
}

function alertClearAction() {
    return {
        type: ALERT_CLEAR
    };
}

export {
    ALERT_CLEAR,
    ALERT_ERROR,
    ALERT_SUCCESS,
    alertClearAction,
    alertErrorAction,
    alertSuccessAction,
};
