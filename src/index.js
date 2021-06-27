const bigFont = require('./services/bigFont');

function start() {
    bigFont.init();
    bigFont.writeChar(1, '0');
    bigFont.writeChar(4, '1');
    bigFont.writeChar(9, '2');	
}

start();
