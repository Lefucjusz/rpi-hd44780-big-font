const bigFont = require('./services/bigFont');

function start() {
    bigFont.init();

	setInterval(() => {
		const date = new Date();
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		const seconds = date.getSeconds().toString().padStart(2, '0');

		bigFont.writeChar(1, hours[0]);
		bigFont.writeChar(4, hours[1]);
		bigFont.writeChar(8, minutes[0]);
		bigFont.writeChar(11, minutes[1]);
		bigFont.writeChar(15, seconds[0]);
		bigFont.writeChar(18, seconds[1]);
	}, 500);
}

start();
