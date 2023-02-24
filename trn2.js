'use strict';
// Client

const dgram = require('dgram');
// Иванов Иван Иванович
const message = Buffer.from('Петров Петр Петрович');

const client = dgram.createSocket('udp4');

setInterval(() => {
	client.send(message, 2222, 'localhost', (error) => {
		if (error) {
			client.close();
			throw error;
		}
	});
}, 6000);
