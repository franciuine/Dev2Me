import java.util.Scanner;

public class Main{
	public static void main (String[] args){
		Scanner input = new Scanner(System.in);
		int n = 0, verifica = 0;
		
		System.out.print("| Número: \n| ");
		n = input.nextInt();
		verifica = Verificar(n);
		
		if(verifica == 1){
			System.out.println("| " + n + " é um número positivo.");
		}
		else if(verifica == -1){
			System.out.println("| " + n + " é um número negativo.");
		}
		
	}
	
	public static int Verificar(int numero){
		if(numero > 0){
			return 1;
		} else {
			return -1;
		}
	}
}
