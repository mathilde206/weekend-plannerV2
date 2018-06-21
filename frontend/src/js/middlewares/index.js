import { applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

export default applyMiddleware(
        apiMiddleware,
        routerMiddleware(history),
        thunk
    );