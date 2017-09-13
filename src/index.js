import blur from './blur';
import drawText from './drawText';
import drawRect from './drawRect';
import drawImage from './drawImage';
import vinget from './vinget';
import colors from './colors';
import crossDomainImage from './crossDomainImage';

function clear(canvas){
	canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

export {
	blur,
	drawText,
	drawRect,
	drawImage,
	vinget,
	colors,
	crossDomainImage,
	clear,
};
