import React from 'react';
import ReactModal from 'react-modal';
import './Modal.css';

ReactModal.setAppElement('#root');


class Modal extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			showModal: false
		};

		this.openModal = this.openModal.bind( this );
		this.closeModal = this.closeModal.bind( this );
	}

	openModal() {
		console.log( "Modal.openModal", this.props, this.state );
		this.setState( { showModal: true } );
	}

	closeModal() {
		console.log( "Modal.closeModal" );
		this.setState( { showModal: false } );
	}

	render() {
		return null;
	}
}

export default Modal;
