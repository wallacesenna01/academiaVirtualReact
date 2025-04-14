import React from "react";
import Link from "next/link";

interface TemplateProps {
    children: React.ReactNode
}

export default function Template({children}: TemplateProps ) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
            <Header/>


                <main className="flex-grow container mx-auto px-4 py-8">
                    {children}
                </main>

            <Footer/>

        </div>
    )

}


function Header() {
    return (
        <header className="bg-blue-700 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-4">
                <Link href="/">
                <h1  className="text-xl font-bold"  >🏫 Academia Virtual</h1>
                </Link>
                <nav className="space-x-4">
                <Link href="/" className="hover:underline">Home</Link>
                <a href="/alunos" className="hover:underline">Alunos</a>
                <a href="/cursos" className="hover:underline">Cursos</a>
                <a href="/professores" className="hover:underline">Professores</a>
                <a href="/matriculas" className="hover:underline">Matrículas</a>
                </nav>
            </div>

        </header>
    )
}

function Footer() {
    return (
        <footer className="bg-blue-700 text-white py-3 mt-10">
            <div className="container mx-auto text-center text-sm">
            © {new Date().getFullYear()} Academia Virtual · Feito por Wallace Artur
            </div>

        </footer>
    )
}