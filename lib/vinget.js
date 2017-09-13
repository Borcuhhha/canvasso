'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (canvas) {
	var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	var ctx = canvas.getContext('2d'),
	    x = canvas.width / 2,
	    y = canvas.height / 2,
	    g = ctx.createRadialGradient(x, y, Math.max(canvas.width, canvas.height) / 2, x, y, 0);

	ctx.save();

	g.addColorStop(0, params.color || 'black');
	g.addColorStop(0.5, params.color2 || 'transparent');
	ctx.fillStyle = g;
	ctx.globalAlpha = params.alpha || 1;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.restore();
};

; /**
   * Created by Islam on 23.04.2017.
   */

/**
 * Add vinget effect to canvas
 * @param {HTMLCanvasElement} canvas
 * @param {Object} [params]
 * @param {String} [params.color]
 * @param {String} [params.color2]
 * @param {Number} [params.alpha]
 */