var compressor = require('node-minify')
		util = require('util'),
		fs = require('fs'),
		EventEmitter = require('events').EventEmitter;

function AutoMinify(options) {
	EventEmitter.call(this);

	var originalCallback = options.callback,
			filesToMinify = options.fileIn,
			self = this,
			minifier;

	options.callback = minificationDone;
	minifier = new compressor.minify(options)

	if (!Array.isArray(filesToMinify)) {
		filesToMinify = [filesToMinify];
	}

	filesToMinify.forEach(function(fileToWatch) {
		fs.watch(fileToWatch, function(event, filename) {
			minifier.compress();
		});
	});

	function minificationDone(err) {
		self.emit('minified', options.fileOut);

		// invoke callback given in options when creating auto minifier
		if (typeof originalCallback !== 'undefined') {
			originalCallback(err);
		}
	}
}

util.inherits(AutoMinify, EventEmitter);

module.exports = AutoMinify;