var keystone = require('keystone');
var Quiz = keystone.list('Quiz');
// var Questions = keystone.list('Questions');
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
    // console.log(q.schema.tree.name)
	view.render('quiz_detail');

}
