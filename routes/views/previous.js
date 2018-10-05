var keystone = require('keystone');
var Previous = keystone.list('Previous');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'Previous Year Question Papers';

	view.query('previous', Previous.model.find().sort('sortOrder'));
// console.log(Gallery.model.find().sort('sortOrder'))
	view.render('previous');

}
