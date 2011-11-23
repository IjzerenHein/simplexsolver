package com.solver;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.Arrays;
import java.util.LinkedList;

public class Solver {
	
	public static NumberFormat df = new DecimalFormat("#0.000");
	
	int noRestricciones = 3;
	int noVariables = 2;
	boolean max = true;
	final double LT = 1;
	final double EQ = 2;
	final double GT = 3;
	
	public double temperatura;
	public double temperaturaPaso = 0.01;

	public double[] objetivo = new double[noVariables];
	public double[][] restricciones = new double[noRestricciones][noVariables+2];
	
	public double[] solucionActual;
	
	/********************************************David**********************************************/
	
	public final double precisionFinal = 0.01;
	
	
	/*******************************************Alejandro*******************************************/
	
	
	public Solver() {
		// TODO: Inicializar temperatura
		temperatura = 100000;
	}
	
	public void entrada() {
		double[] objetivo = {10, 15};
		this.objetivo = objetivo;
		double[] r1 = {5, 10, LT, 100};
		double[] r2 = {2.5, 2.5, LT, 2250};
		double[] r3 = {2, 1, LT, 1200};
		this.restricciones[0] = r1;
		this.restricciones[1] = r2;
		this.restricciones[2] = r3;
	}
	
	/** Genera una solucion aleatoria dentro del rango de las restricciones (factible)*/
	public double[] generaUnaSolucionInicial() {
		double[] solucion = new double[noVariables];
		for(int i = 0; i < solucion.length; i++)
			solucion[i] = Math.random() * Integer.MAX_VALUE;
		solucionActual = solucion;
		return solucion;
	}
	
	/** revisa que los valores de la solucion "posible" cumplan con la restriccion "restriccion" */
	public boolean pruebaRestriccion(double [] posible, double [] restriccion) {
		boolean res = false;
		double temp = 0.0;
		for(int i = 0; i < posible.length; i++)
			temp += restriccion[i] * posible[i];
		if(restriccion[restriccion.length-2] == this.LT){
			if(temp < restriccion[restriccion.length-1])
				return true;
		} else if(restriccion[restriccion.length-2] == this.EQ){
			if(temp == restriccion[restriccion.length-1])
				return true;			
		} else if(restriccion[restriccion.length-2] == this.GT){
			if(temp > restriccion[restriccion.length-1])
				return true;						
		}
		return res;
	}
	
	/** disminuye siempre la temperatura en X cantidad */
	public void actualizaTemperatura() {
		temperatura -= temperaturaPaso;
	}
	
	/** Funcion de evaluacion: Separar en casos si no se cumplen las restricciones se le da un valor negativo e ignorar Z 
	 *  Si cumple con las restricciones, solo tomar en cuenta el valor de Z */
	public double queTanBuenoEs(double[] posible) {
		boolean cumple = true;
		for(int i = 0; i < restricciones.length && cumple; i++){
			cumple &= pruebaRestriccion(posible, restricciones[i]);
		}
		
		if(cumple)
			return calculaZ(posible);
		else
			return -1.0;
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
		
		prob = Math.exp(-Math.abs(posible-actual)/this.temperatura);
		
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
		}
		return vecinoElegido;
	}
	
	/** Se obtiene una precisión dependiente de la temperatura */
	public double getPrecision() {
		double precision = temperatura * 0.1; 
		return precision<precisionFinal?precision : precisionFinal;
	}
	
	public static String printArray(double[] a) {
		StringBuilder b = new StringBuilder();
		b.append("[");
		for (double d : a) {
			b.append(df.format(d));			
			b.append(",");
		}
		b.append("]");
		return b.toString();
	}
	
	public static void main(String[] args) {
		Solver s = new Solver();
		s.entrada();
		s.generaUnaSolucionInicial();
		int i = 0;
		while (s.temperatura > 0) {
			double[] posible = s.vecinos();
			boolean acepto = s.boltzmann(s.queTanBuenoEs(s.solucionActual), s.queTanBuenoEs(posible));
			if (acepto) s.solucionActual = posible;
			s.actualizaTemperatura();
			if (i % 10000 == 0) System.out.println(i + " - " + printArray(s.solucionActual)  + ", " + s.temperatura);
			i++;
		}
		System.out.println(printArray(s.solucionActual));
	}
	
}
