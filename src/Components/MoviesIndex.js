import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer } from 'react-toastify-redux';

import { fetchMovies } from '../Actions';
import MovieItemContainer from './MovieItemContainer';
import MovieSearchContainer from './MovieSearchContainer';

import { CONSTANTS } from '../config';

const ToastMessage = ({ message }) => (
	<div className="toast">
		<div className="message">{message}</div>
	</div>
);

class MoviesIndex extends Component {
	constructor() {
		super();

		this.state = {};
	}

	componentDidMount() {
		this.props.fetchMovies(); /* eslint-disable-line */
	}

	render() {
		const { movies, isFetching } = this.props;

		return (
			<div className="app">
				<MovieSearchContainer />

				<div className="movie-index">
					{
						(isFetching && !movies.length)
							? <p>Loading...</p>
							: _.map(movies, movie => (
								<MovieItemContainer
									key={movie.apiID}
									title={movie.title}
									poster={movie.poster}
									apiID={movie.apiID}
									dbID={movie._id} /* eslint-disable-line */
								/>
							))
					}
				</div>

				<ToastContainer
					toastComponent={ToastMessage}
					position={CONSTANTS.BOTTOM_CENTER}
					autoClose={2500}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		movies: state.movies,
		isFetching: state.isFetching,
		toasts: state.toasts,
	};
}

export default connect(mapStateToProps, { fetchMovies })(MoviesIndex);
