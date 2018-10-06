// var keystone = require('keystone');
// var Doubts = keystone.list('Doubts');
// var DoubtsComment = keystone.list('DoubtsComment');

// exports = module.exports = function (req, res) {

// 	var view = new keystone.View(req, res);
// 	var locals = res.locals;

// 	// Init locals
// 	locals.section = 'doubts';
// 	locals.filters = {
// 		doubts: req.params.doubts,
// 	};

// 	// Load the current post
// 	view.on('init', function (next) {

// 		var q = Doubts.model.findOne({
// 			state: 'unsolved',
// 			key: locals.filters.doubts,
// 		}).populate('author categories');

// 		q.exec(function (err, result) {
// 			locals.doubts = result;
// 			next(err);
// 		});

// 	});

// 	// Load other posts
// 	view.on('init', function (next) {

// 		var q = Doubts.model.find().where('state', 'unsolved').sort('-publishedDate').populate('author').limit(4);

// 		q.exec(function (err, results) {
// 			locals.Doubts = results;
// 			next(err);
// 		});

// 	});


// 	// Load comments on the Post
// 	view.on('init', function (next) {
// 		DoubtsComment.model.find()
// 			.where('doubts', locals.doubts)
// 			.where('commentState', 'published')
// 			.where('author').ne(null)
// 			.populate('author', 'name photo')
// 			.sort('-publishedOn')
// 			.exec(function (err, comments) {
// 				if (err) return res.err(err);
// 				if (!comments) return res.notfound('Post comments not found');
// 				locals.comments = comments;
// 				next();
// 			});
// 	});

// 	// Create a Comment
// 	view.on('doubts', { action: 'comment.create' }, function (next) {

// 		var newComment = new DoubtsComment.model({
// 			state: 'published',
// 			doubts: locals.doubts.id,
// 			author: locals.user.id,
// 		});

// 		var updater = newComment.getUpdateHandler(req);

// 		updater.process(req.body, {
// 			fields: 'content',
// 			flashErrors: true,
// 			logErrors: true,
// 		}, function (err) {
// 			if (err) {
// 				validationErrors = err.errors;
// 			} else {
// 				req.flash('success', 'Your comment was added.');
// 				return res.redirect('/doubts/doubt/' + locals.doubts.key + '#comment-id-' + newComment.id);
// 			}
// 			next();
// 		});

// 	});

// 	// Delete a Comment
// 	view.on('get', { remove: 'comment' }, function (next) {

// 		if (!req.user) {
// 			req.flash('error', 'You must be signed in to delete a comment.');
// 			return next();
// 		}

// 		DoubtsComment.model.findOne({
// 				_id: req.query.comment,
// 				doubts: locals.doubts.id,
// 			})
// 			.exec(function (err, comment) {
// 				if (err) {
// 					if (err.name === 'CastError') {
// 						req.flash('error', 'The comment ' + req.query.comment + ' could not be found.');
// 						return next();
// 					}
// 					return res.err(err);
// 				}
// 				if (!comment) {
// 					req.flash('error', 'The comment ' + req.query.comment + ' could not be found.');
// 					return next();
// 				}
// 				if (comment.author != req.user.id) {
// 					req.flash('error', 'Sorry, you must be the author of a comment to delete it.');
// 					return next();
// 				}
// 				comment.commentState = 'archived';
// 				comment.save(function (err) {
// 					if (err) return res.err(err);
// 					req.flash('success', 'Your comment has been deleted.');
// 					return res.redirect('/doubts/doubt/' + locals.doubts.key);
// 				});
// 			});
// 	});

// 	// Render the view
// 	view.render('doubt');

// }
