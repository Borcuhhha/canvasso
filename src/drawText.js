/**
 * Draw text to canvas
 * @param {HTMLCanvasElement} canvas
 * @param {string} text
 * @param {number} x
 * @param {number} y
 * @param {object} [params]
 * @param {string} [params.color]
 * @param {number} [params.shadowBlur]
 * @param {string} [params.shadowColor]
 * @param {number} [params.alpha]
 * @param {number} [params.size]
 * @param {boolean} [params.italic]
 * @param {boolean} [params.bold]
 * @param {string} [params.fontFamily]
 * @param {number} [params.maxWidth]
 * @param {boolean} [params.centered]
 * @param {boolean} [params.onlyMeasure]
 * @param {string} params.halign
 * @param {string} params.valign
 * @returns {{width: Number, fontSize: (number|*)}}
 */


export default function drawText(canvas, text, x, y, params = {}){
	let ctx = canvas.getContext('2d');
	ctx.save();

	ctx.fillStyle = params.color || 'white';
	ctx.shadowBlur = params.shadowBlur === 0 ? 0 : (params.shadowBlur || 5);
	ctx.shadowColor = params.shadowColor || 'black';
	ctx.globalAlpha = params.alpha || 1;
	params.size = params.size || 15;

	do{
		ctx.font = (params.italic ? 'italic ' : '') + (params.bold ? 'bold ' : '') + params.size + 'px ' + (params.fontFamily || 'Ubuntu, sans-serif');
		params.size -= 1;
	}while(params.size > 1 && params.maxWidth && ctx.measureText(text).width > params.maxWidth);
	params.size++;

	let w = ctx.measureText(text).width;

	if(params.centered){
		x = x - w/2;
	}
	if(params.halign === 'right'){
		x = canvas.width - w - x;
	}
	if(params.valign === 'bottom'){
		y = canvas.height - y;
	}

	if(!params.onlyMeasure)
		ctx.fillText(text, x, y);

	let textParams = {
		width: ctx.measureText(text).width,
		fontSize: params.size
	};
	ctx.restore();
	return textParams;
};
