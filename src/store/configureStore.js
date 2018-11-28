import { createStore, applyMiddleware } from 'redux';

/* Middlewares */
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';

import reducers from '../Reducers';

const middleware = [thunk, promiseMiddleware];
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export default function configureStore(initialState = {}) {
	return createStoreWithMiddleware(reducers, initialState,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}
