var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
	Posts
	=====
 */

var DoubtsComment = new keystone.List('DoubtsComment', {
	label: 'Answers',
});

DoubtsComment.add({
	author: { type: Types.Relationship, initial: true, ref: 'User', index: true },
	post: { type: Types.Relationship, initial: true, ref: 'Doubts', index: true },
	commentState: { type: Types.Select, options: ['published', 'draft', 'archived'], default: 'published', index: true },
	publishedOn: { type: Types.Date, default: Date.now, noedit: true, index: true },
});

DoubtsComment.add('Content', {
	content: { type: Types.Html, wysiwyg: true, height: 300 },
});

DoubtsComment.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
	if (!this.isModified('publishedOn') && this.isModified('commentState') && this.commentState === 'published') {
		this.publishedOn = new Date();
	}
	next();
});

DoubtsComment.schema.post('save', function () {
	if (!this.wasNew) return;
	if (this.author) {
		keystone.list('User').model.findById(this.author).exec(function (err, user) {
			if (user) {
				user.wasActive().save();
			}
		});
	}
});

DoubtsComment.track = true;
DoubtsComment.defaultColumns = 'author, post, publishedOn, commentState';
DoubtsComment.register();
