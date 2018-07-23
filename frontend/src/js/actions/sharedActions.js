import { showLoading, hideLoading } from 'react-redux-loading';

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialData()
            .then(response => {
                console.log('getting initial data')
                dispatch(hideLoading);
            });
    };
}