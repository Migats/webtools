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
var SELECTORS;
function Selector(selector) {
	SELECTORS = selector.split(' ');
	COUNTER = 0;
	ELEMENTRESULT = document
	do {
		ELEMENTRESULT = ELEMENTRESULT.querySelector(SELECTORS[COUNTER])	;
		COUNTER++;	
	} while (COUNTER != SELECTORS.length);
	return ELEMENTRESULT
}
var Y_JSONTEXT, Y_RESULT, RESULT;
function JSONText(jsontext) {
	Y_JSONTEXT = (typeof jsontext == 'string') ? JSON.parse(jsontext) : jsontext;
	RESULT = '';
	if (JSON.stringify(Y_JSONTEXT).charAt(0) == '[') {
		COUNTER = 0;
		do {
			if (typeof Y_JSONTEXT[COUNTER].text == 'string') {Y_RESULT = Y_JSONTEXT[COUNTER].text}
			if (typeof Y_JSONTEXT[COUNTER].color == 'string') {Y_RESULT.fontcolor(Y_JSONTEXT[COUNTER].color)}
			if (typeof Y_JSONTEXT[COUNTER].Bold == 'boolean') {if (Y_JSONTEXT[COUNTER].Bold) {Y_RESULT.bold()}}						
			if (typeof Y_JSONTEXT[COUNTER].Fixed == 'boolean') {if (Y_JSONTEXT[COUNTER].Fixed) {Y_RESULT.fixed()}}						
			if (typeof Y_JSONTEXT[COUNTER].italic == 'boolean') {if (Y_JSONTEXT[COUNTER].italic) {Y_RESULT.italics()}}						
			if (typeof Y_JSONTEXT[COUNTER].Sub == 'boolean') {if (Y_JSONTEXT[COUNTER].Sub) {Y_RESULT.sub()}}						
			if (typeof Y_JSONTEXT[COUNTER].Sup == 'boolean') {if (Y_JSONTEXT[COUNTER].Sup) {Y_RESULT.sup()}}						
			if (typeof Y_JSONTEXT[COUNTER].size == 'number') {Y_RESULT.fontsize(Y_JSONTEXT[COUNTER].size)}
			if (typeof Y_JSONTEXT[COUNTER].clickEvent == 'object') {if (Y_JSONTEXT[COUNTER].clickEvent.action == 'open_url') {Y_RESULT.link(Y_JSONTEXT[COUNTER].clickEvent.value)}}
			if (typeof Y_JSONTEXT[COUNTER].Strike == 'boolean') {if (Y_JSONTEXT[COUNTER].Strike) {Y_RESULT.strike()}}		RESULT += Y_RESULT;
			COUNTER++;
		} while (COUNTER != Y_JSONTEXT.length);
		return RESULT;
	} else {
		if (typeof Y_JSONTEXT.text == 'string') {Y_RESULT = Y_JSONTEXT.text}
		if (typeof Y_JSONTEXT.color == 'string') {Y_RESULT.fontcolor(Y_JSONTEXT.color)}
		if (typeof Y_JSONTEXT.Bold == 'boolean') {if (Y_JSONTEXT.Bold) {Y_RESULT.bold()}}						
		if (typeof Y_JSONTEXT.Fixed == 'boolean') {if (Y_JSONTEXT.Fixed) {Y_RESULT.fixed()}}						
		if (typeof Y_JSONTEXT.italic == 'boolean') {if (Y_JSONTEXT.italic) {Y_RESULT.italics()}}						
		if (typeof Y_JSONTEXT.Sub == 'boolean') {if (Y_JSONTEXT.Sub) {Y_RESULT.sub()}}						
		if (typeof Y_JSONTEXT.Sup == 'boolean') {if (Y_JSONTEXT.Sup) {Y_RESULT.sup()}}						
		if (typeof Y_JSONTEXT.size == 'number') {Y_RESULT.fontsize(Y_JSONTEXT.size)}
		if (typeof Y_JSONTEXT.clickEvent == 'object') {if (Y_JSONTEXT.clickEvent.action == 'open_url') {Y_RESULT.link(Y_JSONTEXT.clickEvent.value)}}
		if (typeof Y_JSONTEXT.Strike == 'boolean') {if (Y_JSONTEXT.Strike) {Y_RESULT.strike()}}
		return Y_RESULT;
	}
}