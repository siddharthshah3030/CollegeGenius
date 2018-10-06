var keystone = require('keystone');
var Types = keystone.Field.Types;

var User = new keystone.List('User', {
	// nodelete prevents people deleting the demo admin user
	nodelete: true,
});

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true, unique: true },
	phone: { type: String, width: 'short' },
	photo: { type: Types.CloudinaryImage, collapse: true },
	// isadmin: { type: Boolean,  initial: true, required: false },
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

	password: { type: Types.Password, initial: true, required: false },
},{
	isProtected: { type: Boolean, noedit: false },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	// console.log("checking if admin ");
	// console.log(this)
	if(this.isadmin==true)
	return true;
	else 
	return true;

});

User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });

User.schema.methods.wasActive = function () {
	this.lastActiveOn = new Date();
	return this;
}

/**
 * DEMO USER PROTECTION
 * The following code prevents anyone updating the default admin user
 * and breaking access to the demo
 */

function protect (path) {
	User.schema.path(path).set(function (value) {
		return (this.isProtected && this.get(path)) ? this.get(path) : value;
	});
}

['name.first', 'name.last', 'email', 'isProtected'].forEach(protect);

User.schema.path('password').set(function (newValue) {
	// the setter for the password field is more complicated because it has to
	// emulate the setter on the password type, and ensure hashing before save
	// also, we can't currently escape the hash->set loop, so the hash is harcoded
	// for the demo user for now.
	if (this.isProtected) return '$2a$10$fMeQ6uNsJhJZnY/6soWfc.Mq8T3MwANJK52LQCK2jzw/NjE.JBHV2';
	this.__password_needs_hashing = true;
	return newValue;
});

/**
 * END DEMO USER PROTECTION
 */

User.track = true;
User.defaultColumns = 'name, email, phone, photo,Sem, Branch';
User.register();
