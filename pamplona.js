#! /usr/bin/env node

'use strict';

( function main() {
	const fs = require('fs');
	const config = JSON.parse( fs.readFileSync( './config/defaults.json' ) );
	var app;

	startServer();


	/**
	 * start https server
	 */
	async function startServer() {
		const sslCertPath = './ssl/server.pem';
		if( ! fs.existsSync( sslCertPath ) ) {
			await generateCertificate();
		}
		const https = require('https');
		const express = require('express');
		const bodyParser = require('body-parser');
		const cookieParser = require('cookie-parser');
		const hostname = process.env.HOST || config.hostname || 'localhost';
		const httpsPort = process.env.PORT || config.https.port || 7000;
		const httpsOpts = config.https.options;
		httpsOpts.key = httpsOpts.cert = fs.readFileSync( sslCertPath );
		app = express();
		https.createServer( httpsOpts, app ).listen( httpsPort );
		console.info( `Pamplona; listening on https://${hostname}:${httpsPort}` );

		// statics, parsers, and routes
		app.use( express.static( 'pamplona-ui/build', { index: [ 'index.html' ] } ) );
		app.use( bodyParser.urlencoded( { extended: false } ) ); // application/x-www-form-urlencoded
		app.use( bodyParser.json() ); // application/json
		app.use( cookieParser() );


		/**
		 * generate self-signed SSL certificate
		 */
		function generateCertificate() {
			return new Promise( ( resolve ) => {
				console.info( 'Pamplona; generating SSL certificate' );
				const writeStream = fs.createWriteStream( sslCertPath, { flags: 'w', defaultEncoding: 'utf8', fd: null, mode: 0o664, autoClose: true } );
				const selfsigned = require('selfsigned');
				const pems = selfsigned.generate( [ { name: 'commonName', value: 'localhost' } ], { days: 3650, keySize: 2048, algorithm: 'sha256' } );
				writeStream.write( pems.private );
				writeStream.write( pems.cert );
				writeStream.end();
				writeStream.on( 'close', () => {
					return resolve();
				} );
			} );
		}
	}

} )();
