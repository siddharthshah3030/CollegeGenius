var keystone = require('keystone');
var previous = keystone.list('previous');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'previous';

	view.query('previous', previous.model.find().sort('sortOrder'));

	view.render('previous');

}
