// JavaScript Document
function loadJSON(url) {
	var jsonfile = new XMLHttpRequest();
	jsonfile.overrideMimeType("application/json");
	jsonfile.open('GET',url,true);
	jsonfile.onreadystatechange = function () {
		if (jsonfile.readyState == 4 && jsonfile.status == '200') {
			return JSON.parse(jsonfile.responseText);
		}
	}
	jsonfile.send(null);
}