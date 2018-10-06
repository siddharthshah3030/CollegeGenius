var keystone = require('keystone');
var Types = keystone.Field.Types;

var Notification = new keystone.List('Notification', {
	nodelete: false,

	autokey: { from: 'name', path: 'key', unique: true },
	plural: 'notifications',
	singular: 'notification',
});

Notification.add({
	name: { type: String, required: true },
	publishedDate: { type: Types.Date, default: Date.now },
	registration_date: { type: Types.Date,  },
	event_date: { type: Types.Date,  },
	images: { type: Types.CloudinaryImages },


});

Notification.track = true;
Notification.defaultSort = 'topics';
Notification.defaultColumns = 'name,event_date, publishedDate, registration_date';
Notification.register();
