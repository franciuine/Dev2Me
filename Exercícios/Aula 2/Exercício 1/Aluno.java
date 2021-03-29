public class Aluno {
	public String nome;
	public float media, soma;
	public float nota1, nota2, nota3;
	
	public Aluno(String nome, float nota1, float nota2, float nota3){
		this.nome = nome;
		this.nota1 = nota1;
		this.nota2 = nota2;
		this.nota3 = nota3;
	}
	
	public float CalcularMedia(){
		this.soma = this.nota1 + this.nota2 + this.nota3;
		this.media = this.soma / 3;
		return this.media; 
	}
	
	public void Imprimir(int i){
		System.out.println("\n| Aluno " + (i+1));
		System.out.println("| Nome: " + this.nome);
	    System.out.println("| Nota 1: " + this.nota1);
	    System.out.println("| Nota 2: " + this.nota2);
	    System.out.println("| Nota 3: " + this.nota3);
		System.out.println("| Média: " + String.format("%.2f", this.media));
	}
}
