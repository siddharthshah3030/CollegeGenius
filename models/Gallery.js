var keystone = require('keystone');
var Types = keystone.Field.Types;

var Gallery = new keystone.List('Gallery', {
	autokey: { from: 'name', path: 'key', unique: true },
	plural: 'Notes',
	singular: 'Notes',
});

Gallery.add({
	name: { type: String, required: true },
	publishedDate: { type: Types.Date, default: Date.now },
	images: { type: Types.CloudinaryImages },
	Sem: { type: Types.Select, options: [
		{ value: '3rd sem', label: "3rd sem" },
		{ value: '2nd sem', label: "2nd sem" },
		{ value: '4th sem', label: "4th sem" },
	], required: false },
	Branch: { type: Types.Select, options: [
		{ value: 'ETC', label: "ETC" },
		{ value: 'CSE', label: "Cse" },
		{ value: 'Mech', label: "Mech" },
		{ value: 'IT', label: "IT" },
		{ value: 'Archi', label: "Archi" },
	], required: false },
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },

});

Gallery.track = true;
Gallery.defaultSort = 'name';
Gallery.defaultColumns = 'name, publishedDate, Sem, Branch';
Gallery.register();
