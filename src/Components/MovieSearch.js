import React from 'react';
import Modal from 'react-modal';
import _ from 'lodash';

import { POSTER_SIZES } from '../config';

Modal.setAppElement('#root');

export const MovieSearch = ({
	searchValue, handleSearchInput, handleTyping, addMovie,
	searchForMovie, searchResults, modalIsOpen, closeModal,
}) => (
	<div className="movie-search">
		<input type="text" placeholder="Add a movie" value={searchValue} onKeyUp={handleSearchInput} onChange={handleTyping} />
		<button
			type="button"
			onClick={() => searchForMovie()}
		>
			Search
		</button>

		{
			searchResults
				? (
					<Modal
						isOpen={modalIsOpen}
						onRequestClose={closeModal}
						shouldCloseOnOverlayClick
						contentLabel="Search Results"
						className="movie-modal movie-modal__search custom-scroll"
						overlayClassName="movie-overlay movie-overlay__search"
					>
						{_.map(searchResults, sr => (
							<div
								key={sr.id}
								onClick={() => addMovie({
									apiID: sr.id,
									title: sr.title,
									poster: sr.poster_path,
									overview: sr.overview,
								})}
								role="button"
								tabIndex={0}
								className="search-result"
							>
								<img
									src={`${POSTER_SIZES.W92}${sr.poster_path}`}
									alt={sr.title}
								/>
								<p>{sr.title}</p>
							</div>
						))}
					</Modal>
				) : null
		}
	</div>
);
