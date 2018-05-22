import React from 'react';
import PropTypes from 'prop-types';
import './AppMenu.css';
import AddConnectionModal from './AddConnectionModal';
import { Button } from 'reactstrap';

class AppMenu extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {};
		this.addConnection = React.createRef();
		this.toggleAddConnection = this.toggleAddConnection.bind( this );
	}

	static get propTypes () {
		return {
			'className': PropTypes.string.isRequired,
			'toggleMenu': PropTypes.func.isRequired
		};
	}

	toggleAddConnection() {
		this.addConnection.current.toggle();
	}

	render() {
		return (
			<div className={'app-menu ' + this.props.className}>
				<button type="button" className="close menu-close" aria-label="Close" onClick={this.props.toggleMenu}>
					<span aria-hidden="true">&times;</span>
				</button>
				<div className="menu-footer">
					<Button color="secondary" onClick={this.toggleAddConnection}>
						<i className="fas fa-plus"></i> Add
					</Button>
				</div>
				<AddConnectionModal ref={this.addConnection} />
			</div>
		);
	}
}

export default AppMenu;
