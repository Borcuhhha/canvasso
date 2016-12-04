/**
 * Created by Islam on 02.12.2016.
 */

var blur = require('./blur');
var drawText = require('./drawText');
var drawImage = require('./drawImage');
var crossDomainImage = require('./lib/crossDomainImage');

module.exports = {
	blur: blur,
	drawText: drawText,
	drawImage: drawImage,
	crossDomainImage: crossDomainImage
};