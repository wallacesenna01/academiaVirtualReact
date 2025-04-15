'use client'

import { useState, useEffect } from "react";
import Template from "../components/Template";



type Matricula = {

    id?: number;
    alunoId?: number;
    alunoNome?: string;
    cursoId?: number;
    cursoNome?: string
    dataMatricula:  Date


}

export default function MatriculaPage() {


    const [matriculas, setMatriculas] = useState<Matricula[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/matriculas")
        .then((res) => res.json())
        .then((data) => {
            setMatriculas(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Erro ao buscar matriculas: ", err)
            setLoading(false);
        });
    }, []);


    return (
        <Template>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Matrículas Registradas</h1>
    
            {loading ? (
              <p className="text-center">Carregando matrículas...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {matriculas.map((matricula) => (
                  <div
                    key={matricula.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <div className="h-40 bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-2xl"></div>
    
                    <div className="p-5">
                      <h2 className="text-xl font-semibold mb-1">{matricula.alunoNome}</h2>
                      <p className="text-sm text-gray-600 italic mb-2">
                        Curso: {matricula.cursoNome}
                      </p>
                      <p className="text-gray-700 text-sm">
                        Data de matrícula:{" "}
                        {new Date(matricula.dataMatricula).toLocaleDateString()}
                      </p>
                      <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700">
                        Ver detalhes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Template>
      );
    }