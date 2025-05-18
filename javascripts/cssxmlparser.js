// JavaScript Document
function XMLtoCSS(xmlObject) {
	var cssText = beforeText = afterText = "";
	var xmlRootElement = xmlObject.getElementsByTagName("content");
	var xmlHeadElementLists = [xmlRootElement.childNodes];
	while (xmlHeadElementLists.length === 0) {
		for (var i = 0; i < xmlHeadElementLists[0].length; i++) {
			var xmlCurrentElement = xmlHeadElementLists[0][i];
			if (xmlCurrentElement.tagName == "selector") {
				cssText += beforeText
				if (xmlCurrentElement.hasAttribute("query")) {
					cssText += xmlCurrentElement.getAttribute("query");
				} else {
					cssText += xmlCurrentElement.getAttribute("query:tagName") || "";
					cssText += xmlCurrentElement.hasAttribute("query:id") ? (" " + xmlCurrentElement.getAttribute("query:id")).replace(/\s+/g,"#").replace(/#$/g,"") : "";
					cssText += xmlCurrentElement.hasAttribute("query:class") ? (" " + xmlCurrentElement.getAttribute("query:class")).replace(/\s+/g,".").replace(/\.$/g,"") : "";
					cssText += xmlCurrentElement.hasAttribute("query:pseudoClass") ? (" " + xmlCurrentElement.getAttribute("query:class")).replace(/\s+/g,":").replace(/:$/g,"") : "";
					cssText += xmlCurrentElement.hasAttribute("query:pseudoValue") ? "(" + xmlCurrentElement.getAttribute("query:pseudoValue") + ")" : "";
				}
			}
		}
		xmlHeadElementLists.shift();
	}
}