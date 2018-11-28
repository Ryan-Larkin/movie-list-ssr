import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export const MovieItem = ({
	openModal, modalIsOpen, closeModal,
	posterSrc, title, removeMovie, dbID,
}) => (
	<div className="movie" role="button" tabIndex="0">
		<img
			src={posterSrc}
			alt={title}
			onClick={openModal}
		/>

		{
			modalIsOpen ? (
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
					shouldCloseOnOverlayClick
					contentLabel="Movie Info"
					className="movie-modal movie-modal__info"
					overlayClassName="movie-overlay movie-overlay__info"
				>
					<h6>{title}</h6>
					<button type="button" onClick={() => removeMovie(dbID, title)}>
						Remove this movie
					</button>
				</Modal>
			) : null
		}
	</div>
);
