/**
	Implements a loop to try and generate a filename that doesn't already exist

	Ensure the adapter implements a `fileExists(filename, callback)` method as
	`Adapter.prototype.fileExists` that invokes the callback with
	`callback(Object err, Boolean exists)`

	Ensure the instance has an options object with a positive numeric value for
	`this.options.retryAttempts`
*/
exports.retryFilename = function (attempt, file, callback) {
	var self = this;
	if (attempt > self.options.retryAttempts) {
		return callback(Error('Unique filename could not be generated; Maximum attempts exceeded'));
	}
	self.options.generateFilename(file, attempt, function (err, filename) {
		if (err) return callback(err);
		self.fileExists(filename, function (err, exists) {
			if (err) return callback(err);
			if (exists) return self.retryFilename(attempt + 1, file, callback);
			callback(null, filename);
		});
	});
};

/**
	Gets a filename for uploaded files based on the adapter options

	Ensure the adapter implements the `retryFilename` method above as
	`Adapter.prototype.retryFilename`

	Ensure the adapter implements a `fileExists(filename, callback)` method as
	`Adapter.prototype.fileExists` that invokes the callback with
	`callback(Object err, Boolean exists)`

	Ensure the instance has an options object with a string value for
	`this.options.whenExists` that is one of `"overwrite"`, `"error"` or `"retry"`
*/
exports.getFilename = function (file, callback) {
	var self = this;
	switch (self.options.whenExists) {
		case 'overwrite':
			self.options.generateFilename(file, 0, callback);
			break;
		case 'error':
			self.options.generateFilename(file, 0, function (err, filename) {
				if (err) return callback(err);
				self.fileExists(filename, function (err, result) {
					if (err) return callback(err);
					if (result === true) return callback(Error('File already exists'));
					callback(null, filename);
				});
			});
			break;
		case 'retry':
			self.retryFilename(0, file, callback);
			break;
	}
};
