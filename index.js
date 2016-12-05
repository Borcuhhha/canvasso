var blur = require('./blur');
var drawText = require('./drawText');
var drawImage = require('./drawImage');
var crossDomainImage = require('./lib/crossDomainImage');

module.exports = {
	blur: blur,
	drawText: drawText,
	drawImage: drawImage,
	crossDomainImage: crossDomainImage,

	clear: function(canvas){
		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
	}
};