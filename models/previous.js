var keystone = require('keystone');
var Types = keystone.Field.Types;

var previous = new keystone.List('previous', {
	autokey: { from: 'name', path: 'key', unique: true },
	plural: 'Notes',
	singular: 'Notes',
});

previous.add({
	name: { type: String, required: true },
	sem: { type: String, required: false },
	branch: { type: String, required: false },
	year: { type: String, required: false },

	publishedDate: { type: Types.Date, default: Date.now },
	images: { type: Types.CloudinaryImages },
});

previous.track = true;
previous.defaultSort = 'name';
previous.defaultColumns = 'name, publishedDate';
previous.register();
