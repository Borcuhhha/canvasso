/**
 * Created by Islam on 11.12.2016.
 */

module.exports = function drawReact(canvas, x, y, w, h, params){
	var ctx = canvas.getContext('2d');
	params = params || {};

	ctx.save();

	if(params.fillStyle){
		ctx.fillStyle = params.fillStyle;
		ctx.fillRect(x, y, w, h);
	}

	if(params.lineWidth !== 0){
		ctx.lineWidth = params.lineWidth || 2;
		ctx.strokeStyle = params.strokeStyle || "white";
		ctx.strokeRect(x, y, w, h);
	}

	ctx.restore();
};