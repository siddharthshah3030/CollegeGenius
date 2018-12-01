var keystone = require('keystone');
var Notification = keystone.list('Notification');
var User = keystone.list('User');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	function announcer(callback){

		console.log(announcer)
	}
	// TODO : send event Notification to all users who are not notified (plus write better code at it) -SID
	// var msg91authkey = paste your msg 91 auth key here
	// currently you need to add your own auth key to make it work 
	// currently the below code sends sms to limited users not everyone 
	// below sms code is triggered when notiifcation route is accessed and sends sms only after that
	Notification.model.find().exec(function(err, event) {
		event.forEach(e => {
			if(e.notify===true){
		var something = Notification.model.findByIdAndUpdate(e._id, {notify:false}, (de)=>{
			User.model.find().exec(function(err, user) {
				console.log(user)
				var request = require('request');
				//below is mobile sms code 
				// don't enable unless really you want to 
// request("http://api.msg91.com/api/sendhttp.php?country=91&sender=MSGIND&route=4&mobiles=9770306466&authkey=msg91authkey&message=There is a new event named "+e.name+ " on the date " +e._.event_date.format('MMMM Do, YYYY')+ ", please check it out.", function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body) // Print the google web page.
//   }
// })
// request("http://api.msg91.com/api/sendhttp.php?country=91&sender=MSGIND&route=4&mobiles=7879563974&authkey=msg91authkey&message=There is a new event named "+e.name+ " on the date " +e._.event_date.format('MMMM Do, YYYY')+ ", please check it out.", function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body) // Print the google web page.
//   }
// })
// request("http://api.msg91.com/api/sendhttp.php?country=91&sender=MSGIND&route=4&mobiles=9098847299&authkey=msg91authkey&message=There is a new event named "+e.name+ " on the date " +e._.event_date.format('MMMM Do, YYYY')+ ", please check it out.", function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body) // Print the google web page.
//   }
// })

			})
					console.log(e);
				})
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
