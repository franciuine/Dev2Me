import java.util.Scanner;

public class Main{
	public static void main (String[] args){
		Scanner input = new Scanner(System.in);
		int n = 0;
		
		System.out.print("| Número de alunos a serem registrados: \n| ");
		n = input.nextInt();
		Aluno alunos[] = new Aluno[n];
		
		for (int i=0; i<n; i++){
			System.out.println("\n| Aluno(a) " + (i+1));
			System.out.print("| Nome: \n| ");
			String nome = input.next();
			System.out.print("| Nota 1: \n| ");
			float nota1 = input.nextInt();
			System.out.print("| Nota 2: \n| ");
			float nota2 = input.nextInt();
			System.out.print("| Nota 3: \n| ");
			float nota3 = input.nextInt();
			alunos[i] = new Aluno(nome, nota1, nota2, nota3);
			float media = alunos[i].CalcularMedia();
		}
		
		for(int i=0; i<n; i++){
			alunos[i].Imprimir(i);
		}
		
	}
}
