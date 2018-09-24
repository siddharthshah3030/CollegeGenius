var keystone = require('keystone');
var Types = keystone.Field.Types;

var previous = new keystone.List('previous', {
	autokey: { from: 'name', path: 'key', unique: true },
	plural: 'previous year question papers',
	singular: 'previous year question papers',
});

previous.add({
	name: { type: String, required: true },
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
	Year: { type: Types.Select, options: [
		{ value: '2015', label: "2015" },
		{ value: '2016', label: "2016" },
		{ value: '2017', label: "2017" },
		{ value: '2018', label: "2018" },
		{ value: '2019', label: "2019" },
	], required: false },

	publishedDate: { type: Types.Date, default: Date.now },
	images: { type: Types.CloudinaryImages },
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },

});

previous.track = true;
previous.defaultSort = 'name';
previous.defaultColumns = 'name, publishedDate';
previous.register();
