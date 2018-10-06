const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

keystone.pre('routes', function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'Doubts', key: 'doubts', href: '/blog' },
		{ label: 'Notes', key: 'gallery', href: '/notes' },
		{ label: 'Enquiry', key: 'contact', href: '/contact' },
		{ label: 'Previous Years', key: 'previous', href: '/previous' },
		{ label: 'CPI', key: 'cpi', href: '/cpi' },
		{ label: 'Quiz', key: 'quiz', href: '/quiz' },

	];
	res.locals.user = req.user;
	next();
});

keystone.pre('render', middleware.theme);
keystone.pre('render', middleware.flashMessages);

keystone.set('404', function (req, res, next) {
    middleware.theme(req, res, next);
	res.status(404).render('errors/404');
});

// Load Routes
var routes = {
	download: importRoutes('./download'),
	views: importRoutes('./views'),
};

exports = module.exports = function (app) {

	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.all('/blog/post/:post', routes.views.post);
	app.get('/notes', routes.views.gallery);
	app.all('/contact', routes.views.contact);
	app.all('/previous', routes.views.previous);
	app.all('/cpi', routes.views.cpi);
	// app.all('/doubts', routes.views.doubts);
	app.all('/quiz', routes.views.quiz)
	app.all('/quiz/list', routes.views.question)
	app.all('/quiz/:id', routes.views.quiz_detail)
	// Downloads
	app.get('/download/users', routes.download.users);

}
