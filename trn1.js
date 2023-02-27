'use strict';

const dgram = require('dgram');

const message = Buffer.from('Иванов Иван Иванович');

const client = dgram.createSocket('udp4');

setInterval(() => {
	client.send(message, 2222, 'localhost', (error) => {
		if (error) {
			client.close();
			throw error;
		}
	});
}, 6000);
