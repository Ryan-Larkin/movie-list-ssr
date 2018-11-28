import React, { Component } from 'react';
import Loadable from 'react-loadable';

import './App.css';

function Loading(props) {
	const { retry } = props;

	/* eslint-disable no-else-return */
	if (props.error) {
		return <div>Error! <button type="button" onClick={retry}>Retry</button></div>;
	} else if (props.timedOut) {
		return <div>Taking a long time... <button type="button" onClick={retry}>Retry</button></div>;
	} else if (props.pastDelay) {
		return <div>Loading...</div>;
	} else {
		return null;
	}
	/* eslint-enable no-else-return */
}

const AsyncComponent = Loadable({
	loader: () => import(/* webpackChunkName: "moviesIndexChunk" */ './Components/MoviesIndex'),
	loading: Loading,
	delay: 200,
	timeout: 10000,
	modules: ['moviesIndexChunk'],
});

/* eslint-disable react/prefer-stateless-function */
class App extends Component {
	render() {
		return (
			<div className="App">
				<AsyncComponent />
			</div>
		);
	}
}
/* eslint-enable react/prefer-stateless-function */

export default App;
