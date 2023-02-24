'use strict';
// Server

const dgram = require('dgram');

const server = dgram.createSocket('udp4');

let connect = [];
// Оба запуска поддерживаются: как trn1.js так и trn2.js меседжи приходят
// ToDo: Найти способ как отличать trn1.js и trn2.js и так далее чтоби проверить какой из них отправил сообщение и в случае потери связи вивести с каким из trn била потеряна связь
server.on('message', (msg, rinfo) => {
	// console.dir(msg);
	// console.dir(rinfo);
	connect.push({
		id: Math.random().toString(),
		message: msg,
		rinfo,
		date: new Date(),
	});
	// console.dir(connect);
});

const intervalId = setInterval(() => {
	if (connect.length) {
		const dateNow = new Date();

		const datesDifference = dateNow - connect[connect.length - 1].date;
		console.dir(datesDifference);
		if (datesDifference > 60000) {
			console.dir('нет связи с скриптом "trn1.js"');
			clearInterval(intervalId);
		}
	}
}, 6000);

server.bind(2222);
