import java.util.Scanner;
import java.util.ArrayList;
import java.util.Random;

public class Main{

	public static void main (String[] args){
		Scanner input = new Scanner(System.in);
		int tam = 0;
		ArrayList<Integer> lista = new ArrayList<Integer>();
				
		System.out.print("| Tamanho: \n| ");
		tam = input.nextInt();
		System.out.print("\n");
		
		PreencherLista(tam, lista);
		Pares(tam, lista);
	}
	
	public static void PreencherLista(int tam, ArrayList<Integer> lista){
		Random rand = new Random();
		for(int i=0; i<tam; i++){
			lista.add(rand.nextInt(100));
			System.out.println("| Posição " + i + ": " + lista.get(i));
		}
	}
	
	public static void Pares(int tam, ArrayList<Integer> lista){
		int par = 0, valor;
		for(int i=0; i<tam; i++){
			valor = lista.get(i);
			if(valor % 2 == 0){
				par++;
			}
		}
		System.out.println("\n| A lista possui " + par + " elementos pares.");
	}
}
