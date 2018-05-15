import React from 'react';
import './App.css';
import AppMenu from './AppMenu';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
// import reducers from './reducers';
import Home from '../Home/Home';
import Other from '../Other/Other';

const history = createHistory();
const middleware = routerMiddleware( history );
const store = createStore( combineReducers( { router: routerReducer } ), applyMiddleware( middleware ) );

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
				<div className={ 'main' + ( this.state.menuIsOpen ? ' open' : '' ) }>
					<AppMenu toggleMenu={this.toggleMenu} isOpen={this.state.menuIsOpen} />
					<Provider store={store}>
						<ConnectedRouter history={history}>
							<div>
								<Route exact path="/" component={Home} />
								<Route path="/other" component={Other} />
							</div>
						</ConnectedRouter>
					</Provider>
				</div>
			</div>
		);
	}
}

export default App;
