/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { removeMovieAndRefresh } from '../Actions';
import { POSTER_SIZES } from '../config';

import { MovieItem } from './MovieItem';

class MovieItemContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalIsOpen: false,
		};
	}

	openModal = () => {
		this.setState({ modalIsOpen: true });
	}

	closeModal = () => {
		this.setState({ modalIsOpen: false });
	}

	removeMovie = (movieID, title) => {
		this.props.removeMovieAndRefresh(movieID, title);
		this.closeModal();
	}

	render() {
		const { title, dbID, poster } = this.props;
		const { modalIsOpen } = this.state;

		return (
			<MovieItem
				posterSrc={`${POSTER_SIZES.W342}${poster}`}
				title={title}
				openModal={this.openModal}
				modalIsOpen={modalIsOpen}
				closeModal={this.closeModal}
				removeMovie={this.removeMovie}
				dbID={dbID}
			/>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		removeMovieAndRefresh: (movieID, title) => {
			dispatch(removeMovieAndRefresh(movieID, title));
		},
	};
}

export default connect(null, mapDispatchToProps)(MovieItemContainer);
