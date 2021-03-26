public class Candidato {
	
	public int votos = 0;
	public String nome;
	private String partido;
		
	public Candidato(String nome, String partido){
		this.nome=nome;
		this.partido=partido;
	}
	
	
	/*public void setNome(String nome){
		this.nome=nome;
	}
	
	public void setPartido(String partido){
		this.partido=partido;
	}*/
	
	
	public void Imprimir(int i){
		System.out.println("\n| Código: " + (i+1));
		System.out.println("| Candidato: " + this.nome);
		System.out.println("| Votos: " + this.votos);
		System.out.println("| Partido: " + this.partido);
	}
	
}
