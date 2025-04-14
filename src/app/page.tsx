'use client'

import { useState } from "react";
import Template from "./components/Template";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Lógica fake de validação só pra teste
    if (email === "admin@email.com" && senha === "123456") {
      setErro("");
      alert("Login realizado com sucesso!");
      // Aqui você poderia redirecionar para o /home
    } else {
      setErro("Email ou senha inválidos.");
    }
  };

  return (
    <Template>
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          {erro && (
            <div className="bg-red-100 text-red-700 p-2 mb-4 rounded-md text-sm text-center">
              {erro}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </Template>
  );
}
