var keystone = require('keystone');
var Notification = keystone.list('Notification');
var User = keystone.list('User');

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
		var something = Notification.model.findByIdAndUpdate(e._id, {notify:false}, (de)=>{
			User.model.find().exec(function(err, user) {
				console.log(user)
				var request = require('request');
request("http://api.msg91.com/api/sendhttp.php?country=91&sender=MSGIND&route=4&mobiles=9770306466&authkey=241506ApoDT2oa42n5bb94553&message=There is a new event named "+e.name+ " on the date " +e._.event_date.format('MMMM Do, YYYY')+ ", please check it out.", function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the google web page.
  }
})
request("http://api.msg91.com/api/sendhttp.php?country=91&sender=MSGIND&route=4&mobiles=7879563974&authkey=241506ApoDT2oa42n5bb94553&message=There is a new event named "+e.name+ " on the date " +e._.event_date.format('MMMM Do, YYYY')+ ", please check it out.", function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the google web page.
  }
})
request("http://api.msg91.com/api/sendhttp.php?country=91&sender=MSGIND&route=4&mobiles=9098847299&authkey=241506ApoDT2oa42n5bb94553&message=There is a new event named "+e.name+ " on the date " +e._.event_date.format('MMMM Do, YYYY')+ ", please check it out.", function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the google web page.
  }
})
				// fetch("http://api.msg91.com/api/sendhttp.php?country=91&sender=MSGIND&route=4&mobiles=9770306466&authkey=241506ApoDT2oa42n5bb94553&message="+e.name)
				// .then(function(response) {
				// //   return response.json();
				// })
				// .then(function(myJson) {
				//   console.log(JSON.stringify(myJson));
				// });
				// $.get( "http://api.msg91.com/api/sendhttp.php?country=91&sender=MSGIND&route=4&mobiles=9770306466&authkey=241506ApoDT2oa42n5bb94553&message="+e.name, function( data ) {
				// 	// $( ".result" ).html( data );
				// 	alert( "Load was performed." );
				//   });
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
