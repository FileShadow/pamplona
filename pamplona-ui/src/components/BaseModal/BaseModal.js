import React from 'react';
import './BaseModal.css';

class BaseModal extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			showModal: false
		};

		this.openModal = this.openModal.bind( this );
		this.closeModal = this.closeModal.bind( this );
		this.toggle = this.toggle.bind( this );
	}

	openModal() {
		console.log( "Modal.openModal", this.props, this.state );
		this.setState( { showModal: true } );
	}

	closeModal() {
		console.log( "Modal.closeModal" );
		this.setState( { showModal: false } );
	}

	toggle() {
		console.log( "Modal.toggle" );
		this.setState( { showModal: ! this.state.showModal } );
	}

	render() {
		return null;
	}
}

export default BaseModal;
