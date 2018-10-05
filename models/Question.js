var keystone = require('keystone');
var Types = keystone.Field.Types;

var Question = new keystone.List('Question', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'question',
});

Question.add({
    name: { type: String, required: true },
    c1: { type: String, required: false },
    c2: { type: String, required: false },
    c3: { type: String, required: false },
    c4: { type: String, required: false },
    ans:  { type: String, required: false },
});

Question.relationship({ ref: 'Quiz', refPath: 'Quiz' });

Question.track = true;
Question.register();
