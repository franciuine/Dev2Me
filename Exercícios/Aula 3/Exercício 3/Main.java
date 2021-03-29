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
		Trocar(tam, lista);
	}
	
	public static void PreencherLista(int tam, ArrayList<Integer> lista){
		Random rand = new Random();
		for(int i=0; i<tam; i++){
			lista.add(rand.nextInt(100));
			System.out.println("| Posição " + i + ": " + lista.get(i));
		}
	}
	
	public static void Trocar(int tam, ArrayList<Integer> lista){
		int auxini = lista.get(0);
		int auxfim = lista.get(tam-1);
		
		lista.set(0, auxfim);
		lista.set((tam-1), auxini);
		
		System.out.print("\n| Nova lista:");
		System.out.print("\n");
		
		for(int i=0; i<tam; i++){
			System.out.println("| Posição " + i + ": " + lista.get(i));
		}
	}
}
