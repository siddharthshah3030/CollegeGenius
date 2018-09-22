/* eslint-env node, mocha */

var demand = require('must');
var rk = require('../index');

describe('randomKey', function () {
	it('Should return a 10 char random string of alphanums', function () {
		demand(rk()).to.match(/^\w{10}$/i);
	});
	it('Should return a 2 char random string of alphanums', function () {
		demand(rk(2)).to.match(/^\w{2}$/i);
	});
	it('Should return a 4-6 char random string of alphanums', function () {
		demand(rk([4, 6])).to.match(/^\w{4,6}$/i);
	});
	it('Should return a 4-6 char random string of alphanums', function () {
		demand(rk([4, 6])).to.match(/^\w{4,6}$/i);
	});
	it('Should return a 4-6 char random string of alphanums', function () {
		demand(rk([4, 6])).to.match(/^\w{4,6}$/i);
	});
	it('Should return a 4-6 char random string of alphanums', function () {
		demand(rk([4, 6])).to.match(/^\w{4,6}$/i);
	});
	it('Should return a 4-6 char random string of alphanums', function () {
		demand(rk([4, 6])).to.match(/^\w{4,6}$/i);
	});
	it('Should return a 20 char random string of "ABCDE"', function () {
		demand(rk(20, 'ABCDE')).to.match(/^[A-E]{20}$/);
	});
});
