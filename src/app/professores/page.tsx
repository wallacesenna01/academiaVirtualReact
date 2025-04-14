'use client'

import { useEffect, useState } from "react";
import Template from "../components/Template";


type Professor = {
    name?: string;
    speciality?: string;
};


export default function ProfessorPage() {

    const [professores, setProfessores] = useState<Professor[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch("http://localhost:8080/professores") // rota definida no back-end
          .then((res) => res.json())
          .then((data) => {
            setProfessores(data);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Erro ao buscar professores:", err);
            setLoading(false);
          });
      }, []);


    return (
        <Template>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Professores Disponíveis</h1>
    
            {loading ? (
              <p className="text-center">Carregando professores...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {professores.map((prof, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <div className="h-40 bg-gradient-to-r from-pink-500 to-rose-500 rounded-t-2xl"></div>
    
                    <div className="p-5">
                      <h2 className="text-xl font-semibold mb-1">{prof.name}</h2>
                      <p className="text-sm text-gray-600 italic mb-2">
                        {prof.speciality || "Especialidade não informada"}
                      </p>
                      <button className="mt-4 w-full bg-pink-600 text-white py-2 rounded-xl hover:bg-pink-700">
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
