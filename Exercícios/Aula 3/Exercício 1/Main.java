import java.util.Scanner;
import java.util.ArrayList;
import java.util.Random;

public class Main{
	
	public static void main (String[] args){
		Scanner input = new Scanner(System.in);
		int tam = 0, m = 0;
		ArrayList<Integer> lista = new ArrayList<Integer>();
				
		System.out.print("| Tamanho: \n| ");
		tam = input.nextInt();
		System.out.print("\n");
		
		PreencherLista(tam, lista);
		
		System.out.print("\n| Buscar por elemento: \n| ");
		m = input.nextInt();
		
		EncontrarElemento(tam, m, lista);
	
	}
	
	public static void PreencherLista(int tam, ArrayList<Integer> lista){
		Random rand = new Random();
		for(int i=0; i<tam; i++){
			lista.add(rand.nextInt(100));
			System.out.println("| Posição " + i + ": " + lista.get(i));
		}
	}
	
	public static void EncontrarElemento(int tam, int m, ArrayList<Integer> lista){
		for(int i=0; i<tam; i++){
			int valor = lista.get(i);
			if(m == valor){
				System.out.println("\n| Elemento " + valor + " encontrado na posição " + i + ".");
				return;
			}
		}
		System.out.println("\n| Elemento não encontrado.");
	}
}
