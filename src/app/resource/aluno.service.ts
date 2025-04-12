import { Aluno } from "./aluno.resource";

export class AlunoService {
    baseUrl: string = 'http://localhost:8080/alunos';

    async buscar() :Promise<Aluno[]> {
        const response = await fetch(this.baseUrl, {
            method: 'GET',
        });

        if(!response.ok) {
            throw new Error("erro ao buscar aluno");
        }
        return await response.json();
    }

    

    async salvar(aluno: Aluno) : Promise<void> {
        const response = await fetch(`${this.baseUrl}/salvar`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(aluno)
        });

        if(!response.ok) {
            throw new Error("Erro ao salvar o aluno");
        }
    }
}