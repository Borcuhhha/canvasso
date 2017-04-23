var blur = require('./lib/blur'),
	drawText = require('./lib/drawText'),
	drawRect = require('./lib/drawRect'),
	drawImage = require('./lib/drawImage'),
	vinget = require('./lib/vinget'),
	crossDomainImage = require('./lib/crossDomainImage'),
	colors = require('./lib/colors');

module.exports = {
	blur: blur,
	drawText: drawText,
	drawRect: drawRect,
	drawImage: drawImage,
	vinget: vinget,
	crossDomainImage: crossDomainImage,
	getAvgColor: colors.getAvgColor,

	clear: function(canvas){
		canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
	}
};