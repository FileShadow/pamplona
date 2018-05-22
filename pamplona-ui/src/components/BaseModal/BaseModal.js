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
		this.willShow = this.willShow.bind( this );
	}

	openModal() {
		// console.log( 'Modal.openModal' );
		if( ! this.state.showModal ) {
			this.willShow();
		}
		this.setState( { showModal: true } );
	}

	closeModal() {
		// console.log( 'Modal.closeModal' );
		this.setState( { showModal: false } );
	}

	toggle() {
		// console.log( 'Modal.toggle' );
		if( ! this.state.showModal ) {
			this.willShow();
		}
		this.setState( { showModal: ! this.state.showModal } );
	}

	willShow() {
		// console.log( 'Modal.willShow' );
	}

	render() {
		return null;
	}
}

export default BaseModal;
