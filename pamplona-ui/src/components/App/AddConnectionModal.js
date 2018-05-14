import React from 'react';
import ReactModal from 'react-modal';
import Modal from '../Modal/Modal';

class AddConnectionModal extends Modal {
	constructor( props ) {
		super( props );
		this.state.showModal = false;
	}

	render() {
		return (
			<ReactModal isOpen={this.state.showModal} shouldCloseOnOverlayClick={false} onRequestClose={this.closeModal} className="modal add-connection" overlayClassName="overlay">
				<button onClick={this.closeModal}>Cancel</button>
			</ReactModal>
		);
	}
}

export default AddConnectionModal;
