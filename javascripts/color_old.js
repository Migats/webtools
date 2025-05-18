// JavaScript Document
Math.clamp = function (number,min,max) {return Math.max(Math.min(number,max),min)};
Math.sign = function (number) {return number > 0 ? 1 : number < 0 ? -1 : 0};
function _Color(number,opacity) {
	this.numberValue = 0;

	if (!isNaN(number)) {
		if (arguments.length === 1 || isNaN(opacity)) {
			this.numberValue = number & 0xffffffff
		} else {
			this.numberValue = number << 8 & 0xffffff00 | Math.clamp(opacity*255,0,255) & 0xff
		}
	}
	if (typeof number == "string") {
		var c = document.createElement("canvas");

		var ctx = c.getContext("2d");

		c.width = c.height = 1;
ctx.fillStyle = number;
ctx.fillRect(0,0,1,1);
		var d = ctx.getImageData(0,0,1,1);
		this.numberValue = d[0] << 24 | d[1] << 16 | d[2] << 8 | d[3]*Math.clamp(opacity,0,1) & 0xff};
if (typeof number == "boolean") {this.numberValue = 0xffffff00*number | Math.clamp(opacity*255,0,255) & 0xff};
if (typeof number != "object" && typeof number != "string" && typeof number != "number" && typeof number != "boolean") {throw TypeError("Could not construct a color from " + String(number))};
if (typeof number == "object" && number.constructor !== _Color) {if ((number.constructor === Array || number.constructor === Uint8Array) && number.length > 2) {for (var i=0;
i<number.length;
i++) {number[i] = number[i] & 0xff};
this.numberValue = number[0] << 24 | number[1] << 16 | number[2] << 8 | number[3]*Math.clamp(opacity,0,1) & 0xff};
if (!isNaN(number.r) && !isNaN(number.g) && !isNaN(number.b)) {this.numberValue = Math.clamp(number.r*255,0,255) << 24 & 0xff000000 | Math.clamp(number.g*255,0,255) << 16 & 0xff0000 | Math.clamp(number.b*255,0,255) << 8 & 0xff00 | Math.clamp((opacity || number.a)*255,0,255) & 0xff};
if (!isNaN(number.red) && !isNaN(number.green) && !isNaN(number.blue)) {this.numberValue = number.red << 24 & 0xff000000 | number.green << 16 & 0xff0000 | number.blue << 8 & 0xff00 | Math.clamp(alpha,0,1)*Math.clamp(opacity,0,1) & 0xff};
if (!isNaN(number.hue) && (!isNaN(number.saturation) || !isNaN(number.intensity)) && (!isNaN(number.lightness) || !isNaN(number.value))) {
	var c = (1 - Math.abs(2*Math.clamp(number.lightness,0,1) - 1))*Math.clamp(number.saturation || number.intensity,0,1);
var x = c * (1 - Math.abs((number.hue * 3 / Math.PI) % 2 - 1));
var m = Math.clamp(number.lightness,0,1) - c/2;
if (!isNaN(number.value)) {c = Math.clamp(number.value,0,1) * Math.clamp(number.saturation || number.intensity,0,1);
m = Math.clamp(number.value) - c};

		if (number.hue % (Math.PI*2) < Math.PI/3) {var rgbb = [c,x,0]} else if (number.hue % (Math.PI*2) < Math.PI/1.5) {var rgbb = [x,c,0]} else if (number.hue % (Math.PI*2) < Math.PI) {var rgbb = [0,c,x]} else if (number.hue % (Math.PI*2) < Math.PI/0.75) {var rgbb = [0,x,c]} else if (number.hue % (Math.PI*2) < Math.PI/0.6) {var rgbb = [x,0,c]} else if (number.hue % (Math.PI*2) < Math.PI*2) {var rgbb = [c,0,x]};
var rgb = [(rgbb[0]+m)*255 & 255,(rgbb[1]+m)*255 & 255,(rgbb[2]+m)*255 & 255];
this.numberValue = rgb[0] << 24 | rgb[1] << 16 | rgb[2] << 8 | Math.clamp(alpha,0,1)*Math.clamp(opacity,0,1) & 0xff}};
if (!isNaN(number.cyan) && !isNaN(number.magenta) && !isNaN(number.yellow)) {var cmy = [Math.clamp(number.cyan,0,1),Math.clamp(number.magenta,0,1),Math.clamp(number.yellow,0,1)];
var rgb = [255*(1-cmy[0])*Math.clamp(1-number.key,0,1) & 255,255*(1-cmy[1])*Math.clamp(1-number.key,0,1) & 255,255*(1-cmy[2])*Math.clamp(1-number.key,0,1) & 255];
var alpha = Math.clamp(number.key,0,1) / (1-Math.max(rgb[0]/255,rgb[1]/255,rgb[2]/255));
if (!isNaN(opacity)) {alpha = opacity};
this.numberValue = rgb[0] << 24 | rgb[1] << 16 | rgb[2] << 8 | Math.clamp(alpha,0,1)*Math.clamp(opacity,0,1) & 0xff};
if (number.constructor === _Color) {this.numberValue = number.numberValue}};

_Color.prototype = {
	constructor: _Color,
	get red() {return this.numberValue >> 24 & 255},
	get green() {return this.numberValue >> 16 & 255},
	get blue() {return this.numberValue >> 8 & 255},
	get alpha() {return (this.numberValue & 255)/255},
	get opacity() {return this.alpha},
	get hue() {
		if (Math.max(this.red,this.green,this.blue) === Math.min(this.red,this.green,this.blue)) {
			return 0
		} else if (Math.max(this.red,this.green,this.blue) === this.red) {
			return Math.PI * ((this.green-this.blue/(Math.max(this.red,this.green,this.blue) - Math.min(this.red,this.green,this.blue)) + 6) % 6) / 3
		} else if (Math.max(this.red,this.green,this.blue) === this.green) {
			return Math.PI * (this.blue-this.red/(Math.max(this.red,this.green,this.blue) - Math.min(this.red,this.green,this.blue)) + 2) / 3
		} else if (Math.max(this.red,this.green,this.blue) === this.blue) {
			return Math.PI * (this.red-this.green/(Math.max(this.red,this.green,this.blue) - Math.min(this.red,this.green,this.blue)) + 4) / 3
		}
	},
	get saturation() {return this.value === 0 ? 0 : (Math.max(this.red,this.green,this.blue) - Math.min(this.red,this.green,this.blue)) / Math.max(this.red,this.green,this.blue)},
	get value() {return Math.max(this.red,this.green,this.blue) / 255},
	get intensity() {
		return Math.clamp(Math.max(this.red,this.green,this.blue) === Math.min(this.red,this.green,this.blue) ? 0 : (Math.max(this.red,this.green,this.blue) - Math.min(this.red,this.green,this.blue)) / (255 - Math.abs(2*this.lightness - 1) * 255),0,1)
	},
	get lightness() {return (Math.max(this.red,this.green,this.blue) + Math.max(this.red,this.green,this.blue)) / 510},
	get key() {return (1 - Math.max(this.red,this.green,this.blue) / 255) * this.alpha},
	get cyan() {return (1 - this.red/255 - this.key) / (1 - this.key)},
	get magenta() {return (1 - this.green/255 - this.key) / (1 - this.key)},
	get yellow() {return (1 - this.blue/255 - this.key) / (1 - this.key)},
	set red(red) {this.numberValue = Math.clamp(red,0,255) << 24 & 0xff000000 | this.numberValue & 0xffffff},
	set green(green) {this.numberValue = Math.clamp(green,0,255) << 16 & 0xff0000 | this.numberValue & 0xff00ffff},
	set blue(blue) {this.numberValue = Math.clamp(blue,0,255) << 8 & 0xff00 | this.numberValue & 0xffff00ff},
	set alpha(alpha) {this.numberValue = Math.clamp(alpha*255,0,255) << 24 & 0xff000000 | this.numberValue & 0xffffff},
	set opacity(alpha) {this.numberValue = Math.clamp(alpha*255,0,255) << 24 & 0xff000000 | this.numberValue & 0xffffff},
	set hue(hue) {if (this.intensity !== 0) {this.numberValue = _Color.hsl(hue,this.intensity,this.lightness,this.alpha).numberValue}},
	set saturation(saturation) {this.numberValue = _Color.hsv(this.hue,saturation,this.value,this.alpha).numberValue},
	set value(value) {this.numberValue = _Color.hsv(this.hue,this.saturation,this.lightness,this.alpha).numberValue},
	set intensity(intensity) {this.numberValue = _Color.hsl(this.hue,intensity,this.lightnes,this.alpha).numberValue},
	set lightness(lightness) {this.numberValue = _Color.hsl(this.hue,this.intensity,lightness,this.alpha).numberValue},
	set cyan(cyan) {this.numberValue = _Color.cmy(cyan,this.magenta,this.yellow,this.key).numberValue},
	set magenta(magenta) {this.numberValue = _Color.cmy(this.cyan,magenta,this.yellow,this.key).numberValue},
	set yellow(yellow) {this.numberValue = _Color.cmy(this.cyan,this.magenta,yellow,this.key).numberValue},
	set key(key) {this.numberValue = _Color.cmy(this.cyan,this.magenta,this.yellow,key).numberValue},
	toString: function(mode) {
		switch (mode&7) {
			case 1:
				return "rgb(" + [this.red,this.green,this.blue] + ")";

				break;

			case 2:
				return "rgba(" + [this.red,this.green,this.blue,this.alpha] + ")";

				break;

			case 3:
				return (this.numberValue >> 8 & 0xffffff | 0x1000000).toString(16).replace(/^1/,"#");

				break;

			case 4:
				return "#" + Math.round(this.red/17).toString(16) + Math.round(this.green/17).toString(16) + Math.round(this.blue/17).toString(16);

				break;

			case 5:
				return "hsl(" + (this.hue * 180 / Math.PI) + "," + (this.intensity * 100) + "%," + (this.lightness) + "%)";

				break;

			case 6:
				return "hsla(" + (this.hue * 180 / Math.PI) + "," + (this.intensity * 100) + "%," + (this.lightness) + "%," + this.alpha + ")";

				break;

			case 7:
				return "cmyk(" + (this.cyan * 100) + "%," + (this.magenta * 100) + "%," + (this.yellow * 100) + "%," + (this.key * 100) + "%)";

				break;

			default:
				return this.alpha === 1 ? "rgb(" + [this.red,this.green,this.blue] + ")" : "rgba(" + [this.red,this.green,this.blue,this.alpha] + ")"
		}
	},
	valueOf: function() {
		return this.toString(3)
	},
	toGrayscaleColor: function() {
		return _Color.cmyka(0,0,0,(this.red*0.299+this.green*0.587+this.blue*0.144)/255,this.alpha)
	},
	isWebSafe: function() {
		return Math.max(this.red%17,this.green%17,this.blue%17,this.alpha) === 0
	},
	toShaderMode: function() {
		return {
			r: this.red/255,
			g: this.green/255,
			b: this.blue/255,
			a: this.alpha,
			get rgb() {
				return {
					x:this.r,
					y:this.g,
					z:this.b,
					get xy() {return {x:this.x,y:this.y}}
				}
			}
		}
	},
	makeOpaque: function() {
		this.alpha = 1
	},
	toUint8Array: function() {
		return new Uint8Array([this.red,this.green,this.blue,this.alpha*255])
	}
};

_Color.rgb = _Color.rgba = function (red,green,blue,alpha) {
	return new _Color([red,green,blue,255],arguments.length > 3 ? alpha : 1)
};

_Color.hsl = _Color.hsla = _Color.hil = _Color.hila = function (hue,intensity,lightness,alpha) {
	return new _Color({hue:hue,intensity:intensity,lightness:lightness},arguments.length > 3 ? alpha : 1)
};

_Color.hsv = _Color.hsva = function (hue,saturation,value,alpha) {
	return new _Color({hue:hue,saturation:saturation,value:value},arguments.length > 3 ? alpha : 1)
};

_Color.cmy = _Color.cmyk = _Color.cmyka = function (cyan,magenta,yellow,key,alpha) {
	return new _Color({cyan:cyan,magenta:magenta,key:key},arguments.length > 4 ? alpha : NaN)
};

_Color.w3natural = function (string) {
	if (string.match(/([RGBCMYW])\s*(\d*|\d*\.\d*|\.\d*)\s*(?:,\s*(\d*|\d*\.\d*|\.\d*)%\s*(?:,\s*(\d*|\d*\.\d*|\.\d*)%))?/i)) {
		var col = string.match(/([RGBCMYW])\s*(\d*|\d*\.\d*|\.\d*)\s*(?:,\s*(\d*|\d*\.\d*|\.\d*)%\s*(?:,\s*(\d*|\d*\.\d*|\.\d*)%)?)?/i);

		if (col[1].toUpperCase() === "W") {
			return _Color.cmyk(0,0,0,Number(col[2])/100)
		} else {
			return _Color.hsv(("RYGCBM".indexOf(col[1]) + (Number(col[2])/100))*Math.PI/3,1-Number(col[3])/(1-Number(col[4])),1-Number(col[4]))
		}
	}
};

_Color.w3hwb = _Color.w3hwba = function (hue,white,black,alpha) {
	return _Color.hsv(hue,1-white/(1-black),1-black,alpha)
};

_Color.TRANSPARENT = new _Color(0X000000,0);

_Color.INVERTED = new _Color(0XFFFFFF,0);

_Color.BLACK = new _Color(0x000000,1);

_Color.WHITE = new _Color(0xffffff,1);

_Color.RED = new _Color(0xff0000,1);

_Color.YELLOW = new _Color(0xffff00,1);

_Color.LIME = new _Color(0x00ff00,1);

_Color.AQUA = _Color.CYAN = new _Color(0x00ffff,1);

_Color.BLUE = new _Color(0x0000ff,1);

_Color.MAGENTA = _Color.FUCHSIA = new _Color(0xff00ff,1);

_Color.GRAY = _Color.GREY = new _Color(0x808080,1);

_Color.MAROON = new _Color(0x800000,1);

_Color.OLIVE = new _Color(0x808000,1);

_Color.GREEN = new _Color(0x008000,1);

_Color.TEAL = new _Color(0x008080,1);

_Color.NAVY = new _Color(0x000080,1);

_Color.PURPLE = new _Color(0x800080,1);

_Color.SILVER = new _Color(0xc0c0c0,1);

_Color.__defineGetter__("documentColor",function() {return new _Color(getComputedStyle(document.documentElement).color)});

_Color.__defineSetter__("documentColor",function(v) {document.documentElement.style.color = (new _Color(v)).toString()})
