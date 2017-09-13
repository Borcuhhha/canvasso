/**
 * Draw image to canvas
 * @param {HTMLCanvasElement} canvas
 * @param {HTMLImageElement} img
 * @param {Object} [params]
 * @param {Number} [params.lineWidth]
 * @param {Number} [params.x]
 * @param {Number} [params.y]
 * @param {Number} [params.w]
 * @param {Number} [params.h]
 * @param {Number} [params.alpha]
 * @param {Boolean} [params.zoom]
 * @param {Boolean} [params.rounded]
 * @param {String} [params.strokeStyle]
 */
export default function drawImage(canvas, img, params={}){
	let x = params.x || 0,
		y = params.y || 0,
		w = params.w || img.naturalWidth,
		h = params.h || img.naturalHeight,
		lw = params.lineWidth,
		ctx = canvas.getContext('2d');

	ctx.save();

	if(params.zoom){
		let dd = Math.max(canvas.width / w, canvas.height / h);
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
		let radius = w/2;
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
	ctx.drawImage(img,x,y,w,h);
	if(lw){
		if(!params.rounded){
			ctx.strokeRect(x, y, w, h);
		}else{
			ctx.stroke();
		}
	}
	ctx.restore();
};