// JavaScript Document "/javascript/calculator.js"
// Defining variables
Math.a = Math.b = Math.c = Math.t = Math.x = Math.y = Math.z = Math.ans = 0;
// Defining root for radix sign
Math.radix = function (y,x) {
	if (typeof x === "number") {
		return Math.pow(x,1/y);
	}
	return Math.sqrt(y);
}
// Defining powers and roots
Math.sqr = function (number) {
	return Math.pow(number,2);
}
Math.cbr = function (number) {
	return Math.pow(number,3);
}
Math.cbrt = function (number) {
	return Math.pow(number,1/3);
}
// Defining angle functions
Math.cot = function (number) {
	return Math.tan(Math.asin(1) - number);
}
Math.acot = function (number) {
	return Math.asin(1) - Math.atan(number);
}
Math.deg2rad = function (number) {
	// It has to be Math.asin(1) because Math.PI returns one decimal to big
	return number * Math.asin(1) / 90;
}
Math.rad2deg = function (number) {
	return number * 90 / Math.asin(1);
}
Math.dsin = function (number) {
	return Math.sin(Math.deg2rad(number));
}
Math.dcos = function (number) {
	return Math.cos(Math.deg2rad(number));
}
Math.dtan = function (number) {
	return Math.tan(Math.deg2rad(number));
}
Math.dcot = function (number) {
	return Math.cot(Math.deg2rad(number));
}
Math.dasin = function (number) {
	return Math.rad2deg(Math.asin(number));
}
Math.dacos = function (number) {
	return Math.rad2deg(Math.acos(number));
}
Math.datan = function (number) {
	return Math.rad2deg(Math.atan(number));
}
Math.dacot = function (number) {
	return Math.rad2deg(Math.acot(number));
}
Math.grad2rad = function (number) {
	return number * Math.asin(1) / 100;
}
Math.rad2grad = function (number) {
	return number * 100 / Math.asin(1);
}
Math.gsin = function (number) {
	return Math.sin(Math.grad2rad(number));
}
Math.gcos = function (number) {
	return Math.cos(Math.grad2rad(number));
}
Math.gtan = function (number) {
	return Math.tan(Math.grad2rad(number));
}
Math.gcot = function (number) {
	return Math.cot(Math.grad2rad(number));
}
Math.gasin = function (number) {
	return Math.rad2grad(Math.asin(number));
}
Math.gacos = function (number) {
	return Math.rad2grad(Math.acos(number));
}
Math.gatan = function (number) {
	return Math.rad2grad(Math.atan(number));
}
Math.gacot = function (number) {
	return Math.rad2grad(Math.acot(number));
}
// Defining function to get the left parameter from an operator
function getLeftParam(text,cursorpos,pattern) {
	var leftText = text.slice(0,cursorpos);
	leftText = leftText.replace(/\s*$/,"");
	if (/[\d]$/.test(leftText)) {
		return String(leftText.match(pattern || /(?:\d*\.)?\d+(?:e[+-]\d+)?$/));
	}
	if (/[^\w$][abctxyz]$/.test(leftText)) {
		return String(leftText.match(/[abctxyz]$/));
	}
	leftText = leftText.split("").reverse().join("");
	if (!(/^\)/.test(leftText))) {
		return;
	}
	var cc = 1, cs = 1;
	while (cc > 0) {
		if (leftText.slice(cs).match(/\(|\)/) == "(") {
			cc--;
		} else if (leftText.slice(cs).match(/\(|\)/) == ")") {
			cc++;
		} else {
			return;
		}
		cs += leftText.slice(cs).search(/\(|\)/) + 1;
	}
	cs += leftText.slice(cs).match(/^(\s?[A-Za-z\d_$]*[A-Za-z_$])?/)[0].length;
	return String(text.slice(leftText.length - cs,cursorpos));
}
// Defining the same for right
function getRightParam(text,cursorpos,pattern) {
	var rightText = text.slice(cursorpos);
	rightText = rightText.replace(/^\s*/,"");
	if (/^-?\d+/.test(rightText)) {
		return String(rightText.match(pattern || /^[+-]?(?:\d*\.)?\d+(?:e[+-]\d+)?/));
	}
	if (/^[abctxyz][^\w$\(]/.test(rightText)) {
		return String(rightText.match(/^\w/));
	}
	if (!(/^(?:[A-Za-z_$][\w$]*\s?)?\(/.test(rightText))) {
		return;
	}
	var cc = 1, cs = rightText.search(/\(|\)/) + 1;
	while (cc > 0) {
		if (rightText.slice(cs).match(/\(|\)/) == ")") {
			cc--;
		} else if (rightText.slice(cs).match(/\(|\)/) == "(") {
			cc++;
		} else {
			return;
		}
		cs += rightText.slice(cs).search(/\(|\)/) + 1;
	}
	return String(text.slice(cursorpos,cursorpos + cs));
}
// Calculation function that can be runned by a script
function calculate(text, anglemode) {
	if (text) {
		return new TypeError("Empty calculation");
	}
	text = String(text);
	text = text.replace(/\n/g," ");
	text = text.replace(/;/g,",");
	{
		// Checking every variable to make sure you can't run an illegal javascript function
		let vars = text.match(/[\w$]+/g);
		if (vars) {for (var i=0;i<vars.length;i++) {
			if (typeof Math[vars[i]] == "undefined" && isNaN(vars[i])) {
				return new ReferenceError("Cannot read property \"" + vars[i] + "\" of \"Math\"");
			}
		}}
	}
	// Angle mode
	if (typeof anglemode == "number") {
		// Replace cos sin enz with the same word but a prefix letter for what angle mode it is set
		text = text.replace(/([^\w$]|^)(a?(?:cos|sin|tan|cot)(?:[^\w$]|$))/, "$1" + ["d","","g"][anglemode] + "$2");
	}
	// Adding absolute values
	while (typeof text == "string") {
		let cur = text.indexOf("|");
		if (cur === -1) {
			break;
		}
		if (getRightParam(text,cur+1)) {
			text = text.replace(/\|/,"abs(\n");
		} else if (getLeftParam(text,cur)) {
			text = text.replace(/\|/,"\n)");
		} else {
			return new SyntaxError("Unexpected token |");
		}
	}
	// When a double vertical bar is detected, match it as an binary parameter
	text = text.replace(/\n\)abs\(\n/g,"|");
	text = text.replace(/\n/g,"");
	// Adding some parameters
	for (let cur = text.indexOf("^"); cur > -1; cur = text.indexOf("^")) {
		let number1 = getLeftParam(text,cur);
		let number2 = getRightParam(text,cur+1);
		if (number1 || number2) {
			return SyntaxError("Unexpected token ^");
		}
		text = text.slice(0,text.lastIndexOf(number1,cur)) + "pow(" + number1 + "," + number2 + ")" + text.slice(text.indexOf(number2,cur) + number2.length);
	}
	for (let cur = text.indexOf("\u221a"); cur > -1; cur = text.indexOf("\u221a")) {
		if (cur === -1) {
			break;
		}
		let number = getRightParam(text,cur+1,/^[+-]?(?:\d*\.)?\d+(?:e[+-]\d+)?(?:&[+-]?(?:\d*\.)?\d+(?:e[+-]\d+)?)?/);
		if (number) {
			return new SyntaxError("Unexpected token \u221a");
		}
		number = number.replace(/&/,",");
		let ilength = number.length;
		if (number[0] != "(") {
			number = "(" + number + ")";
		}
		text = text.slice(0,cur) + "radix" + number + text.slice(ilength + cur + 1);
	}
	// Running the code
	with (Math) {
		try {
			var output = Number(eval(text));
			if (isNaN(output) || typeof output != "number") {
				throw TypeError("The result of \"" + text + "\" is not a valid number");
			}
			if (output === Infinity) {
				throw RangeError("The result of \"" + text + "\" is too large");
			}
			if (output === -Infinity) {
				throw RangeError("The result of \"" + text + "\" is too small")
			}
			return output;
		} catch (err) {
			return err;
		}
	}
}
