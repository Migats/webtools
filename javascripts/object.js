// JavaScript Document
window.speed = 30;
// JavaScript Document
var COLOR = {
	RED: '', GREEN: '', BLUE: '', RESULT: '', CONDITION: ''
}
var DEC_DIVIDE;
var COUNTER = 0;
function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}
function rgb(red,green,blue) {
	if (red % 17 == 0 && green % 17 == 0 && blue % 17 == 0) {
		COLOR.RED = (red / 17).toString(16);
		COLOR.GREEN = (green / 17).toString(16);
		COLOR.BLUE = (blue / 17).toString(16);
		if (COLOR.RED.length != 1) {
			COLOR.RED = 'not available'
		}
	} else {
		COLOR.RED = red.toString(16);
		COLOR.GREEN = green.toString(16);
		COLOR.BLUE = blue.toString(16);
		COLOR.RED = (COLOR.RED.length == 1) ? '0' + COLOR.RED : COLOR.RED;
		COLOR.GREEN = (COLOR.GREEN.length == 1) ? '0' + COLOR.GREEN : COLOR.GREEN;
		COLOR.BLUE = (COLOR.BLUE.length == 1) ? '0' + COLOR.BLUE : COLOR.BLUE;
	}
	COLOR.RESULT = '#' + COLOR.RED + COLOR.GREEN + COLOR.BLUE;
	if (COLOR.RESULT.length == 7 || COLOR.RESULT.length == 4) {
		return COLOR.RESULT;
	} else {
		return null;
	}
}
function to_rgb(color) {
	COLOR.CONDITION = color.charAt(0) == '#' && (color.length == 4 || color.length == 7);
	if (COLOR.CONDITION) {
		if (color.length == 4) {
			COLOR.RED = color.charAt(1);
			COLOR.GREEN = color.charAt(2);
			COLOR.BLUE = color.charAt(3);
		} else {
			COLOR.RED = color.substring(1,3);
			COLOR.GREEN = color.substring(3,5);
			COLOR.BLUE = color.substring(5,7);
		}
		COLOR.RED = parseInt(COLOR.RED,16);
		COLOR.GREEN = parseInt(COLOR.GREEN,16);
		COLOR.BLUE = parseInt(COLOR.BLUE,16);
		if (color.length == 4) {
			COLOR.RED *= 17;
			COLOR.GREEN *= 17;
			COLOR.BLUE *= 17;
		}
		return {
			red: COLOR.RED,
			green: COLOR.GREEN,
			blue: COLOR.BLUE
		}
	} else {
		return {
			red: NaN,
			green: NaN,
			blue: NaN
		};
	}
}
function die(err) {
	throw err;
}
function random_range(x1,x2) {
	return Math.random() * (x2 - x1) + x1;
}
function irandom_range(x1,x2) {
	Math.round(random_range(x1,x2));
}
function round_float(number,decimals) {
	DEC_DIVIDE = 1;
	COUNTER = 0;
	if (decimals % 1 != 0) {
		return NaN
	} else if (decimals < 0) {
		do {
			DEC_DIVIDE *= 10;
			COUNTER--;
		} while (COUNTER != decimals);
	} else if (decimals > 0) {
		do {
			DEC_DIVIDE /= 10;
			COUNTER++;
		} while (COUNTER != decimals);
	}
	if (decimals % 1 == 0) {
		return Math.round(number * DEC_DIVIDE) / DEC_DIVIDE;
	}
}
function choose(x1,x2,x3,x4,x5,_) {
	return arguments[Math.floor(Math.random() * arguments.length)];	
}
function deg(degrees) {
	return degrees * Math.PI / 180;
}
function to_deg(radials) {
	return radials * 180 / Math.PI;
}
function hsl(hue,saturation,lightness) {
	COLOR.CONDITION = true;
	if (hue < 0) {
		COLOR.CONDITION = false;
	} else if (hue < 40) {
		COLOR.RED = 255;
		COLOR.GREEN = hue * 255 / 40;
		COLOR.BLUE = 0;
	} else if (hue < 80) {
		COLOR.RED = (80 - hue) * 255 / 40;
		COLOR.GREEN = 255;
		COLOR.BLUE = 0;
	} else if (hue < 120) {
		COLOR.RED = 0;
		COLOR.GREEN = 255;
		COLOR.BLUE = (hue - 80) * 255 / 40;
	} else if (hue < 160) {
		COLOR.RED = 0;
		COLOR.GREEN = (160 - hue) * 255 / 40;
		COLOR.BLUE = 255;
	} else if (hue < 200) {
		COLOR.RED = (hue - 160) * 255 / 40;
		COLOR.GREEN = 0;
		COLOR.BLUE = 255;
	} else if (hue <= 240) {
		COLOR.RED = 255;
		COLOR.GREEN = 0;
		COLOR.BLUE = (240 - hue) * 255 / 60;
	} else {
		COLOR.CONDITION = false;
	}
	if (saturation < 0 || !COLOR.CONDITION) {
		COLOR.CONDITION = false;
	} else if (saturation <= 240) {
		COLOR.RED = 127.5 + (COLOR.RED - 127.5) * saturation / 240;
		COLOR.GREEN = 127.5 + (COLOR.GREEN - 127.5) * saturation / 240;
		COLOR.BLUE = 127.5 + (COLOR.BLUE - 127.5) * saturation / 240;
	} else {
		COLOR.CONDITION = false;
	}
	if (lightness < 0 || !COLOR.CONDITION) {
		COLOR.CONDITION = false;
	} else if (lightness < 120) {
		COLOR.RED *= lightness / 120;
		COLOR.GREEN *= lightness / 120;
		COLOR.BLUE *= lightness / 120;
	} else if (lightness <= 240) {
		COLOR.RED = 255 - (255 - COLOR.RED) * (240 - lightness) / 120;
		COLOR.GREEN = 255 - (255 - COLOR.GREEN) * (240 - lightness) / 120;
		COLOR.BLUE = 255 - (255 - COLOR.BLUE) * (240 - lightness) / 120;
	} else {
		COLOR.CONDITION = false;
	}
	if (COLOR.CONDITION) {
		COLOR.RED = Math.round(COLOR.RED)
		COLOR.GREEN = Math.round(COLOR.GREEN)
		COLOR.BLUE = Math.round(COLOR.BLUE)
		return rgb(COLOR.RED,COLOR.GREEN,COLOR.BLUE);
	} else {
		return null;
	}
}
function invert_color(color) {
	COLOR.RED = to_rgb(color).red;
	COLOR.GREEN = to_rgb(color).green;
	COLOR.BLUE = to_rgb(color).blue;
	COLOR.RED = 255 - COLOR.RED;
	COLOR.GREEN = 255 - COLOR.GREEN;
	COLOR.BLUE = 255 - COLOR.BLUE;
	return rgb(COLOR.RED,COLOR.GREEN,COLOR.BLUE);
}
function add_sprite(subImages,width,height) {
	var SUBIMAGES = [];
	for (init = 0; init <= arguments.length; init++) {
		SUBIMAGE = new Image();
		SUBIMAGE.src = arguments[init];
		SUBIMAGES.push(SUBIMAGES)
		this.width = width;
		this.height = height;
	}
	return this.SUBIMAGES;
}
function add_object(sprite,objectName) {
	this.sprite = sprite;
	this.x = undefined;
	this.y = undefined;
	this.hspeed = 0;
	this.vspeed = 0;
	this.z = 0;
	this.solid = false;
	this.visible = true;
	this.persident = false;
	this.usePhysics = false;
	color = '#FFF';
}
function create_object(object,x,y) {
	this.ANIMATE = function () {
		this.src = this.object.sprite[this.subImage++];
		this.x += hspeed;
		this.y += vspeed;
	}
	this.subImage = 1;
	this.object = object;
	EXISTINGIDS = [];
	this.id = '#0'
	do {
		this.id = '#' (Math.floor(random_range(0,16777216))).toString(16);
	} while (EXISTINGIDS.indexOf(this.id) != -1);
	EXISTINGIDS.push(this.id);
	object.draw_begin = new event // object draw begin event
	object.create = new event // object create event
	object.begin_step = new event // object step begin event
	setInterval(1000 / draw,window.speed)
	setInterval(drawGui,window.speed)
	setInterval(step,window.speed);
	setInterval(object.ANIMATE,window.speed);
	document.getElementById().getContext().drawImage(object.sprite[0],x,y);
}
window.onload = function () {
	var game;
	var new_window = document.getElementById('window');
	new_window.tagName = 'canvas';
	var window_context = new_window.getContext('2d');
	game.onload = new event;
}
function objectToArray(arObject) {
	var _returnvalue = [];
	for (var i = 0; arObject.length ? i < arObject.length : typeof arObject[i] != "undefined"; i++) {
		if (typeof i == "number") {
			_returnvalue.push(arObject[i]);
		}
	}
	return _returnvalue;
}