import java.util.Scanner;

public class Main{
	public static void main (String[] args){
		
		Scanner input = new Scanner(System.in);
		Candidato listaCandidatos[] = new Candidato[3];
		listaCandidatos[0] = new Candidato("Angela Pepino", "PMDB");
		listaCandidatos[1] = new Candidato("Gean da Silva", "PT");
		listaCandidatos[2] = new Candidato("Cesar Souza Neto", "DEM");
		int votos = 0, brancos = 0, nulos = 0;
		int maisVotos = 0;
		int op = 0;
		String eleito = null;
		
		while(op!=2){
			System.out.println("\n|----Eleições Dev2Me----|");
			System.out.println("| 1 - Inserir voto      |");
			System.out.print("| 2 - Encerrar votação  |\n| ");
			op = input.nextInt();
			
			switch(op){
				case 1:
					votos++;
					System.out.println("\n\n| 1 - Angela Pepino       |");
					System.out.println("| 2 - Gean da Silva       |");
					System.out.println("| 3 - Cesar de Souza Neto |");
					System.out.println("| 4 - Voto nulo           |");
					System.out.print("| 5 - Voto em branco      |\n| ");
					
					switch(input.nextInt()){
						case 1:
							listaCandidatos[0].Voto();
							break;
						case 2:
							listaCandidatos[1].Voto();
							break;
						case 3:
							listaCandidatos[2].Voto();
							break;
						case 4:
							nulos++;
							break;
						case 5:
							brancos++;
							break;
						default:
							System.err.println("\nX OPÇÃO INVÁLIDA! X");
					        break;
					}
				
					break;
				case 2:
					for(int i=0; i<3; i++){
						listaCandidatos[i].Imprime(i);
						if(listaCandidatos[i].votos > maisVotos){
							eleito = listaCandidatos[i].nome;
							maisVotos = listaCandidatos[i].votos;
						}
					}
					
					if (votos == 0){
						System.out.println("\nNão houveram votos o suficiente para concluir as eleições");
					} else {
						System.out.println("\n" + eleito + " foi eleito(a) com " + maisVotos + " votos");
						System.out.println("Total de votos: " + votos);	
						System.out.println("Total de votos nulos: " + nulos);
						System.out.println("Total de votos em branco: " + brancos);
			         	}
					System.exit(1);
					break;
				default:
					System.err.println("\nX OPÇÃO INVÁLIDA! X");
					break;
			}
		}	
	}
}
