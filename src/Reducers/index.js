import { combineReducers } from 'redux';
import _ from 'lodash';
import { toastsReducer as toasts } from 'react-toastify-redux';

import * as types from '../Actions/types';

const movies = (state = {}, action) => {
	switch (action.type) {
	case types.FETCH_MOVIES:
		return _.mapKeys(action.payload.data, '_id');
	default:
		return state;
	}
};

const isFetching = (state = false, action) => {
	switch (action.type) {
	case types.FETCHING_MOVIES:
		return true;
	case types.RECEIVED_MOVIES:
		return false;
	default:
		return state;
	}
};

const searchResults = (state = {}, action) => {
	switch (action.type) {
	case types.FIND_MOVIE:
	case types.CLOSED_SEARCH_MODAL:
		return action.payload.data.results;
	default:
		return state;
	}
};

const isSearching = (state = false, action) => {
	switch (action.type) {
	case types.SEARCHING_MOVIES:
		return true;
	case types.DONE_SEARCHING:
	case types.CLOSED_SEARCH_MODAL:
		return false;
	default:
		return state;
	}
};

const rootReducer = combineReducers({
	movies,
	searchResults,
	isFetching,
	isSearching,
	toasts,
});

export default rootReducer;
