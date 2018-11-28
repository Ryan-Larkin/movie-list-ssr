/* eslint-disable promise/always-return */
import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { Provider as ReduxProvider } from 'react-redux';

import App from './App';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';

import './scss/style.scss';
import 'react-toastify/dist/ReactToastify.min.css';

const store = configureStore(window.REDUX_STATE || {});

const renderMethod = !!module.hot ? ReactDOM.render : ReactDOM.hydrate;

const AppBundle = (
	<ReduxProvider store={store}>
		<App />
	</ReduxProvider>
);

window.onload = () => {
	Loadable.preloadReady().then(() => {
		renderMethod(
			AppBundle,
			document.getElementById('root'),
		);
	}).catch(err => err);
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
