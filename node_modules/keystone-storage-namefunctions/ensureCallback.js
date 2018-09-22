/*
This is a utility function for ensuring custom generateFilename methods
implement the standard async interfact that Keystone Storage Adapters expect.

Arguments for a generateFilename method are (file) or (file, attempt)

Callbacks are optional, so if the function takes less than three arguments we
put it inside an async wrapper.
*/

module.exports = function ensureCallback(fn) {
	if (fn.length <= 2) { // (file) or (file, attempt)
		// If generateFilename throws we treat that as a runtime error and not
		// a file data error. If you need to pass errors upstream take a
		// callback.
		var original = fn;
		fn = function (file, attempt, callback) {
			callback(null, original(file, attempt));
		};
	}
	return fn;
}
