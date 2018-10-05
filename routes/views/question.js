var keystone = require('keystone');
var Quiz = keystone.list('Quiz');
// var Questions = keystone.list('Questions');
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
    Quiz.model.find().populate('questions').exec(function(err, quiz) {
        console.log(quiz);
        res.json(quiz)
      });
        // request(globalquiz, function(err, response, body) {  
        //   var json = JSON.parse(body);
        //   console.log(json); // Logging the output within the request function
          //then returning the response.. The request.json is empty over here
        // }); //closing the request function      
    // .populate('');
    // console.log(q.schema.tree.name)
	// view.render('quiz', {
	// 	section: 'quiz',quiz: globalquiz
	// });

}
