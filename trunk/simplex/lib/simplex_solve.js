/**
 * 
 */

Simplex.prototype.solve = function() {
	this.variables = {};
	this.numVariables = 4;
	this.numRestricciones = 3;
}

Simplex.prototype.displayResults = function() {
	var result = $("#result").get(0);
	result.appendChild(Simplex.createTextLabel("Aqui va el resultado"));
	
}