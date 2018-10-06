var keystone = require('keystone');
var Types = keystone.Field.Types;

var Quiz = new keystone.List('Quiz', {
	nodelete: false,

	autokey: { from: 'name', path: 'key', unique: true },
	plural: 'quiz',
	singular: 'quiz',
});

Quiz.add({
	name: { type: String, required: true },
	publishedDate: { type: Types.Date, default: Date.now },
	// images: { type: Types.CloudinaryImages },
	Sem: { type: Types.Select, options: [
		{ value: '1st sem', label: "1st sem" },
		{ value: '2nd sem', label: "2nd sem" },
		{ value: '3rd sem', label: "3rd sem" },
		{ value: '4th sem', label: "4th sem" },
		{ value: '5th sem', label: "5th sem" },
		{ value: '6th sem', label: "6th sem" },
		{ value: '7th sem', label: "7th sem" },
		{ value: '8th sem', label: "8th sem" },

	], required: false },
	Branch: { type: Types.Select, options: [
		{ value: 'ETC', label: "ETC" },
		{ value: 'CSE', label: "Cse" },
		{ value: 'Mech', label: "Mech" },
		{ value: 'IT', label: "IT" },
		{ value: 'Archi', label: "Archi" },

		{ value: 'BioTech', label: "BioTech" },
		{ value: 'BioMed', label: "BioMed" },
		{ value: 'Chem', label: "Chem" },
		{ value: 'Meta', label: "Meta" },
		{ value: 'MCA', label: "MCA" },
		{ value: 'Mining', label: "Mining" },
		{ value: 'Electrical', label: "Electrical" },	], required: false },
		// topics: { type: Types.Relationship, ref: 'GalleryCategory', many: true },
        questions: { type: Types.Relationship, ref: 'Question', many: true },
		Topics: { type: String,initial: "topics of the test", required: false },


});

Quiz.track = true;
Quiz.defaultSort = 'name';
Quiz.defaultColumns = 'name, publishedDate, Sem, Branch';
Quiz.register();
