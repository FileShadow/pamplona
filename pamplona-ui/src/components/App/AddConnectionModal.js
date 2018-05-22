/* global fetch */

import React from 'react';
import BaseModal from '../BaseModal/BaseModal';
import { Button, Form, FormGroup, FormFeedback, Input, InputGroup, InputGroupText, InputGroupAddon, Label, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip } from 'reactstrap';

class AddConnectionModal extends BaseModal {
	constructor( props ) {
		super( props );
		this.state.showModal = false;
		this.state.submitDisabled = true;
		this.state.name = { value: '', invalid: false };
		this.state.redisUrl = { value: '', invalid: false };
		this.state.prefix = { value: '', invalid: false };

		this.onChangeInput = this.onChangeInput.bind( this );
		this.onBlurInput = this.onBlurInput.bind( this );
		this.onSubmit = this.onSubmit.bind( this );
	}

	willShow() {
		// console.log( 'AddConnectionModal.willShow' );
		this.setState( {
			name: { value: '', invalid: false },
			redisUrl: { value: '', invalid: false },
			prefix: { value: '', invalid: false }
		} );
	}

	onChangeInput( event ) {
		const target = event.target;
		const state = {};
		const fieldState = state[ target.name ] = this.state[ target.name ];
		fieldState.value = target.value;
		fieldState.invalid = ( ! fieldState.value );
		this.setState( state );
		this.setState( { submitDisabled: ! ( this.state.name.value && this.state.host.value && this.state.port.value ) } );
	}

	onBlurInput( event ) {
		const target = event.target;
		const state = {};
		const fieldState = state[ target.name ] = this.state[ target.name ];
		fieldState.invalid = ( ! fieldState.value );
		this.setState( state );
	}

	onSubmit() {
		fetch( '/connection/add', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
			body: JSON.stringify( { name: this.state.name.value, redisUrl: this.state.redisUrl.value, prefix: this.state.prefix.value } )
		} )
		.then( ( response ) => {
			console.log( 'AddConnectModal.submit; response:', response );
		} );
	}

	render() {
		return (
			<Modal className="add-connection" isOpen={this.state.showModal} toggle={this.toggle} backdrop="static">
				<ModalHeader toggle={this.toggle}>Add Redis Connection</ModalHeader>
				<ModalBody>
					<p className="add-connection-p">Redis Connection Settings</p>
					<Form className="nested-labels" autoComplete="off" noValidate="novalidate">
						<FormGroup>
							<Input name="name" type="text" required="true" autoComplete="off" invalid={this.state.name.invalid} value={this.state.name.value} onChange={this.onChangeInput} onBlur={this.onBlurInput} />
							<Label className={this.state.name.value?'small':''}>Name</Label>
							<FormFeedback>* Name is required</FormFeedback>
						</FormGroup>
						<FormGroup>
							<InputGroup>
								<Input name="redisUrl" type="text" required="true" autoComplete="off" invalid={this.state.redisUrl.invalid} value={this.state.redisUrl.value} onChange={this.onChangeInput} onBlur={this.onBlurInput} />
								<InputGroupAddon addonType="append">
									<InputGroupText id="redis-url-info">
										<i className="fas fa-info"></i>
										<UncontrolledTooltip target="redis-url-info" placement="bottom-end" className="redis-url-tooltip">
											<h5>Examples:</h5>
											<div className="redis-url-tooltip-ex">
												<p>Connect to 127.0.0.1</p>
												<span>127.0.0.1</span>
											</div>
											<div className="redis-url-tooltip-ex">
												<p>Connect to socket</p>
												<span>/tmp/redis.sock</span>
											</div>
											<div className="redis-url-tooltip-ex">
												<p>Connect to 127.0.0.1:6380</p>
												<span>127.0.0.1:6380</span>
											</div>
											<div className="redis-url-tooltip-ex">
												<p>Connect to 127.0.0.1:6380, db 4, using password &quot;authpassword&quot;</p>
												<span>redis://:authpassword@127.0.0.1:6380/4</span>
											</div>
										</UncontrolledTooltip>
									</InputGroupText>
								</InputGroupAddon>
								<FormFeedback>* Redis Url is required</FormFeedback>
							</InputGroup>
							<Label className={this.state.redisUrl.value?'small':''}>Redis URL</Label>
						</FormGroup>
						<FormGroup>
							<Input name="prefix" type="text" autoComplete="off" value={this.state.prefix.value} onChange={this.onChangeInput} onBlur={this.onBlurInput} />
							<Label className={this.state.prefix.value?'small':''}>Bull Prefix</Label>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button type="submit" color="primary" disabled={this.state.submitDisabled} onClick={this.onSubmit}>Save</Button>
					<Button color="secondary" onClick={this.toggle}>Cancel</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

export default AddConnectionModal;
