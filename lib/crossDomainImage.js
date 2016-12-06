var hostname = window.location.hostname,
	crossDomainSupport = true,
	proxyURL,
	canvas,
	ctx,
	a;

var CrossDomainImage = module.exports = {

	create: function (urlOrImage, callback) {
		if(urlOrImage instanceof HTMLImageElement) {
			fromImage(urlOrImage, callback);
		}else if(typeof urlOrImage == "string"){
			fromURL(urlOrImage, callback);
		}else{
			callback && callback(new Error('First argument must be URL to image or HRMLImageElement'));
		}
	},

	createImages: function(urlOrImageArray, callback){
		var length = urlOrImageArray.length;
		var result = {};

		urlOrImageArray.forEach(function(urlOrImage){
			var src = urlOrImage && urlOrImage.originalSrc || urlOrImage;
			CrossDomainImage.create(urlOrImage, function(err, image){
				result[src] = err || image;
				if(!--length){
					callback(result);
				}
			})
		});
	},

	setProxyURL: function(url){
		if(parseHostname(url) != hostname){
			throw new Error('The hostname of the proxy must be equal to the hostname of the current page')
		}
		proxyURL = url;
	}
};


function fromURL(url, callback){
	var URL = getURL(url);
	if(!URL.value){
		callback && callback(new Error('Set you images proxy URL!'));
		return;
	}

	var image = new Image();
	image.setAttribute('crossOrigin', 'anonymous');
	image.src = URL.value;
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

}

function fromImage(img, callback){
	if(!img.complete || (parseHostname(img.src) != hostname && (img.getAttribute('crossOrigin') != 'anonymous' || !testCrossDomainSupport(img)))){
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
	var cross = false;
	if(parseHostname(url) != hostname){
		cross = true;
		if(forceProxy || !crossDomainSupport){
			if(proxyURL){
				cross = false;
				url = proxyURL + encodeURIComponent(url);
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