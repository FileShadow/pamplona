'use strict';

const Promise = require( 'bluebird' );
const crypto = require( 'crypto' );
const express = require( 'express' );
const fs = require( 'fs' );
const router = express.Router();

const connectionsPath = './config/connections.json';

const Api = {
	router: router
};

router.post( '/connection/add', req_addConnection );

function req_addConnection( req, res ) {
	console.error( 'req_addConnection; req.body:', req.body );
	addConnection( req.body )
	.then( () => {
		res.status( 200 ).send( { 'success': true } );
	} )
	.catch( ( err ) => {
		console.error( 'req_addConnection.catch:', err );
		res.status( 500 ).send( { 'success': false, 'error': err.message } );
	} );
}

function addConnection( body ) {
	return Promise.resolve()
	.then( () => {
		const connections = {};
		if( fs.existsSync( connectionsPath ) ) {
			const _connections = require( connectionsPath );
			Object.assign( connections, _connections );
		}
		const uid = crypto.randomBytes( 3 ).toString( 'hex' );
		connections[ uid ] = {
			name: body.name,
			host: body.host,
			port: body.port,
			password: body.password || '',
		};
		console.info( 'connections:', connections );
		return new Promise( ( resolve, reject ) => {
			fs.writeFile( connectionsPath, JSON.stringify( connections ), ( err ) => {
				if( err ) {
					return reject( err );
				}
				return resolve();
			} );
		} );
	} );
}

module.exports = exports = Api;
