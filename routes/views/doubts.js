var keystone = require('keystone');
var async = require('async');
var Doubts = keystone.list('Doubts');
var DoubtsCategory = keystone.list('DoubtsCategory');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'doubts';
	locals.filters = {
		category: req.params.category,
	};
	locals.doubts = [];
	locals.categories = [];

	// Load all categories
	view.on('init', function (next) {

		DoubtsCategory.model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.categories = results;

			// Load the counts for each category
			async.each(locals.categories, function (category, next) {

				keystone.list('Doubts').model.count().where('state', 'unsolved').where('categories').in([category.id]).exec(function (err, count) {
					category.postCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});

		});

	});

	// Load the current category filter
	view.on('init', function (next) {
		if (req.params.category) {
			DoubtsCategory.model.findOne({ key: locals.filters.category }).exec(function (err, result) {
				locals.category = result;
				next(err);
			});
		} else {
			next();
		}
	});

	// Load the posts
	view.on('init', function (next) {

		var q = Doubts.paginate({
				page: req.query.page || 1,
 				perPage: 10,
 				maxPages: 10,
			})
			.where('state', 'solved')
			.sort('-publishedDate')
			.populate('author categories');

		if (locals.category) {
			q.where('categories').in([locals.category]);
		}

		q.exec(function (err, results) {
			locals.doubts = results;
			next(err);
		});

	});

	// Render the view
	view.render('doubts');

}
