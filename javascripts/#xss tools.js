// JavaScript Document
var XMLAllStyles = [];
function die (err) {
	throw err;
}
function fileLoad(url,type) {
	var newXML = new XMLHttpRequest();
	newXML.open('GET',url,false)
	newXML.send()
	switch (type) {
		case 'text/xml':	
			return newXML.responseXML;
			break;
		case 'application/json':
		case 'text/json':
			return JSON.parse(newXML.responseText);
			break;
		default: 
			return newXML.responseText;
	}
}
var _XSS = {
	selectorElement: function (XMLSelectorElement) {
		var l = '';
		if (XMLSelectorElement.hasAttribute('query')) {l += XMLSelectorElement.getAttribute('query')};
		if (XMLSelectorElement.hasAttribute('query:tagName')) {l += XMLSelectorElement.getAttribute('query:tagName')};
		if (XMLSelectorElement.hasAttribute('query:id')) {l += '#' + XMLSelectorElement.getAttribute('query:id').replace(/[\s|.|:|,\s|,|#]/g,'#')};
		if (XMLSelectorElement.hasAttribute('query:class')) {l += '.' + XMLSelectorElement.getAttribute('query:id').replace(/[\s|.|:|,\s|,|#]/g,'.')};
		if (XMLSelectorElement.hasAttribute('query:attributes')) {l += '[' + XMLSelectorElement.getAttribute('query:id').replace(/[\s|.|:|,\s|,|#]/g,' ') + ']'};
		if (XMLSelectorElement.hasAttribute('query:pseudoClass')) {l += ':' + XMLSelectorElement.getAttribute('query:id').replace(/[\s|.|:|,\s|,|#]/g,':')};
		if (XMLSelectorElement.hasAttribute('href')) {l += this.getCombinationSelector(XMLSelectorElement.getAttribute('href'))};
		return l;
	},
	getCombinationSelector: function(href) {
		for (var XXCOUNTER = 0; XXCOUNTER < domcombo.length; XXCOUNTER++) {
			if (domcombo[XXCOUNTER].getAttribute('id' == href.replace(/#/i,''))) {
				var comby = domcombo[XXCOUNTER];
				XXCOUNTER = domcombo.length
			}
		}
		for (var XXCOUNTER = 0; XXCOUNTER < comby.childNodes.length; XXCOUNTER++) {
			var il = '';
			if (comby.childNodes[XXCOUNTER].hasAttribute('query')) {il += comby.childNodes[XXCOUNTER].getAttribute('query')};
			if (comby.childNodes[XXCOUNTER].hasAttribute('query:tagName')) {il += comby.childNodes[XXCOUNTER].getAttribute('query:tagName')};
			if (comby.childNodes[XXCOUNTER].hasAttribute('query:id')) {il += '#' + comby.childNodes[XXCOUNTER].getAttribute('query:id').replace(/[\s|.|:|,\s|,|#]/g,'#')};
			if (comby.childNodes[XXCOUNTER].hasAttribute('query:class')) {il += '.' + comby.childNodes[XXCOUNTER].getAttribute('query:id').replace(/[\s|.|:|,\s|,|#]/g,'.')};
			if (comby.childNodes[XXCOUNTER].hasAttribute('query:attributes')) {il += '[' + comby.childNodes[XXCOUNTER].getAttribute('query:id').replace(/[\s|.|:|,\s|,|#]/g,' ') + ']'};
			if (comby.childNodes[XXCOUNTER].hasAttribute('query:pseudoClass')) {il += ':' + comby.childNodes[XXCOUNTER].getAttribute('query:id').replace(/[\s|.|:|,\s|,|#]/g,':')};	
			il += ',';
		}
		return il		
	},
	defineStyles: function (properties) {
		var ld = '\n';
		for (var XXCOUNTER = 0; XXCOUNTER < properties.length; XXCOUNTER++) {
			if (properties[XXCOUNTER].tagName == 'property') {
				ld += '\t' + properties[XXCOUNTER].getAttribute('name') + ': ' +
				properties[XXCOUNTER].getAttribute('value') + ';\n';
			} else if (properties[XXCOUNTER].tagName == 'selector') {
				properties[XXCOUNTER].setAttribute('query',this.selectorElement(properties[COUNTER].parentNode) + combyy[properties[XXCOUNTER].getAttribute('combination')] + this.selectorElement(properties[XXCOUNTER]))
				dom.getElementsByTagName('xml:style').nodeValue.replace('</xml:style>',properties[XXCOUNTER].nodeValue + '</xml:style>')
			}
		}
		return ld;
	}
}
function defineXMLStyles(xmldom) {
	var dom = xmldom;
	var domitems = dom.getElementsByTagName('xml:style').childNodes
	var CSSResult = '\n';
	var domcombo = dom.getElementsByTagName('combination');
	for (XCOUNTER = 0; XCOUNTER < domitems.length; XCOUNTER++) {
		if (domitems[XCOUNTER].tagName == 'selector') {
			CSSResult += _XSS.selectorElement(domitems[XCOUNTER]);
			CSSResult += ' {' + _XSS.defineStyles(domitems[XCOUNTER].childNodes) + '}\n';
		}
	}
	var CSSDomain = document.createElement('style');
	CSSDomain.innerHTML = CSSResult;
	document.getElementsByTagName('head')[0].appendChild(CSSDomain);
}
window.onload = function () {
	var xmlLinks = document.querySelectorAll('style[type=text/xml],link[type=text/xml]')
	if (xmlLinks.length != 0) {
		console.log('CSS does not support XML-Styles');
		for (var COUNTER = 0; COUNTER < xmlLinks.length; COUNTER++) {
			if (xmlLinks[COUNTER].item().tagName == 'link') {
				XMLAllStyles.shift(fileLoad(xmlLinks[COUNTER].getAttribute('href'),'text/xml'));
			} else {
				XMLAllStyles.shift((new DOMParser()).parseFromString(xmlLinks[COUNTER].innerHTML,'text/xml'));
			}
			defineXMLStyles(XMLAllStyles[0])
		}
	}
}