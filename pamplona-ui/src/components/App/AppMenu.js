import React from 'react';
import './AppMenu.css';
import AddConnectionModal from './AddConnectionModal';
import { Button } from 'reactstrap';

class AppMenu extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {};
		this.showAddConnection = this.showAddConnection.bind( this );
	}

	addConnectionRef = ref => this.addConnection = ref;
	showAddConnection() {
		this.addConnection.openModal();
	}

	render() {
		return (
			<div className="main-left">
				<button className="menu-close" onClick={this.props.toggleMenu}>
					<i className="fas fa-times"></i>
				</button>
				<div className="add-connection-box">
					<Button onClick={this.showAddConnection}>
						<i className="fas fa-plus"></i> Add
					</Button>
				</div>
				<AddConnectionModal ref={this.addConnectionRef} />
			</div>
		);
	}
}

export default AppMenu;
