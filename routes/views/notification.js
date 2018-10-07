var keystone = require('keystone');
var Notification = keystone.list('Notification');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	function announcer(callback){

		console.log(announcer)
	}
	Notification.model.find().exec(function(err, event) {
		event.forEach(e => {
			// console.log(e.notify)
			if(e.notify===true){
				var something = 		Notification.model.findByIdAndUpdate(e._id, {notify:false})
				console.log(something)
			}
		});
		// res.json(quiz)
		// Notification.model.findByIdAndUpdate(id, update, callback)
      });
	locals.section = 'notification  section';

	view.query('Notification', Notification.model.find().sort('sortOrder'));
// console.log(Gallery.model.find().sort('sortOrder'))
	view.render('notification');

}
