function number (n) {
	if (!n) return 10;
	return (typeof n === 'number') ? n : parseInt(n, 10);
}

function randomKey (len, chars) {
	var str = '';
	if (typeof len === 'object') { // cheap array check
		var min = number(len[0]);
		var max = number(len[1]);
		len = Math.round(Math.random() * (max - min)) + min;
	} else {
		len = number(len);
	}
	chars = chars || randomKey.default;
	for (var i = 0; i < len; i++) {
		str += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return str;
}

randomKey.alphanumeric = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ';
randomKey.default = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
randomKey.lower = 'abcdefghijklmnopqrstuvwxtz';
randomKey.numbers = '0123456789';
randomKey.safe = '2346789ABCDEFGHJKLMNPRTUVWXTZ';
randomKey.upper = 'ABCDEFGHIJKLMNOPQRSTUVWXTZ';

module.exports = randomKey;
