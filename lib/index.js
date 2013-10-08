#!/usr/bin/env node

'use strict';

/*jshint node:true */

/*
	Syntax:
		retinify <file.css>
		retinify <file.css> multiplier

	By default the multiplier is 2.

	The program outputs css, mapping background-position rules using the multiplier.
 */

var fs = require('fs');

var multiplier = 2;
var file = process.argv.pop();

if (!isNaN(file)) {
	multiplier = parseFloat(file);
	file = process.argv.pop();
}

if (multiplier < 0) {
	console.error('multiplier should be greater than 0 (%d)!', multiplier);
	process.exit(2);
}

//console.log('file: %s, multiplier: %d', file, multiplier);


var css;
try {
	css = fs.readFileSync(file).toString();
} catch (ex) {
	console.error('file %s not found!', file);
	process.exit(1);
}

var lines2 = [];
var lines = css.split('\n');




var rgx = /background\-position\s*:\s*(-?[0-9]*\.?[0-9]+)\s*(px|em|%|cm|mm|in|pt|pc)?\s+(-?[0-9]+)\s*(px|em|%|cm|mm|in|pt|pc)?/g;

lines.forEach(function(l) {
	var l2 = [];
	var start, end, x, xu, y, yu;
	var part, m;
	var start0 = 0;
	rgx.lastIndex = 0; // reset regexp state

	m = rgx.exec(l);
	while (m) {
		start = m.index;
		l2.push( l.substr(start0, start) );

		end = start + m[0].length;
		x  = m[1];
		xu = m[2];
		y  = m[3];
		yu = m[4];
		start0 = end;

		x *= multiplier;
		y *= multiplier;

		l2.push( [
			'background-position: ',
			x, xu || '',
			' ',
			y, yu || ''
		].join('') );

		//console.log( lines2[lines2.length-1] );

		m = rgx.exec(l);
	}

	l2.push( l.substr(start0) );

	lines2.push( l2.join('') );
});

var css2 = lines2.join('\n');
console.log(css2);
