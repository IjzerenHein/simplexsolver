package com.solver;

public class Solver {
	
	int noRestricciones = 3;
	int noVariables = 5;
	boolean max = true;
	final double LT = 1;
	final double EQ = 2;
	final double GT = 3;
	
	public double temperatura;
	public double temperaturaPaso = 0.01;

	public double[] objetivo = new double[noVariables];
	public double[][] restricciones = new double[noRestricciones][noVariables+2];
	
	/********************************************David**********************************************/
	
	public final double precisionFinal = 0.01;
	
	
	/*******************************************Alejandro*******************************************/
	
	
	public Solver() {
		// TOOD: Inicializar temperatura
	}
	
	public void entrada() {
		double[] objetivo = {10, 15};
		this.objetivo = objetivo;
		double[] r1;
	}
	
	/** Genera una solucion aleatoria dentro del rango de las restricciones (factible)*/
	public double[] generaUnaSolucionInicial() {
		double[] solucion = new double[noVariables];
		boolean encontrada = false;
		while(!encontrada){
			
		}
		return solucion;
	}
	
	/** disminuye siempre la temperatura en X cantidad */
	public void actualizaTemperatura() {
		
	}
	
	/** Funcion de evaluación, calcular Z */
	public void queTanBuenoEs() {
		
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
	public void vecinos() {
		
	}
	
	
	/** Se obtiene una precisión dependiente de la temperatura */
	public double getPrecision() {
		double precision = temperatura * 0.1; 
		return precision<precisionFinal?precision : precisionFinal;
	}
	
	public static void main(String[] args) {
		Solver s = new Solver();
		s.entrada();
	}
	
}
