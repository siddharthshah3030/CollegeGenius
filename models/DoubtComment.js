// var keystone = require('keystone');
// var Types = keystone.Field.Types;

// /**
// 	Posts
// 	=====
//  */

// var DoubtComment = new keystone.List('DoubtComment', {
// 	label: 'Comments',
// });

// DoubtComment.add({
// 	author: { type: Types.Relationship, initial: true, ref: 'User', index: true },
// 	post: { type: Types.Relationship, initial: true, ref: 'Post', index: true },
// 	commentState: { type: Types.Select, options: ['published', 'draft', 'archived'], default: 'published', index: true },
// 	publishedOn: { type: Types.Date, default: Date.now, noedit: true, index: true },
// });

// DoubtComment.add('Content', {
// 	content: { type: Types.Html, wysiwyg: true, height: 300 },
// });

// DoubtComment.schema.pre('save', function (next) {
// 	this.wasNew = this.isNew;
// 	if (!this.isModified('publishedOn') && this.isModified('commentState') && this.commentState === 'published') {
// 		this.publishedOn = new Date();
// 	}
// 	next();
// });

// DoubtComment.schema.post('save', function () {
// 	if (!this.wasNew) return;
// 	if (this.author) {
// 		keystone.list('User').model.findById(this.author).exec(function (err, user) {
// 			if (user) {
// 				user.wasActive().save();
// 			}
// 		});
// 	}
// });

// DoubtComment.track = true;
// DoubtComment.defaultColumns = 'author, post, publishedOn, commentState';
// DoubtComment.register();
