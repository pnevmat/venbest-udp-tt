'use strict';
// Server

const dgram = require('dgram');

const server = dgram.createSocket('udp4');

const connect = [];
let disconnectedClients = [];

server.on('message', (msg, rinfo) => {
	console.dir(rinfo.port);
	if (!connect.find((item) => item.rinfo.port === rinfo.port)) {
		connect.push({
			id: `trn${connect.length + 1}.js`,
			message: msg,
			rinfo,
			date: new Date(),
		});
	} else {
		connect.forEach((item, i) => {
			if (disconnectedClients.find((client) => client === item.id)) {
				disconnectedClients = disconnectedClients.filter(
					(client) => client !== item.id,
				);
			}

			if (item.rinfo.port === rinfo.port) connect[i].date = new Date();
		});
	}
});

const intervalId = setInterval(() => {
	if (connect.length) {
		const dateNow = new Date();

		connect.forEach((item) => {
			const datesDifference = dateNow - item.date;

			if (
				datesDifference > 60000 &&
				!disconnectedClients.find((client) => client === item.id)
			) {
				console.dir(`нет связи с скриптом "${item.id}"`);
				disconnectedClients.push(item.id);
			}
		});
	}
}, 6000);

server.on('close', () => {
	clearInterval(intervalId);
});

server.bind(2222);
