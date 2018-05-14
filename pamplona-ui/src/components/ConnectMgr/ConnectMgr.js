import React from 'react';
import './ConnectMgr.css';
import AddConnectionModal from './AddConnectionModal';



class ConnectMgr extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {};
		this.addConnection = this.addConnection.bind( this );
	}

	addConnectionModalRef = ref => this.addConnectionModal = ref;

	addConnection( e ) {
		this.addConnectionModal.openModal();
	}

	render() {
		return (
			<div id="connect-mgr" className="connectmgr">
				<button onClick={this.addConnection}>Add Connection</button>
				<AddConnectionModal ref={this.addConnectionModalRef}/>
			</div>
		);
	}
}

export default ConnectMgr;
