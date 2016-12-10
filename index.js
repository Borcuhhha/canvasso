var blur = require('./blur');
var drawText = require('./drawText');
var drawImage = require('./drawImage');
var crossDomainImage = require('./lib/crossDomainImage');
var colors = require('./colors');

module.exports = {
	blur: blur,
	drawText: drawText,
	drawImage: drawImage,
	crossDomainImage: crossDomainImage,
	getAvgColor: colors.getAvgColor,

	clear: function(canvas){
		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
	}
};