package com.solver;

import java.text.DecimalFormat;
import java.text.NumberFormat;

public class Solver {
	
	public static NumberFormat df = new DecimalFormat("#0.000");
	
	int noRestricciones = 3;
	int noVariables = 2;
	boolean max = true;
	final double LT = 1;
	final double EQ = 2;
	final double GT = 3;
	
	public double temperatura;
	public double temperaturaPaso = 0.99995;

	public double[] objetivo = new double[noVariables];
	public double[][] restricciones = new double[noRestricciones][noVariables+2];
	public double[][] rangos = new double[noVariables][2];
	
	public double[] solucionActual;
	
	int midValue = 2000;
	
	/********************************************David**********************************************/
	
	public final double precisionFinal = 0.01;
	
	
	/*******************************************Alejandro*******************************************/
	
	
	public Solver() {
		// TODO: Inicializar temperatura
		temperatura = 90000000;
		for (int i = 0; i < rangos.length; i++) {
			//double[] inicial = { Double.NaN, Double.NaN };
			double[] inicial = { 0, 0 };
			rangos[i] = inicial;
		}
	}
	
	public void entrada() {
		double[] objetivo = {10, 15};
		this.objetivo = objetivo;
		double[] r1 = {5, 10, LT, 100};
		double[] r2 = {2.5, 2.5, LT, 2250};
		double[] r3 = {2, 1, LT, 1200};
		// No negatividad
		double[] r4 = {1, 0, GT, 0};
		double[] r5 = {0, 1, GT, 0};
		this.restricciones[0] = r1;
		this.restricciones[1] = r2;
		this.restricciones[2] = r3;
	}
	
	/** solo funciona con dos variables por el momento y para LT*/
	public void getRangos() {
		for (int i = 0; i < restricciones.length; i ++) {
			for (int j = 0; j < restricciones.length; j++) {
				if (j == i) continue; // skip one self
				
				// Construir matriz para resolver
				double[][] matriz = construirMatriz(restricciones[i], restricciones[j]);
				double[] resultadosMatriz = Gauss_Jordan.resolver(matriz);
				System.out.println(Solver.printArray(resultadosMatriz));
				for (int k = 0; k < noVariables; k++) {
					// Checar el piso
					if (Double.isNaN(rangos[k][0]) && resultadosMatriz[k] >= 0) rangos[k][0] = resultadosMatriz[k];
					else if (rangos[k][0] > resultadosMatriz[k] && resultadosMatriz[k] >= 0) rangos[k][0] = resultadosMatriz[k];
					// Checar el techo
					if (Double.isNaN(rangos[k][1])) rangos[k][1] = resultadosMatriz[k];
					else if (rangos[k][1] < resultadosMatriz[k]) rangos[k][1] = resultadosMatriz[k];
				}
			}
		}
	}
	
	public double[][] construirMatriz(double[] ... args) {
		double[][] matriz = new double[args.length][args[0].length-1]; // Remove sign
		
		for (int i = 0; i < args.length; i++) {
			double[] fila = new double[args[i].length - 1];
			System.arraycopy(args[i], 0, fila, 0, args[i].length-2);
			fila[fila.length-1] = args[i][args[i].length-1];
			matriz[i] = fila;
		}
		return matriz;
	}
	
	/** Genera una solucion aleatoria dentro del rango de las restricciones (factible)*/
	public double[] generaUnaSolucionInicial() {
		double[] solucion = new double[noVariables];
		for(int i = 0; i < solucion.length; i++) {
			double diferencia = rangos[i][1] - rangos[i][0];
			solucion[i] = Math.random() * diferencia + rangos[i][0];
//			solucion[i] = 400;
		}
		solucionActual = solucion;
		return solucion;
	}
	
	/** revisa que los valores de la solucion "posible" cumplan con la restriccion "restriccion" */
	public double pruebaRestriccion(double [] posible, double [] restriccion) {
		boolean res = false;
		double temp = 0.0;
		for(int i = 0; i < posible.length; i++)
			temp += restriccion[i] * posible[i];
		double diferencia = Math.abs(restriccion[restriccion.length-1] - temp);
		if(restriccion[restriccion.length-2] == this.LT){
			if(temp < restriccion[restriccion.length-1])
				return diferencia;
			else
				return -diferencia;
		} else if(restriccion[restriccion.length-2] == this.EQ){
			if(temp == restriccion[restriccion.length-1])
				return diferencia;
			else
				return -diferencia;			
		} else if(restriccion[restriccion.length-2] == this.GT){
			if(temp > restriccion[restriccion.length-1])
				return diferencia;
			else
				return -diferencia;						
		}
		return -diferencia;
	}
	
	/** disminuye siempre la temperatura en X cantidad */
	public void actualizaTemperatura() {
		temperatura *= temperaturaPaso;
	}
	
	/** Funcion de evaluacion: Separar en casos si no se cumplen las restricciones se le da un valor negativo e ignorar Z 
	 *  Si cumple con las restricciones, solo tomar en cuenta el valor de Z */
	public double queTanBuenoEs(double[] posible) {
		boolean cumple = true;
		for(int i = 0; i < restricciones.length && cumple; i++){
			cumple &= pruebaRestriccion(posible, restricciones[i]) >= 0;
		}
		
		if(cumple)
			return midValue - calculaZ(posible); // Al maximizar, debe ser la menor z posible
		else{
			double diferencia = 0.0;
			for(int i = 0; i < restricciones.length; i++){
				if(pruebaRestriccion(posible, restricciones[i]) < 0)
					diferencia += pruebaRestriccion(posible, restricciones[i]);
			}
			//Diferencia ya es negativo
			return midValue - diferencia;
		}
			
	}
	
	/** Calcula Z */
	public double calculaZ(double[] posible){
		double res = 0.0;
		for(int i = 0; i < posible.length; i++)
			res += this.objetivo[i] * posible[i];
		return res;
	}
	
	
	/** Probabilidad de aceptar */
	public boolean boltzmann(double actual, double posible) {
		double prob;
		
		if (max && posible < actual) return true;
		if (!max && posible > actual) return true;
		
		prob = Math.exp(Math.abs(posible-actual)/this.temperatura);
		
		return Math.random() < prob;
	}
	
	/** los vecinos a una distancia definida por <b>precision</b> */
	public double[] vecinos() {
		
		double precision = getPrecision();
		double[] vecinoElegido = new double[noVariables];
		for (int i = 0; i < noVariables; i++) {
			double rand = Math.random();
			if (rand >= 0.5) vecinoElegido[i] = solucionActual[i] + precision;
			else vecinoElegido[i] = solucionActual[i] - precision;
			// Mantenemos la solución en nuestro universo finito
			if (vecinoElegido[i] > rangos[i][1]) vecinoElegido[i] = rangos[i][1];
			if (vecinoElegido[i] < rangos[i][0]) vecinoElegido[i] = rangos[i][0];
		}
		return vecinoElegido;
	}
	
	/** Se obtiene una precisión dependiente de la temperatura */
	public double getPrecision() {
		double precision = temperatura * 0.1;
//		return precision>precisionFinal?precision : precisionFinal;
		return 1;
	}
	
	public static String printArray(double[][] a) {
		StringBuilder b = new StringBuilder();
		b.append("{");
		for (double[] d : a) b.append(printArray(d));
		b.append("}");
		return b.toString();		
	}
	
	public static String printArray(double[] a) {
		StringBuilder b = new StringBuilder();
		b.append("[");
		for (double d : a) {
			b.append(df.format(d));			
			b.append(" | ");
		}
		b.append("]");
		return b.toString();
	}
	
	public static void main(String[] args) {
		Solver s = new Solver();
		s.entrada();
		s.getRangos();
		System.out.println("______RANGOS_____________");
		System.out.println(printArray(s.rangos));
		System.out.println("_____INICIAL_____");
		System.out.println(printArray(s.generaUnaSolucionInicial()));
		System.out.println("_____RECOCIDO_____");
		
		int i = 0;
		while (s.temperatura > 0 && i < 1000000) {
			double[] posible = s.vecinos();
			boolean acepto = s.boltzmann(s.queTanBuenoEs(s.solucionActual), s.queTanBuenoEs(posible));
			if (acepto) s.solucionActual = posible;
			s.actualizaTemperatura();
			if (i % 10000 == 0) System.out.println(i + " - " + printArray(s.solucionActual) + "=>" + s.calculaZ(s.solucionActual)  + ", " + s.temperatura + " -> " + s.queTanBuenoEs(s.solucionActual));
//			System.out.println(i + " - " + printArray(s.solucionActual) + "=>" + s.calculaZ(s.solucionActual) + ", " + s.temperatura + " -> " + s.queTanBuenoEs(s.solucionActual));
			i++;
//			if (i % 10000 == 0) break;
			
		}
		System.out.println(printArray(s.solucionActual));
		double[] prueba = {400, 400};
		System.out.println(s.queTanBuenoEs(prueba));
	}
	
}
