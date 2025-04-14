'use client'

import { useEffect, useState } from "react";
import Template from "../components/Template";

type Course = {
  id: number;
  name: string;
  category: string;
  description: string;
};

export default function CursoPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/courses") // troque pela URL real do seu backend
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar cursos:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Template>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Cursos Disponíveis</h1>

        {loading ? (
          <p className="text-center">Carregando cursos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-2xl"></div>

                <div className="p-5">
                  <h2 className="text-xl font-semibold mb-1">{course.name}</h2>
                  <p className="text-sm text-gray-600 italic mb-2">
                    {course.category}
                  </p>
                  <p className="text-gray-700 text-sm">{course.description}</p>
                  <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700">
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
