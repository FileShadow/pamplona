import React from 'react';
import BaseModal from '../BaseModal/BaseModal';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class AddConnectionModal extends BaseModal {
	constructor( props ) {
		super( props );
		this.state.showModal = false;
		this.state.host = '';
		this.state.port = '';
	}

	componentDidMount() {
		this.setState( { host: '' } );
	}

	render() {
		return (
			<div>
				<Modal className={this.props.className} isOpen={this.state.showModal} toggle={this.toggle} backdrop="static">
					<ModalHeader toggle={this.toggle}>Add Connection</ModalHeader>
					<ModalBody>
						<div id="wrapper">
							<form>
								<div>
									<input name="host" type="text" value={this.state.host} onChange={(e)=>{this.setState({host:e.target.value});}} />
									<label className={this.state.host?'small':''}>Host</label>
								</div>
								<div>
									<input name="port" type="text" value={this.state.port} onChange={(e)=>{this.setState({port:e.target.value});}} />
									<label className={this.state.port?'small':''}>Port</label>
								</div>
							</form>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.toggle}>Save</Button>
						<Button color="secondary" onClick={this.toggle}>Cancel</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default AddConnectionModal;
