var keystone = require('keystone');
var Notification = keystone.list('Notification');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'notification  section ';

	view.query('Notification', Notification.model.find().sort('sortOrder'));
// console.log(Gallery.model.find().sort('sortOrder'))
	view.render('notification');

}
