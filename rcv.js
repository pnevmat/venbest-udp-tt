'use strict';

const dgram = require('dgram');

const server = dgram.createSocket('udp4');

const connect = [];
let disconnectedClients = [];

server.on('message', (msg, rinfo) => {
	// Дозволяє кешувати в перемінну конект кожного нового запуску trn1
	// Умова визначає новий запуск trn1 за портом для запуску на одній локальній машині. ЇЇ можна змінити на визначення за IP адресою для запуску клієнтів з різних машин.
	if (!connect.find((item) => item.rinfo.port === rinfo.port)) {
		connect.push({
			id: `trn${connect.length + 1}.js`,
			message: msg,
			rinfo,
			date: new Date(),
		});
	} else {
		connect.forEach((item, i) => {
			// Визначає запуски trn1 з якими був відновлений зв'язок та видаляє їх з кешу запусків trn1 з якими зв'язок було втрачено
			if (disconnectedClients.find((client) => client === item.id)) {
				disconnectedClients = disconnectedClients.filter(
					(client) => client !== item.id,
				);
			}
			// Оновлює дату останнього зв'язку з усіма запусками trn1 від яких прийшли дані
			if (item.rinfo.port === rinfo.port) connect[i].date = new Date();
		});
	}
});

const intervalId = setInterval(() => {
	if (connect.length) {
		const dateNow = new Date();
		// Визначає запуски trn1 від яких не приходили повідомлення більш ніж 60 секунд та додає їх у кеш запусків з відсутнім зв'язком
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
