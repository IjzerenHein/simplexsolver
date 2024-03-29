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

function Crea() { }

Crea.prototype.ejemplo = function() {

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

};

Crea.prototype.tabla = null; //this.tabla con los costos
Crea.prototype.tabla2 = null;//this.tabla con las unidades
Crea.prototype.tablaDummy = null;//tabla auxiliar para encontrar los ciclos

Crea.prototype.inicializaTabla2 = function(){
    this.tabla2 = new Array(this.tabla.length);
    for(i = 0; i < this.tabla2.length;i++){
        this.tabla2[i] = new Array(this.tabla[i].length);
    }
};

Crea.prototype.imprime = function() {
    var html = "<table width=200 border=1 cellpadding=1 cellspacing=1>";
    for (var i=0;i<this.tabla.length;i++){
   	for (var j=0;j<this.tabla[i].length;j++){
            if(i == 0 || i == this.tabla.length-1){
                if(j==0 || j == this.tabla.length-1)
                    html += "<td>" + this.tabla[i][j] + "</td>";
                else
                    html += "<td colspan=2>" + this.tabla[i][j] + "</td>";
            } else {
                if(j==0 || j == this.tabla.length-1)
                    html += "<td>" + this.tabla[i][j] + "</td>";
                else{
                    var linea = "<td colspan=2><Table border=1><tr><td>" + this.tabla[i][j] + "</td></tr></Table>";
                    if(this.tabla2[i][j] == undefined)
                        linea = linea + "&nbsp;</td>";
                    else
                        linea = linea + this.tabla2[i][j] + "</td>";
                    html += linea;
                }
            }
   	}
   	html += "</tr>";
    }
    html += "</table>";
    html += "</br>";
    return html;
};

Crea.prototype.imprimeSolucion = function(){
    var resS = "";
    var res = 0;
    var tmp = 0;
    for (var i=1;i<this.tabla.length-1;i++){
   	for (var j=1;j<this.tabla[i].length-1;j++){
            if(this.tabla2[i][j] != undefined){
                tmp = this.tabla[i][j] * this.tabla2[i][j];
                if(i == this.tabla.length-2){
                    resS += tmp + "=";
                    res += tmp;
                } else {
                    resS += tmp + "+";
                    res += tmp;
                }
            }
        }
    }

    resS += res + "</br></br>";

    return resS;
};

Crea.prototype.northwestCorner = function(){
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

Crea.prototype.checaTabla = function(){
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

Crea.prototype.sumaColumna = function(indexCol){
    var suma = 0;
    for (var i =1; i<this.tabla2.length-1; i++){
        if(this.tabla2[i][indexCol]!=undefined)
            suma += this.tabla2[i][indexCol];
    }
    //alert("SumaCol" + indexCol + ":" + suma);//////quitar
    return suma;
};

Crea.prototype.sumaFila = function(indexFila){
    var suma = 0;
    for (var i =1; i<this.tabla2[indexFila].length-1; i++){
        if(this.tabla2[indexFila][i]!=undefined)
            suma += this.tabla2[indexFila][i];
    }
    //alert("SumaFila" + indexFila + ":" + suma);//////quitar
    return suma;
};

Crea.prototype.steppingStone = function (){
    var indices = null;
    do{
        indices = new Array();
        this.calculaIndices(indices);
        if(this.indicesNegativos(indices)){
            this.mejoraSolucion(indices);
            document.write(this.imprime());
            document.write(this.imprimeSolucion());
        }
    } while(this.indicesNegativos(indices));
};

Crea.prototype.calculaIndices = function (indices) {
    for (var i=1;i<this.tabla2.length-1;i++){
        for (var j=1;j<this.tabla2[i].length-1;j++){
            if (this.tabla2[i][j] == undefined)
                indices.push(this.calculaIndice(i,j));
        }
    }
};

Crea.prototype.calculaIndice = function (fila, columna){
    var indice = new Array();
    var ciclo = new Array();

    indice = [0,fila,columna];
    var vecinos = new Array();
    vecinos.push([fila,columna]);
    var iteraciones = 0;
    this.creaDummy(fila, columna);
    ciclo = this.buscaCiclo(vecinos, iteraciones);
    ciclo.pop();//quita repetido
    indice[0] = this.calculaCiclo(ciclo);
    return indice;
};

Crea.prototype.buscaCiclo = function (vecinos, iteraciones){
    if(!this.repetidos(vecinos)){
        if(this.vecinosFila(vecinos, vecinos[vecinos.length-1][0], iteraciones)){
            var tmp = this.encuentraVecinoFila(vecinos, vecinos[vecinos.length-1][0], iteraciones);
            vecinos.push(tmp);
            iteraciones++;
            vecinos = this.buscaCiclo(vecinos, iteraciones);
        }
        if(!this.repetidos(vecinos)){
            if(this.vecinosColumna(vecinos, vecinos[vecinos.length-1][1], iteraciones)){
                var tmp2 = this.encuentraVecinoColumna(vecinos, vecinos[vecinos.length-1][1], iteraciones);
                vecinos.push(tmp2);
                iteraciones++;
                vecinos = this.buscaCiclo(vecinos, iteraciones);
            } else {
                vecinos.pop();
                iteraciones--;
            }
        }
    }
    return vecinos;
};

Crea.prototype.creaDummy = function (fila, columna){
    var i = 0;
    var j = 0;
    this.tablaDummy = new Array(this.tabla2.length);
    for(i = 0; i < this.tablaDummy.length;i++){
        this.tablaDummy[i] = new Array(this.tabla2[i].length);
    }

    for(i = 0; i < this.tabla2.length; i++){
        for(j = 0; j < this.tabla2[i].length;j++){
            this.tablaDummy[i][j] = this.tabla2[i][j];
        }
    }

    this.borraFilasTablaDummy(fila, columna);
    this.borraColumnasTablaDummy(fila, columna);
};

Crea.prototype.borraFilasTablaDummy = function (fila, columna){
    var i = 0;
    var j = 0;
    var filas = new Array();
    for(i = 0; i < this.tablaDummy.length; i++){
        var contador = 0;
        for(j =0; j < this.tablaDummy[0].length; j++){
            if( (this.tablaDummy[i][j]!=undefined) || (i==fila && j===columna) ){
                contador++;
            }
        }
        if(contador < 2)
            filas.push(i);
    }

    if(filas.length > 0){
        for(i = 0; i < filas.length; i++){
            for(j =0; j<this.tablaDummy[filas[i]].length; j++){
                this.tablaDummy[filas[i]][j] = undefined;
            }
        }
    }
};

Crea.prototype.borraColumnasTablaDummy = function (fila, columna){
    var i = 0;
    var j = 0;
    var columnas = new Array();
    for(i = 0; i < this.tablaDummy[0].length; i++){
        var contador = 0;
        for(j =0; j < this.tablaDummy.length; j++){
            if( (this.tablaDummy[j][i]!=undefined) || (j==fila && i===columna) ){
                contador++;
            }
        }
        if(contador < 2)
            columnas.push(i);
    }

    if(columnas.length > 0){
        for(i = 0; i < columnas.length; i++){
            for(j =0; j<this.tablaDummy.length; j++){
                this.tablaDummy[j][columnas[i]] = undefined;
            }
        }
    }
};

Crea.prototype.vecinosFila = function (vecinos, indexFila, iteraciones){
    var flag = false;
    var i = 0;
    var tmp = new Array();
    if(iteraciones < 3){
        for (i =1; i<this.tablaDummy[indexFila].length-1; i++){
            if(this.tablaDummy[indexFila][i]!=undefined){
                tmp = [indexFila,i];
                if(!this.contiene(vecinos, tmp))
                    flag = true;
            }
        }
    } else {
         for (i =1; i<this.tablaDummy[indexFila].length-1; i++){
            tmp = [indexFila,i];
            if(tmp[0]==vecinos[0][0]&&tmp[1]==vecinos[0][1]){
                flag = true
            } else if(this.tablaDummy[indexFila][i]!=undefined){
                tmp = [indexFila,i];
                if(!this.contiene(vecinos, tmp))
                    flag = true;
            }
        }
    }
    return flag;
};

Crea.prototype.encuentraVecinoFila = function (vecinos, indexFila, iteraciones){
    var i = 0;
    var tmp = new Array();
    tmp = [0,0];
    if(iteraciones < 3){
        for (i =1; i<this.tablaDummy[indexFila].length-1; i++){
            if(this.tablaDummy[indexFila][i]!=undefined){
                tmp = [indexFila,i];
                if(!this.contiene(vecinos, tmp))
                    return tmp;
            }
        }
    } else {
         for (i =1; i<this.tablaDummy[indexFila].length-1; i++){
            tmp = [indexFila,i];
            if(tmp[0]==vecinos[0][0]&&tmp[1]==vecinos[0][1]){
                return tmp;
            } else if(this.tablaDummy[indexFila][i]!=undefined){
                tmp = [indexFila,i];
                if(!this.contiene(vecinos, tmp))
                    return tmp;
            }
        }
    }
    return tmp;
};

Crea.prototype.vecinosColumna = function (vecinos, indexCol, iteraciones){
    var flag = false;
    var i = 0;
    var tmp = new Array();
    if(iteraciones < 3){
        for (i =1; i<this.tablaDummy.length-1; i++){
            if(this.tablaDummy[i][indexCol]!=undefined){
                tmp = [i,indexCol];
                if(!this.contiene(vecinos, tmp))
                    flag = true;
            }
        }
    } else {
        for (i =1; i<this.tablaDummy.length-1; i++){
            tmp = [i,indexCol];
            if(tmp[0]==vecinos[0][0]&&tmp[1]==vecinos[0][1]){
                flag = true;
            }else if(this.tablaDummy[i][indexCol]!=undefined){
                tmp = [i,indexCol];
                if(!this.contiene(vecinos, tmp))
                    flag = true;
            }
        }
    }

    return flag;
};

Crea.prototype.encuentraVecinoColumna = function (vecinos, indexCol, iteraciones){
    var i = 0;
    var tmp = new Array();
    tmp = [0,0];
    if(iteraciones < 3){
        for (i =1; i<this.tablaDummy.length-1; i++){
            if(this.tablaDummy[i][indexCol]!=undefined){
                tmp = [i,indexCol];
                if(!this.contiene(vecinos, tmp))
                    return tmp;
            }
        }
    } else {
        for (i =1; i<this.tablaDummy.length-1; i++){
            tmp = [i,indexCol];
            if(tmp[0]==vecinos[0][0]&&tmp[1]==vecinos[0][1]){
                return tmp;
            }else if(this.tablaDummy[i][indexCol]!=undefined){
                tmp = [i,indexCol];
                if(!this.contiene(vecinos, tmp))
                    return tmp;
            }
        }
    }

    return tmp;
};

Crea.prototype.contiene = function (a, e){
    var res = false;
    for(var i = 0; i < a.length;i++){
        if(a[i][0] == e[0] && a[i][1] == e[1] )
            res = true;
    }
    return res;
};

Crea.prototype.repetidos = function (vecinos){
    for(var i=0; i<vecinos.length;i++){
        for(var j=i+1; j<vecinos.length;j++){
            if(vecinos[i][0]==vecinos[j][0] && vecinos[i][1]==vecinos[j][1])
                    return true;
        }
    }
    return false
};

Crea.prototype.calculaCiclo = function (ciclo){
    var suma = true;
    var resultado = 0;
    for(var i = 0; i<ciclo.length;i++){
        if(suma){
            if(this.tabla[ ciclo[i][0] ][ ciclo[i][1] ] != undefined){
                resultado += this.tabla[ ciclo[i][0] ][ ciclo[i][1] ];
                suma = false;
            } else
                suma = false;
        } else{
            resultado -= this.tabla[ ciclo[i][0] ][ ciclo[i][1] ];
            suma = true;
        }
    }
    return resultado;
};

Crea.prototype.mejoraSolucion = function (indices){
    var mejora = this.masNegativo(indices);
    var ciclo = new Array();
    var vecinos = new Array();
    vecinos.push([ mejora[1] , mejora[2] ]);
    var iteraciones = 0;
    this.creaDummy(mejora[1], mejora[2]);
    ciclo = this.buscaCiclo(vecinos, iteraciones);
    ciclo.pop();//quita repetido
    var unidades = this.menorUnidades(ciclo);

    var suma = true;
    for(var i = 0; i<ciclo.length;i++){
        if(suma){
            if(this.tabla2[ ciclo[i][0] ][ ciclo[i][1] ] != undefined){
                this.tabla2[ ciclo[i][0] ][ ciclo[i][1] ] = this.tabla2[ ciclo[i][0] ][ ciclo[i][1] ] + unidades;
                suma = false;
            } else
                this.tabla2[ ciclo[i][0] ][ ciclo[i][1] ] = unidades;
                suma = false;
        } else{
            this.tabla2[ ciclo[i][0] ][ ciclo[i][1] ] = this.tabla2[ ciclo[i][0] ][ ciclo[i][1] ] - unidades;
            if(this.tabla2[ ciclo[i][0] ][ ciclo[i][1] ] == 0)
               this.tabla2[ ciclo[i][0] ][ ciclo[i][1] ] = undefined;
            suma = true;
        }
    }
};

Crea.prototype.masNegativo = function(indices){
    var tmp = 1;
    var res = null;
    var i = 0;
    for(i=0; i<indices.length;i++){
        if(indices[i][0] < tmp)
            tmp = indices[i][0];
    }

    for(i=0; i<indices.length;i++){
        if(indices[i][0] == tmp)
            res = indices[i];
    }
    return res;
};

Crea.prototype.menorUnidades = function(ciclo){
    var unidades = Number.MAX_VALUE;
    var suma = true;
    for(var i = 0; i<ciclo.length;i++){
        if(suma){
            suma = false;
        } else{
            if(this.tabla2[ ciclo[i][0] ][ ciclo[i][1] ] < unidades)
                unidades = this.tabla2[ ciclo[i][0] ][ ciclo[i][1] ];
            suma = true;
        }
    }
    return unidades;
};

Crea.prototype.indicesNegativos = function (indices){
    var flag = false;
    for(var i=0; i<indices.length;i++){
        if(indices[i][0] < 0)
            flag = true;
    }
    return flag;
};
// Ejecución

var ejemplo = new Crea();
ejemplo.ejemplo();
ejemplo.inicializaTabla2();

ejemplo.northwestCorner();
document.write("Primera Solucion Factible (Northwest Corner)");
document.write(ejemplo.imprime());
document.write(ejemplo.imprimeSolucion());
ejemplo.steppingStone();
