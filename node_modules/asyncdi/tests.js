/* eslint-env node, mocha */
/* eslint camelcase:0, handle-callback-err: 0 */

var demand = require('must'),
	di = require('./index'),
	_ = require('lodash');

var thrownErr = new Error("Should've been caught by asyncdi");

var fn_basic = function() { return true; };
var fn_async = function(callback) { setTimeout(callback, 0, null, true); };
var fn_next = function(next){ return next(); };
var fn_one = function(one) { one(); return true; };
var fn_scope = function(){ return this; };
var fn_error = function() { throw thrownErr; };
var fn_reflect_args = function() { return _.toArray(arguments); };
var fn_overwritten_toString = function(){ return true; };
fn_overwritten_toString.toString = function() {
	return 'toString overwritten';
};
var scope = {};
var notAFunction = {};

describe('AsyncDI', function() {
	describe('new Wrapper', function() {
		it('must be an instance of Wrapper', function() {
			new di.Wrapper(fn_basic).must.be.an.instanceof(di.Wrapper);
		});
	});
	describe('()', function() {
		it('must be an instance of Wrapper', function() {
			di(fn_basic).must.be.an.instanceof(di.Wrapper);
		});
	});
	describe('(notAFunction)', function() {
		it('must throw an error', function() {
			demand(function(){
				di(notAFunction);
			}).to.throw(/function/i);
		});
	});
	describe('(fn_overwritten_toString)', function() {
		it('should not throw an error', function() {
			demand(function(){
				di(fn_overwritten_toString);
			}).to.not.throw();
		});
	});
	describe('fn_basic.isAsync', function() {
		it('must not be async', function() {
			demand(di(fn_basic).isAsync).not.be.true();
		});
	});
	describe('fn_async.isAsync', function() {
		it('must be async', function() {
			demand(di(fn_async).isAsync).be.true();
		});
	});
	describe('fn_next.isAsync', function() {
		it('must be async, if so configured', function() {
			demand(di(fn_next, null, { callback: 'next' }).isAsync).be.true();
		});
	});
	describe('fn_basic.deps', function() {
		it('must be empty', function() {
			demand(di(fn_async).deps).eql([]);
		});
	});
	describe('fn_basic.call(callback)', function() {
		it('must callback(null, true)', function(done) {
			di(fn_basic).call(function(err, val) {
				demand(err).be.null();
				demand(val).be.true();
				done();
			});
		});
	});
	describe('fn_basic.call()', function() {
		it('must return true', function() {
			di(fn_basic).call().must.be.true();
		});
	});
	describe('fn_async.call(callback)', function() {
		it('must callback(null, true)', function(done) {
			di(fn_async).call(function(err, val) {
				demand(err).be.null();
				demand(val).be.true();
				done();
			});
		});
	});
	describe('fn_one.requires', function() {
		it('must require `one`', function() {
			demand(di(fn_one).requires.one).be.true();
		});
	});
	describe('fn_one.requires', function() {
		it('must not require `two`', function() {
			demand(di(fn_one).requires.two).be.undefined();
		});
	});
	describe('(fn_reflect_args).provides', function() {
		it('accept an array of values', function(done) {
			var a = {},
				b = {};
			di(fn_reflect_args).provides([a, b]).call(function(err, val) {
				demand(val).eql([a, b]);
				done();
			});
		});
	});
	describe('(fn_scope).call(scope, callback)', function() {
		it('must return scope', function(done) {
			di(fn_scope).call(scope, function(err, val) {
				demand(val).equal(scope);
				done();
			});
		});
	});
	describe('(fn_scope, scope).call(callback)', function() {
		it('must return scope', function(done){
			di(fn_scope, scope).call(function(err, val) {
				demand(val).equal(scope);
				done();
			});
		});
	});
	describe('(fn_error).call(callback)', function() {
		it('must return thrownErr', function(done) {
			di(fn_error).call(function(err){
				demand(err).equal(thrownErr);
				done();
			});
		});
	});
});
