# keystone-storage-namefunctions

Simple functions for generating filenames.

Bundled with [KeystoneJS](http://keystonejs.com)

## Included Methods

* `contentHashFilename` Calculate the filename from the sha1 hash of the file
  contents
* `originalFilename` Return the original filename provided in the file object
* `randomFilename` Generate a random filename

## Other modules in this package

### `prototypeMethods`

Two methods are included to help reduce code repetition in adapters that can be
added to the adapter `prototype` when you want to handle filename generation:

* `getFilename` - used to generate a filename for a given `file` object
* `retryFilename` - used to retry a number of times when the `whenExists`
  option value is `"retry"` (see below)

These methods both depend on a `fileExists(filename, callback)` method being
implemented on the adapter, and an `options` object on the adapter instance
with the following keys:

* `options.generateFilename` - a method to generate the filename, e.g. from
  this package
* `options.whenExists` - one of `"overwrite"`, `"error"` or `"retry"`
* `options.retryAttempts` - the maximum number of retry attempts when the
  `whenExists` option value is `"retry"`

Use them like this:

```js
var prototypeMethods = require('keystone-storage-namefunctions/prototypeMethods');
Adapter.prototype.getFilename = prototypeMethods.getFilename;
Adapter.prototype.retryFilename = prototypeMethods.retryFilename;
Adapter.prototype.fileExists = function (filename, callback) {
	var result = false; // replace with actual logic
	callback(null, result);
}
Adapter.prototype.uploadFile = function (file, callback) {
	this.getFilename(file, function (err, filename) {
		// move the file into place
	});
};
```

### `ensureCallback` utility

The `ensureCallback` method is also included, to standardise sync filename
method call signatures. Use it like this:

```js
var ensureCallback = require('keystone-storage-namefunctions/ensureCallback');
function originalFilename (file, index) {
	return file.originalname;
}
var asyncOriginalFilename = ensureCallback(originalFilename);
asyncOriginalFilename(file, index, function (err, result) {
	// result === file.originalname
});
```

## License

Licensed under The MIT License. Copyright (c) 2016 Jed Watson
