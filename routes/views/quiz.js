var keystone = require('keystone');
var Quiz = keystone.list('Quiz');
// var Questions = keystone.list('Questions');
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
var globalquiz
    Quiz.model.find().populate('questions').exec(function(err, quiz) {
        console.log(quiz);

        globalquiz = quiz
      });
      
    // .populate('');
    // console.log(q.schema.tree.name)
	view.render('quiz', {
		section: 'quiz',quiz: globalquiz
	});

}
