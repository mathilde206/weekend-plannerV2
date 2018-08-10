import { showLoading, hideLoading } from 'react-redux-loading';
import {getInitialData} from '../helpers';

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialData()
            .then(response => {
                dispatch(hideLoading);
            });
    };
}