import {useEffect, useState} from "react";
import axios from "axios";
import DashboardCard from "./DashboardCard";

import '../styles/global.css';

export const Home = () => {
    const [message, setMessage] = useState('');
    const [totalExams, setTotalExams] = useState(0); // Total de provas
    const [exams, setExams] = useState([]); // Lista de provas

    useEffect(() => {
        if (localStorage.getItem('access_token') === null) {
            window.location.href = '/login';
        } else {
            (async () => {
                try {
                    // Requisição para a URL original
                    const {data: homeData} = await axios.get('http://localhost:8000/home/', {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    setMessage(homeData.message);

                    // Requisição para a nova URL de exames
                    const {data: examsData} = await axios.get('http://localhost:8000/exams/home/', {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    setTotalExams(examsData.total); // Armazena o total de provas no estado
                    setExams(examsData.exams); // Armazena a lista de provas no estado
                } catch (e) {
                    console.log('Erro na requisição:', e);
                }
            })();
        }
    }, []);

    return (
        <div className="container mt-5">
            <DashboardCard
                number={totalExams} // Usa o total de provas retornado pela API
                text="Avaliações, Exercícios e Locais de Prova"
                icon={<i className="bi bi-list"></i>}
                link="/exam"
            />
            <DashboardCard
                number="9"
                text="Resultados"
                icon={<i className="bi bi-bar-chart-line"></i>}
                link="/resultados"
            />

            {/* Tabela com as Provas */}
            <div className="mt-5">
                <h2>Lista de Provas</h2>
                <table className="table table-bordered table-striped mt-3">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome da Prova</th>
                    </tr>
                    </thead>
                    <tbody>
                    {exams.length > 0 ? (
                        exams.map((exam) => (
                            <tr key={exam.id}>
                                <td>{exam.id}</td>
                                <td>{exam.name}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="text-center">Nenhuma prova disponível</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
