import React from 'react';
import './App.css';
import AppMenu from './AppMenu';
// import ConnectMgr from '../ConnectMgr/ConnectMgr';

class App extends React.Component {
	constructor( props ) {
		super( props );
		this.state = { menuIsOpen: false };
		this.toggleMenu = this.toggleMenu.bind( this );
	}

	toggleMenu( event ) {
		event.preventDefault();
		this.setState( { menuIsOpen: ! this.state.menuIsOpen } );
	}

	render() {
		return (
			<div id="app-root" className="app">
				<header className="app-header">
					<h1 className="app-title">PAMPLONA</h1>
					<div className="app-header-sub">
						<div className="burger-button">
							<span>
								<span className="burger-bars top"></span>
								<span className="burger-bars mid"></span>
								<span className="burger-bars btm"></span>
							</span>
							<button onClick={this.toggleMenu}>Toggle Menu</button>
						</div>
					</div>
				</header>
				<div className={ "main" + ( this.state.menuIsOpen ? " open" : "" ) }>
					<AppMenu toggleMenu={this.toggleMenu} isOpen={this.state.menuIsOpen} />
					<div className="main-right">Right</div>
				</div>
			</div>
		);
	}
}

export default App;
