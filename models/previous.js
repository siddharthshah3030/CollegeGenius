var keystone = require('keystone');
var Types = keystone.Field.Types;

var Previous = new keystone.List('Previous', {
	nodelete: false,

	autokey: { from: 'name', path: 'key', unique: true },
	plural: 'Previous Year Question Paper',
	singular: 'Previous Year Questions Papers',
});

Previous.add({
	name: { type: String, required: true },
	publishedDate: { type: Types.Date, default: Date.now },
	images: { type: Types.CloudinaryImages, many:true },
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
		// topics: { type: Types.Relationship, ref: 'previouscategory', many: true },


		Year: { type: Types.Select, options: [
			{ value: '2015', label: "2015" },
			{ value: '2016', label: "2016" },
			{ value: '2017', label: "2017" },
			{ value: '2018', label: "2018" },
			{ value: '2019', label: "2019" },
			{ value: '2014', label: "2014" },
			{ value: '2013', label: "2013" },
			{ value: '2012', label: "2012" },
			{ value: '2011', label: "2011" },
			{ value: '2010', label: "2010" },			
		], required: false },
		Exam: { type: Types.Select, options: [
			{ value: 'EndSem', label: "EndSem" },
			{ value: 'CT1', label: "CT1" },
			{ value: 'CT2', label: "CT2" },]
		}

});

Previous.track = true;
Previous.defaultSort = 'name';
Previous.defaultColumns = 'name,topics, publishedDate, Sem, Branch';
Previous.register();
