/**
 * Created by Islam on 23.04.2017.
 */

module.exports = function(canvas, params){
	params = params || {};
	var ctx = canvas.getContext('2d');
	ctx.save();
	var x = canvas.width/2;
	var y = canvas.height/2;
	var g = ctx.createRadialGradient(x, y, Math.max(canvas.width, canvas.height)/2, x, y, 0);
	g.addColorStop(0, params.color || 'black');
	g.addColorStop(0.5, params.color2 || 'transparent');
	ctx.fillStyle = g;
	ctx.globalAlpha = params.alpha || 1;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.restore();
};