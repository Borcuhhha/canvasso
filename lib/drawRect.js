"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = drawReact;
/**
 * Created by Islam on 11.12.2016.
 */

/**
 * Draw rectangle to canvas
 * @param {HTMLCanvasElement} canvas
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 * @param {Object} [params]
 * @param {Number} [params.alpha]
 * @param {Number} [params.lineWidth]
 * @param {Number} [params.shadowBlur]
 * @param {String} [params.shadowColor]
 * @param {String} [params.strokeStyle]
 * @param {*} [params.fillStyle]
 */
function drawReact(canvas, x, y, w, h) {
  var params = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

  var ctx = canvas.getContext('2d');

  ctx.save();

  ctx.globalAlpha = params.alpha === 0 ? 0 : params.alpha || 1;
  if (params.fillStyle) {
    ctx.fillStyle = params.fillStyle;
    ctx.fillRect(x, y, w, h);
  }
  if (params.lineWidth !== 0) {
    ctx.lineWidth = params.lineWidth || 2;
    ctx.shadowBlur = params.shadowBlur || 0;
    ctx.shadowColor = params.shadowColor || "white";
    ctx.strokeStyle = params.strokeStyle || "white";
    ctx.strokeRect(x, y, w, h);
  }

  ctx.restore();
};