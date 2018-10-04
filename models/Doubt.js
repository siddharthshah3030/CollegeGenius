// var keystone = require('keystone');
// var Types = keystone.Field.Types;

// var Doubts = new keystone.List('Doubts', {
// 	autokey: { from: 'name', path: 'key', unique: true },
// });

// Doubts.add({
// 	name: { type: String, required: true },
// 	state: { type: Types.Select, options: 'Unsolved, Solved', default: 'Unsolved', index: true },
// 	author: { type: Types.Relationship, ref: 'User', index: true },
// 	publishedDate: { type: Types.Date, index: true },
// 	image: { type: Types.CloudinaryImage },
// 	content: {
// 		brief: { type: Types.Html, wysiwyg: true, height: 150 },
// 		extended: { type: Types.Html, wysiwyg: true, height: 400 },
// 	},
// 	categories: { type: Types.Relationship, ref: 'Topics', many: true },
// });

// Doubts.schema.virtual('content.full').get(function () {
// 	return this.content.extended || this.content.brief;
// });

// Doubts.relationship({ path: 'doubtComment', ref: 'DoubtComment', refPath: 'doubts' });

// Doubts.track = true;
// Doubts.defaultColumns = 'name, state|20%, author|20%, publishedDate|20%';
// Doubts.register();
