// ************ TRANSPORTE ***************

function Transporte() { }

Transporte.current = null;

Transporte.prototype.tabla = null; //this.tabla con los costos
Transporte.prototype.tabla2 = null;//this.tabla con las unidades

Transporte.prototype.ejemplo = function() {

    var fila1 = new Array(5);
    fila1[0] = "De/a";
    fila1[1] = "Albuquerque";
    fila1[2] = "Boston";
    fila1[3] = "Cleveland";
    fila1[4] = "Oferta";

    var fila2 = new Array(5);
    fila2[0] = "Des Moines";
    fila2[1] = 5;
    fila2[2] = 4;
    fila2[3] = 3;
    fila2[4] = 100;

    var fila3 = new Array(5);
    fila3[0] = "Evansville";
    fila3[1] = 8;
    fila3[2] = 4;
    fila3[3] = 3;
    fila3[4] = 300;

    var fila4 = new Array(5);
    fila4[0] = "Fort Lauderdale";
    fila4[1] = 9;
    fila4[2] = 7;
    fila4[3] = 5;
    fila4[4] = 300;

    var fila5 = new Array(5);
    fila5[0] = "Demanda";
    fila5[1] = 300;
    fila5[2] = 200;
    fila5[3] = 200;
    fila5[4] = 700; // se debe calcular al generar la this.tabla

    this.tabla = new Array(5);
    this.tabla[0] = fila1;
    this.tabla[1] = fila2;
    this.tabla[2] = fila3;
    this.tabla[3] = fila4;
    this.tabla[4] = fila5;

    var row1 = new Array(5);
    var row2 = new Array(5);
    var row3 = new Array(5);
    var row4 = new Array(5);
    var row5 = new Array(5);

    this.tabla2 = new Array(5);
    this.tabla2[0] = row1;
    this.tabla2[1] = row2;
    this.tabla2[2] = row3;
    this.tabla2[3] = row4;
    this.tabla2[4] = row5;
    
};

Transporte.prototype.imprime = function() {
    document.write("<table width=200 border=1 cellpadding=1 cellspacing=1>");
    for (var i=0;i<this.tabla.length;i++){
   	for (var j=0;j<this.tabla[i].length;j++){
            if(i == 0 || i == this.tabla.length-1){
                if(j==0 || j == this.tabla.length-1)
                    document.write("<td>" + this.tabla[i][j] + "</td>");
                else
                    document.write("<td colspan=2>" + this.tabla[i][j] + "</td>");
            } else {
                if(j==0 || j == this.tabla.length-1)
                    document.write("<td>" + this.tabla[i][j] + "</td>");
                else{
                    var linea = "<td colspan=2><Table border=1><tr><td>" + this.tabla[i][j] + "</td></tr></Table>";
                    if(this.tabla2[i][j] == undefined)
                        linea = linea + "&nbsp;</td>";
                    else
                        linea = linea + this.tabla2[i][j] + "</td>";
                    document.write(linea);
                }
            }
   	}
   	document.write("</tr>");
    }
    document.write("</table>");
};

Transporte.prototype.northwestCorner = function(){
    var i = 1;
    var j = 1;
    while(!this.checaTabla()){
        var r = this.tabla[i][this.tabla[i].length-1] - this.sumaFila(i);
        var c = this.tabla[this.tabla.length-1][j] - this.sumaColumna(j);
        if(r<c){
            this.tabla2[i][j] = r;
        }else{
            this.tabla2[i][j] = c;
        }
        r = this.tabla[i][this.tabla[i].length-1] - this.sumaFila(i);
        c = this.tabla[this.tabla.length-1][j] - this.sumaColumna(j);
        if(r==0 && c==0){
            if(i != this.tabla.length-2){
                this.tabla2[i+1][j] = 0;
                i++;
                j++;
            }
        } else if (r==0)
            i++;
        else
            j++;
    }
};

Transporte.prototype.checaTabla = function(){
    var flag = true;

    for (var i =1; i<this.tabla2.length-1; i++){
        if(this.tabla[i][this.tabla[i].length-1] - this.sumaFila(i) != 0)
            flag = false;
    }

    for (i =1; i<this.tabla2[1].length-1; i++){
        if(this.tabla[this.tabla.length-1][i] - this.sumaColumna(i) != 0)
            flag = false;
    }
    return flag;
};

Transporte.prototype.sumaColumna = function(indexCol){
    var suma = 0;
    for (var i =1; i<this.tabla2.length-1; i++){
        if(this.tabla2[i][indexCol]!=undefined)
            suma += this.tabla2[i][indexCol];
    }
    //alert("SumaCol" + indexCol + ":" + suma);//////quitar
    return suma;
};

Transporte.prototype.sumaFila = function(indexFila){
    var suma = 0;
    for (var i =1; i<this.tabla2[indexFila].length-1; i++){
        if(this.tabla2[indexFila][i]!=undefined)
            suma += this.tabla2[indexFila][i];
    }
    //alert("SumaFila" + indexFila + ":" + suma);//////quitar
    return suma;
};

// *********************** User Interface ****************
function UI() { }

UI.getRowData = function(id, ld) {
	console.log("gettingRowData");
	var r = $("#" + id);
	console.log(r);
	var si = Transporte.current;
	var cols = 1 + si.numVariables + si.numRestricciones + 1;
	
	var a = new Array(cols);
	console.log(cols);
	
	for (var i = 0; i < si.numVariables; i++) {
		var value = r.find("#var" + i).val();
		value = value == ""? 0 : parseFloat(value);
		a[i+1] = value;
	}
	
	if (id === "objetivo") {
		a[0] = 1;
		for (var i = 0; i < si.numVariables; i++) a[i+1] = -a[i+1];
		for (var i = si.numVariables, len = cols -1; i < len; i++) a[i+1] = 0;
		a.unshift("Z");
	}
	if (id.indexOf("restriccion") != -1) {
		a[0] = 0;
		var num = parseFloat(id.substr(11)) + si.numVariables;
		console.log("restriccionNum: " + num);
		for (var i = si.numVariables, len = cols - 1; i < len; i++) {
			a[i+1] = num == i? 1 : 0;
		}
		var value = r.find("#var" + si.numVariables).val();
		value = value == ""? 0 : parseFloat(value);
		a[cols-1] = value;
		a.unshift("S" + (num-si.numVariables + 1));
	}
	
	return a;
};

UI.showOptions = function() {
	var si = new Transporte();
	si.numOrigenes = parseFloat($("input#numVar").val());
	si.numDestinos = parseFloat($("input#numRes").val());
	
	
	Transporte.current = si;
	$("div#startupSection").hide();
	var inputSection = $("div#inputSection");
	var iSE = inputSection.get(0); // Obtener sin jQuery
	
	iSE.appendChild(UI.createTextLabel("Costos de transporte"));
	iSE.appendChild(UI.createTable(si.numOrigenes, si.numDestinos, "origen"));
	iSE.appendChild(document.createElement("br"));
	
	
	var boton = UI.createButton("Resolver", "resolver");
	$(boton).click(function() {
		Transporte.currentSimplex.run();
		$("#inputSection").hide();
		$("#resultSection").show();
	});
	iSE.appendChild(boton);
	
	inputSection.show();
};

UI.createTextField = function(id) {
	var fieldElement = document.createElement("input");
	var field = $(fieldElement);
	field.attr("type", "text");
	field.attr("size", "3");
	if (id) field.attr("id", id);
	return fieldElement;
};

UI.createButton = function(text, id) {
	var fieldElement = document.createElement("input");
	var field = $(fieldElement);
	field.attr("type", "button");
	field.attr("value", text);
	if (id) field.attr("id", id);
	return fieldElement;
};

UI.createTextLabel = function(text) {
	var element = document.createElement("p");
	var p = $(element);
	p.html(text);
	return element;
};

UI.createRow = function(cols, id, header) {
	// TODO: Estaba agregando el header de la tabla para introducir los costos de transporte
	console.log("numCols:" + cols);
	var df = document.createElement("tr");
	$(df).attr("id", id);
	
	for (var i = 0; i < cols; i ++) {
		var td = document.createElement(header?"th":"td");
		if (header && i == 0);
		else if (header) td.appendChild(UI.createTextLabel("D" + (i+1)));
		else td.appendChild(UI.createTextField("var"+i));
		df.appendChild(td);
	}
	return df;
};

UI.createTable = function(rows, cols, id, ld) {
	var table = document.createElement("table");
	$(table).attr("id", id);
	
	table.appendChild(UI.createRow(cols, id + "labels"));
	for (var i = 0; i < rows; i++) {
		table.appendChild(UI.createRow(cols, id + "_r" + 1));
	}
	return table;
}

// ------------ Ejecución, Startup ---------------
//Startup
$(new function() {
	$("div#inputSection").hide();
	$("div#resultSection").hide();
	$('#iniciar').bind("click", UI.showOptions);
});

var ejemplo = new Transporte();
ejemplo.ejemplo();
ejemplo.imprime();
ejemplo.northwestCorner();
ejemplo.imprime();

