import { applyMiddleware } from 'redux';
import apiMiddleware from './createApiMiddleware';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

export default applyMiddleware(
    apiMiddleware,
    routerMiddleware(history),
    thunk
);