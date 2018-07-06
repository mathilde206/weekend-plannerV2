// import { apiMiddleware } from 'redux-api-middleware';
// import { applyMiddleware, createStore } from 'redux';
// import { createFilter } from 'redux-persist-transform-filter';
// import { persistReducer, persistStore } from 'redux-persist';
// import { routerMiddleware } from 'react-router-redux';
// import storage from 'redux-persist/es/storage';
// import ReduxThunk from 'redux-thunk';
//
// import middleware from './middlewares';
// import rootReducer from './reducers';
//
// export default (history) => {
//     const persistedFilter = createFilter(
//         'auth', ['access', 'refresh']
//     );
//
//     const reducer = persistReducer(
//         {
//             key: 'root',
//             storage: storage,
//             whitelist: [ 'auth' ],
//             transforms: [ persistedFilter ]
//         },
//         rootReducer
//     );
//
//     const store = createStore(
//         reducer,
//         {},
//         applyMiddleware(
//             ReduxThunk,
//             apiMiddleware,
//             routerMiddleware(history),
//         )
//     );
//
//     persistStore(store);
//
//     return store
// }
//

