
import axios from 'axios';

// import { dismiss, update, error, message, warning, success, info } from 'react-toastify-redux';
import { dismiss, error, success, warning } from 'react-toastify-redux';

import * as types from './types';

import { API_HOST, MOVIE_API_URL, MOVIE_API_KEY } from '../config';

import api from '../Api';

const beginFetching = () => ({ type: types.FETCHING_MOVIES });
const receivedMovies = () => ({ type: types.RECEIVED_MOVIES });

function fetchMoviesFromDB() {
	const request = axios.get(`${API_HOST}/movies`);

	return {
		type: types.FETCH_MOVIES,
		payload: request,
	};
}

export function fetchMovies() {
	return (dispatch) => {
		dispatch(beginFetching());

		return dispatch(fetchMoviesFromDB()).then(() => (
			dispatch(receivedMovies())
		));
	};
}

const beginSearching = () => ({ type: types.SEARCHING_MOVIES });
const doneSearching = () => ({ type: types.DONE_SEARCHING });

const searchMovieAPI = request => ({ type: types.FIND_MOVIE, payload: request });

export const closedSearchModal = () => ({
	type: types.CLOSED_SEARCH_MODAL,
	payload: { data: { results: {} } },
});

export function findMovie(movieTitle) {
	return (dispatch) => {
		if (movieTitle) {
			dispatch(beginSearching());

			const url = `${MOVIE_API_URL}?query=${movieTitle}&api_key=${MOVIE_API_KEY}&language=en-US&page=1`;
			const request = axios.get(url);

			return dispatch(searchMovieAPI(request)).then((res) => {
				if (res.payload.data.total_results === 0) {
					dispatch(error(`${movieTitle} could not be found`));
				}
				dispatch(doneSearching());
				return res;
			});
		}

		dispatch(dismiss());
		dispatch(warning('Please enter a movie title'));

		// The Movie API doesn't allow for blank searches, so if no search term is entered
		// we just return an imitation blank search result without making an actual request
		return dispatch(searchMovieAPI({ data: { results: {} } }));
	};
}

export function addMovieAndRefresh({ apiID, title, poster, overview }) {
	const movieData = { apiID, title, poster, overview };

	return dispatch => (
		api.addMovieToDB(movieData).then((res) => {
			dispatch(dismiss());
			if (res.data.wasFound) {
				dispatch(error(`${res.data.title} is already added`));
				return res;
			}
			dispatch(success(`${res.data.title} was successfully added`));
			dispatch(fetchMovies());
			return res;
		})
	);
}

export function removeMovieAndRefresh(movieID, title) {
	return dispatch => (
		api.removeMovieFromDB(movieID).then((res) => {
			dispatch(dismiss());
			if (res.ok) {
				dispatch(success(`${title} was successfully removed`));
				return dispatch(fetchMovies());
			}

			dispatch(error(`Could not remove ${title}`));
			return res;
		})
	);
}
