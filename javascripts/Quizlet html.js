// JavaScript Document
TermCountID = 0;
function random_range(x1,x2) {
	if (typeof x1 == 'number' && typeof x2 == 'number') {
		return Math.random() * (x2 - x1) + x1;
	} else {
		throw "x is not a number";
		return parseFloat('not a number');
	}
}
var TransTypeValue;
function choose(x1,x2,x3,x4) {
	return arguments[Math.floor(Math.random() * arguments.length)];
}
function checkDefined(variable) {
	return (typeof variable === 'undefined') ? false : variable != null;
}
window.onload = function () {
	TransType = document.getElementById('TransType');
	document.getElementById('switch').onclick = function () {
		TransTypeValue = TransType.value;
		TransType.value = TransType.value.charAt(1) + TransType.value.charAt(0);
		console.log(TransTypeValue + ' succesfull switched to ' + TransType.value);
	}
	document.getElementById('caseSensitive').onchange = function() {
		console.log('case sensitive is now ' + this.checked);
	}
	document.getElementById('termAdd').onclick = function () {
		var EN_fielt = document.createElement('input');
		var NL_fielt = document.createElement('input');
		var DE_fielt = document.createElement('input');
		var removebtn = document.createElement('input');
		EN_fielt.type = "text";
		NL_fielt.type = "text";
		DE_fielt.type = "text";
		removebtn.type = "button";
		EN_fielt.className = "englishTerm";
		NL_fielt.className = "dutchTerm";
		DE_fielt.className = "germanTerm";
		removebtn.className = "removebtn";
		EN_fielt.setAttribute("placeholder","Englsh term");
		NL_fielt.setAttribute("placeholder","Dutch term");
		DE_fielt.setAttribute("placeholder","German term");
		EN_fielt.name = "EN_term" + TermCountID;
		NL_fielt.name = "NL_term" + TermCountID;
		DE_fielt.name = "DE_term" + TermCountID;
		removebtn.name = "w" + TermCountID;
		removebtn.value = "Remove term"
		removebtn.onclick = function () {
			document.getElementById('Termlist').removeChild(document.getElementById("Termro" + this.name));
			console.log("Termro" + this.name + " is succesfull removed");
		}
		var EN_cel = document.createElement('td');
		var NL_cel = document.createElement('td');
		var DE_cel = document.createElement('td');
		var Remove_cel = document.createElement('td');
		EN_cel.appendChild(EN_fielt);
		NL_cel.appendChild(NL_fielt);
		DE_cel.appendChild(DE_fielt);
		Remove_cel.appendChild(removebtn);
		var Termrow = document.createElement('tr');
		Termrow.appendChild(EN_cel);
		Termrow.appendChild(NL_cel);
		Termrow.appendChild(DE_cel);
		Termrow.appendChild(Remove_cel);
		Termrow.id = "Termrow" + TermCountID;
		document.getElementById('Termlist').appendChild(Termrow);
		console.log("Term " + TermCountID++ + " succesfull added");
	}
	document.getElementById('TermDeleteall').onclick = function () {
		document.getElementById('Termlist').innerHTML = "";
		TermCountID = 0;
		console.log("All terms are succesfull removed");
	}
}