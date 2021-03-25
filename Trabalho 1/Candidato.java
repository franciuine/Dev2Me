public class Candidato {
	
	public int votos = 0;
	public String nome;
	private String partido;
	private int cod;
	
	public Candidato(int cod, String nome, String partido){
		this.cod=cod;
		this.nome=nome;
		this.partido=partido;
	}
	
	
	/*public void setNome(String nome){
		this.nome=nome;
	}
	
	public void setPartido(String partido){
		this.partido=partido;
	}*/
	
	
	public void Voto(){
		this.votos++;
	}
	
	public void Imprime(int i){
		System.out.println("\nCódigo " + (i+1));
		System.out.println("Candidato: " + this.nome);
		System.out.println("Votos: " + this.votos);
		System.out.println("Partido: " + this.partido);
	}
	
}
