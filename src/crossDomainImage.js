let hostname = window.location.hostname,
	crossDomainSupport = true,
	proxyURL,
	argName,
	sEnc,
	canvas,
	ctx,
	a;


function fromURL(url, callback){
	let URL = getURL(url);
	if(!URL.value){
		callback && callback(new Error('Set you images proxy URL!'));
		return;
	}
	let image = new Image();
	image.onerror = function(){
		if(URL.crossdomain){
			URL = getURL(URL.value, true);
			image.src = URL.value;
		}else{
			callback && callback(new Error('Image loading failed!'));
		}
	};
	image.onload = function(){
		image.originalSrc = url;
		fromImage(image, callback);
	};
	image.setAttribute('crossOrigin', 'anonymous');
	image.src = URL.value;
}
function fromImage(img, callback){
	if(!img.complete || (parseHostname(img.src) !== hostname && (img.getAttribute('crossOrigin') !== 'anonymous' || !testCrossDomainSupport(img)))){
		fromURL(img.src, callback); return;
	}
	img.originalSrc = img.originalSrc || img.src;
	callback && callback(null, img);
}
function testCrossDomainSupport(img){
	if(!canvas){
		canvas = document.createElement('canvas');
		canvas.width = 1;
		canvas.height = 1;
		ctx = canvas.getContext('2d');
	}
	try{
		ctx.drawImage(img, 0, 0, 1, 1, 0, 0, 1, 1);
		canvas.toDataURL();
		return true;
	}catch (e){
		canvas = null;
		crossDomainSupport = false;
		return false;
	}
}
function getURL(url, forceProxy){
	let cross = false;
	if(parseHostname(url) !== hostname){
		cross = true;
		if(forceProxy || !crossDomainSupport){
			if(proxyURL){
				cross = false;
				url = proxyURL + (argName ? argName + "=" : "") + (sEnc ? encodeURIComponent(url) : url);
			}else{
				url = null;
			}
		}
	}
	return {
		value: url,
		crossdomain: cross
	}
}
function parseHostname(url){
	a = a || document.createElement('a');
	a.href = url;
	return a.hostname;
}

const CrossDomainImage = {
	create: function (urlOrImage, callback) {
		if(urlOrImage instanceof HTMLImageElement) {
			fromImage(urlOrImage, callback);
		}else if(typeof urlOrImage === "string"){
			fromURL(urlOrImage, callback);
		}else{
			callback && callback(new Error('First argument must be URL to image or HRMLImageElement'));
		}
	},

	createImages: function(urlOrImageArray, callback){
		let length = urlOrImageArray.length,
			result = {};

		urlOrImageArray.forEach(function(urlOrImage){
			let src = urlOrImage && urlOrImage.originalSrc || urlOrImage;
			CrossDomainImage.create(urlOrImage, function(err, image){
				result[src] = err || image;
				if(!--length){
					callback(result);
				}
			})
		});
	},

	/**
	 * @param url - Proxy url. example: https://site.com/images/proxy
	 * @param argname - if need set name for image url parameter
	 * @param shouldencoding - should use encodeURIComponent for image url
	 */
	setProxyURL: function(url, argname, shouldencoding){
		if(parseHostname(url) !== hostname){
			throw new Error('The hostname of the proxy must be equal to the hostname of the current page')
		}
		proxyURL = url;
		argName = argname;
		sEnc = shouldencoding;
	}
};

export default CrossDomainImage;