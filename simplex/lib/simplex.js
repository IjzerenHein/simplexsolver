// CONSTANTS
JEVENTS = {
		TAP: "tap",
		TAPHOLD: "taphold",
		SWIPE: "swipe",
		PAGE_BEFORE_SHOW: "pagebeforeshow",
		PAGE_BEFORE_HIDE: "pagebeforehide",
		PAGE_SHOW: "pageshow",
		PAGE_HIDE: "pagehide",
		PAGE_BEFORE_CREATE: "pagebeforecreate",
		PAGE_CREATE: "pagecreate"
}

/**
 *  1. Simplex "maximizar s.a."
 *  2. Mostrar gráfica
 *  *región factible
 *  *función objetivo
 *  *solución óptima
 *  
 *   Ejemplos de la documentación con 
 *   Max. z=10x1+15x2
 *   sa.
 *   5x1+10x2≤6000
 *   2.5x1+2.5x2≤2250
 *   2x1+x2≤1200
 */

function Simplex() {}

/** Bidimenxional array of the form
 * { { 
 */
Simplex.prototype.variables = {}

/** Get data from web form and completes the array with the info.
 * 
 */
Simplex.prototype.getData = function() {
	
}

Simplex.prototype.solve = function() {
	
}

Simplex.prototype.displayGraph = function() {
	
}

Simplex.prototype.run = function() {
	var solver = new Simplex();
	solver.getData();
	solver.solve();
	solver.displayGraph();
	alert('saludos');
}

// UI functions
Simplex.showOptions = function() {
	console.log("Options");
}

Simplex.createTextField = function() {
	var field = $(document.createElement("input"));
	field.attr("type", "text");
	
}

$('div#Solver').bind(JEVENTS.PAGE_BEFORE_SHOW, function() {
	$('#iniciar').bind(JEVENTS.TAP, Simplex.showOptions);
});