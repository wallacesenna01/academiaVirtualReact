'use client';

import { useState, useEffect } from 'react';
import Template from '@/app/components/Template'
import  {AlunoService}  from '@/app/resource/aluno.service';
import {Aluno} from '@/app/resource/aluno.resource'




export default function NovoAlunoPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('')
  const [alunos, setAlunos] = useState<Aluno[]>([]); // Lista de alunos

  const handleSubmit  = async (e: React.FormEvent) => {

    const alunoService = new AlunoService();

    e.preventDefault();

    if (!nome || !email || !dataNascimento || !cpf || !phone) {
        alert('Por favor, preencha todos os campos.');
        return;
      }
    
      try {
        await alunoService.salvar({
          name: nome,
          email,
          cpf,
          birthday: dataNascimento,
          phone
        });
    
        alert('Aluno cadastrado com sucesso!');
        setNome('');
        setEmail('');
        setDataNascimento('');
        setCpf('');
        setPhone('');
      } catch (error) {
        console.error(error);
        alert('Erro ao cadastrar aluno.');
      }
    };

    const listarAlunos = async () => {

      const alunoService = new AlunoService(); // Cria a instância da AlunoService
      try {
        const resposta = await alunoService.buscar(); // Chama o método listar da AlunoService
        setAlunos(resposta); // Atualiza o estado com a lista de alunos
      } catch (error) {
        console.error('Erro ao listar alunos', error);
        alert('Erro ao listar alunos');
      }
    };

    useEffect(() => {
      listarAlunos(); // Chama a função de listar alunos assim que a página é carregada
    }, []);
  
    

  return (
    <Template>
      <h1 className="text-2xl font-bold mb-4">Novo Aluno</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block font-medium">Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Data de Nascimento:</label>
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">CPF:</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full border rounded p-2"
            maxLength={14}
            placeholder="000.000.000-00"
            required
          />
        </div>

        <div>
            <label className="block font-medium">phone</label>
            <input
            type='text'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='w-full border rounderd p-2'
            maxLength={14}
            placeholder='00-000000000'
            required/>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Salvar
        </button>
      </form>


      <div className="mt-8">
        <h2 className="text-xl font-bold">Lista de Alunos</h2>
        {alunos.length === 0 ? (
          <p className="mt-4 text-gray-500">Nenhum aluno encontrado.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {alunos.map((aluno, index) => (
              <li key={index} className="border p-2 rounded shadow">
                <strong>{aluno.name}</strong><br />
                Email: {aluno.email}<br />
                Nascimento: {aluno.birthday}<br />
                CPF: {aluno.cpf}<br />
                Fone: {aluno.phone}
              </li>
            ))}
          </ul>
        )}
      </div>

    </Template>
  );
}