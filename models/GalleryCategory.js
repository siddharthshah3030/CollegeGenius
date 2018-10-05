var keystone = require('keystone');
var Types = keystone.Field.Types;

var GalleryCategory = new keystone.List('GalleryCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Topics',        
});

GalleryCategory.add({
	name: { type: String, required: true },
});

GalleryCategory.relationship({ ref: 'Gallery', refPath: 'categories' });

GalleryCategory.track = true;   
GalleryCategory.register();
