import java.util.Scanner;
import java.util.ArrayList;

public class Main{
	
	public static Scanner input = new Scanner(System.in);
	
	public static void main (String[] args){
		int tam = 0;
		ArrayList<Integer> lista = new ArrayList<Integer>();
				
		System.out.print("| Tamanho: \n| ");
		tam = input.nextInt();
		System.out.print("\n");
		
		PreencherLista(tam, lista);
		Somar(tam, lista);
	}
	
	public static void PreencherLista(int tam, ArrayList<Integer> lista){
		for(int i=0; i<tam; i++){
			System.out.print("| Digite valor a ser inserido na posição " + i + " da lista: \n| ");
			lista.add(input.nextInt());
		}
		System.out.print("\n");
		for(int i=0; i<tam; i++){
			System.out.println("| Posição " + i + ": " + lista.get(i));
		}
	}
	
	public static void Somar(int tam, ArrayList<Integer> lista){
		int soma = 0;
		for(int i=0; i<tam; i++){
			soma = soma + lista.get(i);
		}
		System.out.println("| Soma dos elementos da lista: " + soma);
	}
}
