node-auto-minify
================

Wrapper around the [node-minify module](https://github.com/srod/node-minify) which automatically re-minifies files when changed.

Why?
----
I wanted a daemon running which automatically minified my JS files whenever they got updated. 

Usage
-----
More or less just like srod's [node-minify module](https://github.com/srod/node-minify). Also has a minified-event which fires whenever a minified package has been produced.

```js
new minifier({
    type: 'gcc',
    fileIn: 'in.js',
    fileOut: 'out.js'
}).on('minified',function(fileOutName) {
	console.log('Minified packaged updated: %s', fileOutName);
});
```

Known issues
------------
The module uses fs.watch() to spy in the input files for change, which is known to be unstable.