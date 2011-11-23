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
		for(int i = 0; i < solucion.length; i++)
			solucion[i] = Math.random() * Integer.MAX_VALUE;
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
