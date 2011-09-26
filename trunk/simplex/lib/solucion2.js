/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 *   Ejemplos de la documentación con
 *   Max. z=10x1+15x2
 *   sa.
 *   5x1+10x2≤6000
 *   2.5x1+2.5x2≤2250
 *   2x1+x2≤1200
 */
var tabla; //aqui el arreglo lo puse global pero supongo que es el this.variables = {}; del prototype??
           // o tambien se puede que todas las funciones auxiliares lo reciban como un parametro llamado tabla para no cambiar el nombre
var pivoteV;//supungo que los pivotes tambien serian propiedades del prototype
var pivoteH;

function Crea() {

    var fila1 = new Array(8);
    fila1[0] = "VB";
    fila1[1] = "Z";
    fila1[2] = "x1";
    fila1[3] = "x2";
    fila1[4] = "s1";
    fila1[5] = "s2";
    fila1[6] = "s3";
    fila1[7] = "LD";

    var fila2 = new Array(8);
    fila2[0] = "Z";
    fila2[1] = 1;
    fila2[2] = -10;
    fila2[3] = -15;
    fila2[4] = 0;
    fila2[5] = 0;
    fila2[6] = 0;
    fila2[7] = 0;

    var fila3 = new Array(8);
    fila3[0] = "s1";
    fila3[1] = 0;
    fila3[2] = 5;
    fila3[3] = 10;
    fila3[4] = 1;
    fila3[5] = 0;
    fila3[6] = 0;
    fila3[7] = 6000;

    var fila4 = new Array(8);
    fila4[0] = "s2";
    fila4[1] = 0;
    fila4[2] = 2.5;
    fila4[3] = 2.5;
    fila4[4] = 0;
    fila4[5] = 1;
    fila4[6] = 0;
    fila4[7] = 2250;

    var fila5 = new Array(8);
    fila5[0] = "s3";
    fila5[1] = 0;
    fila5[2] = 2;
    fila5[3] = 1;
    fila5[4] = 0;
    fila5[5] = 0;
    fila5[6] = 1;
    fila5[7] = 1200;

    tabla = new Array(5);
    tabla[0] = fila1;
    tabla[1] = fila2;
    tabla[2] = fila3;
    tabla[3] = fila4;
    tabla[4] = fila5;

}

function imprime() {
    document.write("<table width=200 border=1 cellpadding=1 cellspacing=1>");
    for (i=0;i<tabla.length;i++){
   	for (j=0;j<tabla[i].length;j++){
            document.write("<td>" + tabla[i][j] + "</td>")
   	}
   	document.write("</tr>")
    }
    document.write("</table>")
}

//checo que la fila de la Z no tenga valores negativos
function filaNegativa() {
    var negativa = 0;
    for (var i =1; i<tabla[1].length; i++){
        if(tabla[1][i] < 0)
            negativa = 1;
    }
    return negativa;
}

//busco el mas negativo para el pivote vertical
function masNegativo() {
    var menor = 1;
    for (var i =1; i<tabla[1].length; i++){
        if(tabla[1][i] < menor){
            menor = tabla[1][i];
            pivoteV = i;
        }
    }
    alert(pivoteV);
}

//eligo el menor coeficiente para el pivote horizontal
function menorCoeficiente(){
	//var menorValor = tabla[2][tabla[2].length - 1] / tabla[2][pivoteV];
        var menorValor = Number.MAX_VALUE;
//	alert(menorValor);
	for (var i=2;i<tabla.length;i++){
		var temp = (tabla[i][tabla[i].length - 1]) / (tabla[i][pivoteV]);
		if (temp <= menorValor && temp > 0){
			menorValor = temp;
			pivoteH = i;
		}
//		alert(menorValor);
	}
	alert(pivoteH);
}

//divido la fila donde esta el pivote para hacerlo 1
function igualarAUno(){
    alert(tabla[pivoteH][pivoteV]);
    if(tabla[pivoteH][pivoteV] != 1){
        var pivoteFijado = tabla[pivoteH][pivoteV];
        for (var i =1; i<tabla[pivoteH].length; i++){
            var temp = tabla[pivoteH][i];
            tabla[pivoteH][i] = temp / pivoteFijado;
        }
    }
    tabla[pivoteH][0] = tabla[0][pivoteV];
}

//reviso las filas si son 0 sino las convierto a 0
function revisaFilas(){
    for(var i=1; i<tabla.length;i++){
        if(tabla[i][pivoteV] != 0 && i != pivoteH)
            igualaACero(i)
    }
}

//cambio una fila para que tenga 0 en la columna del pivote
function igualaACero(fila){
    var neg = -tabla[fila][pivoteV];
    for (var i =1; i<tabla[fila].length; i++){
        var temp = (neg * tabla[pivoteH][i]) + tabla[fila][i];
        tabla[fila][i] = temp;
    }
}

//esto es lo de comparar el nombre de las variables para obtener su valor (el tamano del arreglo esta fijo pero el comentario dice cual es su verdadero tamanio)
function entregaRespuesta(){
    var respuesta = new Array(6);//variables + restricciones + 1
    for(var a=0;a<respuesta.length;a++){
        respuesta[a] = 0;
    }
    
    for (var i=1;i<tabla[0].length-1;i++){
   	for (var j=1;j<tabla.length;j++){
            //alert(tabla[0][i]);
            //alert(tabla[j][0]);
            if(tabla[0][i] == tabla[j][0])
                respuesta[i-1] = tabla[j][tabla[0].length-1];
           // else
               // respuesta[i-1] = 0;
            //alert(respuesta[i-1]);
   	}
    }
    var temp = respuesta.shift();
    respuesta.push(temp);
    return respuesta;
}

//este es el loop que resuelve el simplex supongo que este es el solve del prototype
function resuelve() {
    while (filaNegativa()){
        masNegativo();
        menorCoeficiente();
        igualarAUno();
        revisaFilas();
        imprime();
    }
    var arregloRespuesta = entregaRespuesta();//aqui se regresa el arreglo con las respuestas
    document.write(arregloRespuesta.toString());
}

function principal() {
    Crea();
    imprime();
    resuelve();
}