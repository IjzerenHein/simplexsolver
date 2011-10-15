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
var tabla; //tabla con los costos
var tabla2;//tabla con las unidades


function Crea() {

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
    fila5[4] = 700; // se debe calcular al generar la tabla

    tabla = new Array(5);
    tabla[0] = fila1;
    tabla[1] = fila2;
    tabla[2] = fila3;
    tabla[3] = fila4;
    tabla[4] = fila5;

    var row1 = new Array(5);
    var row2 = new Array(5);
    var row3 = new Array(5);
    var row4 = new Array(5);
    var row5 = new Array(5);

    tabla2 = new Array(5);
    tabla2[0] = row1;
    tabla2[1] = row2;
    tabla2[2] = row3;
    tabla2[3] = row4;
    tabla2[4] = row5;

}


function imprime() {
    document.write("<table width=200 border=1 cellpadding=1 cellspacing=1>");
    for (i=0;i<tabla.length;i++){
   	for (j=0;j<tabla[i].length;j++){
            if(i == 0 || i == tabla.length-1){
                if(j==0 || j == tabla.length-1)
                    document.write("<td>" + tabla[i][j] + "</td>");
                else
                    document.write("<td colspan=2>" + tabla[i][j] + "</td>");
            } else {
                if(j==0 || j == tabla.length-1)
                    document.write("<td>" + tabla[i][j] + "</td>");
                else{
                    var linea = "<td colspan=2><Table border=1><tr><td>" + tabla[i][j] + "</td></tr></Table>";
                    if(tabla2[i][j] == undefined)
                        linea = linea + "&nbsp;</td>";
                    else
                        linea = linea + tabla2[i][j] + "</td>";
                    document.write(linea);
                }
            }
   	}
   	document.write("</tr>");
    }
    document.write("</table>");
}

function northwestCorner(){
    var i = 1;
    var j = 1;
    while(!checaTabla()){
        var r = tabla[i][tabla[i].length-1] - sumaFila(i);
        var c = tabla[tabla.length-1][j] - sumaColumna(j);
        if(r<c){
            tabla2[i][j] = r;
        }else{
            tabla2[i][j] = c;
        }
        r = tabla[i][tabla[i].length-1] - sumaFila(i);
        c = tabla[tabla.length-1][j] - sumaColumna(j);
        if(r==0 && c==0){
            if(i != tabla.length-2){
                tabla2[i+1][j] = 0;
                i++;
                j++;
            }
        } else if (r==0)
            i++;
        else
            j++;
    }
}

function checaTabla(){
    var flag = true;

    for (var i =1; i<tabla2.length-1; i++){
        if(tabla[i][tabla[i].length-1] - sumaFila(i) != 0)
            flag = false;
    }

    for (i =1; i<tabla2[1].length-1; i++){
        if(tabla[tabla.length-1][i] - sumaColumna(i) != 0)
            flag = false;
    }
    return flag;
}

function sumaColumna(indexCol){
    var suma = 0;
    for (var i =1; i<tabla2.length-1; i++){
        if(tabla2[i][indexCol]!=undefined)
            suma += tabla2[i][indexCol];
    }
    //alert("SumaCol" + indexCol + ":" + suma);//////quitar
    return suma;
}

function sumaFila(indexFila){
    var suma = 0;
    for (var i =1; i<tabla2[indexFila].length-1; i++){
        if(tabla2[indexFila][i]!=undefined)
            suma += tabla2[indexFila][i];
    }
    //alert("SumaFila" + indexFila + ":" + suma);//////quitar
    return suma;
}

function principal() {
    Crea();
    imprime();
    northwestCorner();
    imprime();
     
}