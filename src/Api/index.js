import axios from 'axios';
import superagent from 'superagent';
import { API_HOST } from '../config';

class Api {
	addMovieToDB = ({ apiID, title, poster, overview }) => (axios.post(`${API_HOST}/movies`, { apiID, title, poster, overview }));

	// need superagent for the delete due to how the api endpoint works
	removeMovieFromDB = movieID => (superagent.delete(`${API_HOST}/movies/${movieID}`));
}

export default new Api();
