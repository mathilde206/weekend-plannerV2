import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';

import App from './containers/App/App';
import configureStore from './store';

const history = createHistory();

const store = configureStore(history);

ReactDOM.render((
    <Provider store={store}>
        <App history={history}/>
    </Provider>), document.getElementById('root'));
