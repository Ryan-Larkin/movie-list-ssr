/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';


import { MovieSearch } from './MovieSearch';
import { findMovie, addMovieAndRefresh, closedSearchModal } from '../Actions';

import { CONSTANTS } from '../config';

class MovieSearchContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchValue: '',
			modalIsOpen: false,
		};
	}

	openModal = () => {
		this.setState({ modalIsOpen: true });
	}

	closeModal = () => {
		this.setState({ modalIsOpen: false });
		this.props.closedSearchModal();
	}

	searchForMovie = async () => {
		const { searchValue } = this.state;

		await this.props.findMovie(searchValue);
		this.setState({ searchValue: '' });
		if (this.props.searchResults.length) {
			this.openModal();
		}
	}

	handleSearchInput = (e) => {
		e.preventDefault();

		if (e.keyCode === CONSTANTS.ENTER) {
			this.searchForMovie();
		}
	}

	addMovie = ({ apiID, title, poster, overview }) => {
		this.props.addMovieAndRefresh({ apiID, title, poster, overview });
		this.closeModal();
	}

	handleTyping = (e) => { this.setState({ searchValue: e.target.value }); }

	render() {
		const { searchValue, modalIsOpen } = this.state;

		return (
			<MovieSearch
				searchValue={searchValue}
				handleSearchInput={this.handleSearchInput}
				handleTyping={this.handleTyping}
				addMovie={this.addMovie}
				searchForMovie={this.searchForMovie}
				searchResults={this.props.searchResults}
				modalIsOpen={modalIsOpen}
				closeModal={this.closeModal}
			/>
		);
	}
}


function mapStateToProps(state) {
	return {
		searchResults: state.searchResults,
		addingMovie: state.addingMovie,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		findMovie: searchValue => dispatch(findMovie(searchValue)),
		addMovieAndRefresh: ({ apiID, title, poster, overview }) => {
			dispatch(addMovieAndRefresh({ apiID, title, poster, overview }));
		},
		closedSearchModal: () => dispatch(closedSearchModal()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchContainer);
