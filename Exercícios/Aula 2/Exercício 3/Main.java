import java.util.Scanner;

public class Main{
	
	public static void main (String[] args){
		Scanner input = new Scanner(System.in);
		int n[] = new int[3];
		int maior = 0;
		
		for(int i=0; i<3; i++){
			System.out.print("| Digite valor " + (i+1) + ": \n| ");
			n[i] = input.nextInt();
		}
		
		maior = Maior(n, maior);
		
		System.out.println("\n| " + maior + " é o maior valor inserido.");
		
		
	}
	
	public static int Maior(int[] n, int maior){
		for (int i=0; i<3; i++){
			if(n[i] > maior){
				maior = n[i];
			}
		} 
		return maior;
	}
}
