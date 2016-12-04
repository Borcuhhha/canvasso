module.exports = function drawImage(canvas, img, params){
	params = params || {};
	var lw = params.lineWidth,
		x = params.x || 0,
		y = params.y || 0,
		w = params.w || image.naturalWidth,
		h = params.h || image.naturalHeight,
		ctx = canvas.getContext('2d');

	ctx.save();

	if(params.zoom){
		var dd = Math.max(canvas.width / w, canvas.height / h);
		w *= dd;
		h *= dd;
		x = (canvas.width-w)/2;
		y = (canvas.height-h)/2;
	}

	if(lw){
		ctx.lineWidth = lw;
		ctx.strokeStyle = params.strokeStyle || 'white';
	}

	if(params.rounded){
		var radius = w/2;
		ctx.beginPath();
		ctx.arc(x + radius, y + radius, radius, 0, Math.PI*2, true);
		ctx.closePath();
		if(lw){
			ctx.stroke();
		}
		ctx.clip();
	}
	ctx.globalAlpha = params.alpha || 1;
	ctx.shadowBlur = 0;
	ctx.drawImage(image,x,y,w,h);
	if(lw){
		if(!params.rounded){
			ctx.strokeRect(x, y, w, h);
		}else{
			ctx.stroke();
		}
	}
	ctx.restore();
};