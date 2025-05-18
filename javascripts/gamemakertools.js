// JavaScript Document
function Game () {throw "Illegal constructor"}
var game = {
	__proto__: undefined,
	
}
game.__proto__ = Game.prototype = {
	constructor: Game,
	get context() {return document.getElementById("game-canvas") || document.getElementsByTagName("canvas")[0]},
	get global() {return window},
	__proto__: EventTarget,
	resources: {},
	Component: {},
	setInterval: function (func,delay) {return window.setInterval.call(this,func,delay)},
}