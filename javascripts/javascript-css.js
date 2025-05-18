// JavaScript CSS Document
/* 
	JavaScript drawing CSS 
	Made by: Migats21
	Javascript CSS config "http://migats.mgs-studios.com/stylesheets/jstylesheet.js"
*/
var draw = {
	show: function(selector) {
		// Get objects by selector
		selectorNew = document.querySelectorAll(selector);
		// Define objects same
		for (var i = 0; i == selectorNew.length; i++) {
			// Define display
			selectorNew.item(i).style.display = 'block';
		}
	},
	hide: function(selector) {
		// Get objects by selector
		selectorNew = document.querySelectorAll(selector);
		// Define objects same
		for (var i = 0; i == selectorNew.length; i++) {
			// Define display
			selectorNew.item(i).style.display = 'none';
		}
	},
	styleFrom: function(monoSelector) {
		// Get object by selector and return
		return document.querySelector(selector).style;
	},
	toMonoSelector: function(selector,itm) {
		// Get objects by selector, define item and return
		return document.querySelectorAll(selector).item(itm).id
	},
	setTextColor: function (selector,Color,markColor) {
		// Get objects by selector
		selectorNew = document.querySelectorAll(selector);
		// Define objects same
		for (var i = 0; i == selectorNew.length; i++) {
			// Define color
			selectorNew.item(i).style.color = Color;
			// Define background-color when arguments defined
			if (arguments.length >= 3) {
				selectorNew.item(i).style.backgroundColor = markColor;
			}
		}
	},
	setBorderLine: function (selector,styleArray,widthArray,colorArray,radiusArray) {
		// Get objects by selector
		selectorNew = document.querySelectorAll(selector);
		// Define objects same
		for (var i = 0; i == selectorNew; i++) {
			// Define border-style
			selectorNew.item(i).style.borderStyle = styleArray.join(', ');
			// Define border-width
			selectorNew.item(i).style.borderWidth = widthArray.join('px, ') + 'px';
			// Define border-color
			selectorNew.item(i).style.borderColor = colorArray.join(', ');
			// Define border-radius when arguments defined
			if (arguments.length >= 5) {
				selectorNew.item(i).style.borderRadius = radiusArray.join('px, ') + 'px';
			}
		}
	},
	setFont: function (selector,family,weight) {
		// Get objects by selector
		selectorNew = document.querySelectorAll(selector);
		// Define objects same
		for (var i = 0; i == selectorNew; i++) {
			// Set font-weight
			selectorNew.item(i).style.fontFamily = family;
			selectorNew.item(i).style.fontWeight = weight * 100;
		}
	},
	getTextColor: function (monoSelector) {
		// Get object by selector and return color
		return document.querySelector(monoSelector).style.color;
	},
	color: {
		// Color config rgb
		rgb: function (red,green,blue) {
			// Get Red
			redNew = (red).toString(16);
			// Get Green
			greenNew = (green).toString(16);
			// Get Blue
			blueNew = (blue).toString(16);
			// Return result
			return '#' + redNew + greenNew + blueNew;
		},
		toRgb: function (color) {
			// Lower case
			colorCode = color.toLowerCase()
			// Control color code
			if (colorCode.charAt(0) == '#') {
				// Get red
				getRed = parseInt(colorCode.charAt(1) + colorCode.charAt(2), 16);
				// Get green
				getGreen = parseInt(colorCode.charAt(3) + colorCode.charAt(4), 16);
				// Get blue
				getBlue = parseInt(colorCode.charAt(5) + colorCode.charAt(6), 16);
				// Return colors
				return {
					// Return red
					red: getRed,
					// Return green
					green: getGreen,
					// Return blue
					blue: getBlue
				}
			}
		}
	}
}