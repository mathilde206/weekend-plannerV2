import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { createFilter } from 'redux-persist-transform-filter';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import { createLogger } from 'redux-logger';

import rootReducer from './reducers';
import { App } from './containers';

const loggerMiddleware = createLogger();
const history = createHistory();

const reducer = persistReducer(
    {
        key: 'store',
        storage,
        whitelist: [ 'auth', 'cart' ],
    },
    rootReducer
);

const store = createStore(
    reducer,
    applyMiddleware(
        thunk,
        loggerMiddleware,
        routerMiddleware(history)
    )
);

let persistor = persistStore(store);


ReactDOM.render((
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </PersistGate>
    </Provider>), document.getElementById('root'));
