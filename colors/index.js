/**
 * Created by Islam on 09.12.2016.
 */

module.exports = {
	getAvgColor: function(canvas){
		var ctx = canvas.getContext('2d');
		if(!ctx.getImageData) return null;
		var data = ctx.getImageData(0, 0, canvas.width, canvas.height),
			r = 0, g = 0, b = 0, a = 0, n = 0;
		for(var i = 0; i < data.length - 3; i+=4){
			n++;
			r += data[i];
			g += data[i+1];
			b += data[i+2];
			a += data[i+3];
		}
		return {
			r: r / n,
			g: g / n,
			b: b / n,
			a: a / n
		}
	}
};