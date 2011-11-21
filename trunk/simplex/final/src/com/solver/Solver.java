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
	
	public double precision = 0.01;
	
	
	public Solver() {
		// TOOD: Inicializar temperatura
	}
	
	public void entrada() {
		double[] objetivo = {10, 15};
		this.objetivo = objetivo;
		double[] r1;
	}
	
	/** Genera una solucion aleatoria dentro del rango de las restricciones (factible)*/
	public void generaUnaSolucionInicial() {
		
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
	
	public static void main(String[] args) {
		Solver s = new Solver();
		s.entrada();
	}
	
}
