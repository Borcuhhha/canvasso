var blur = require('./lib/blur');
var drawText = require('./lib/drawText');
var drawRect = require('./lib/drawRect');
var drawImage = require('./lib/drawImage');
var crossDomainImage = require('./lib/crossDomainImage');
var colors = require('./lib/colors');

module.exports = {
	blur: blur,
	drawText: drawText,
	drawRect: drawRect,
	drawImage: drawImage,
	crossDomainImage: crossDomainImage,
	getAvgColor: colors.getAvgColor,

	clear: function(canvas){
		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
	}
};