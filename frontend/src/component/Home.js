import {useEffect, useState} from "react";
import axios from "axios";
import DashboardCard from "./DashboardCard";

import '../styles/global.css'

export const Home = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (localStorage.getItem('access_token') === null) {
            window.location.href = '/login'
        } else {
            (async () => {
                try {
                    const {data} = await axios.get('http://localhost:8000/home/', {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                    setMessage(data.message);
                } catch (e) {
                    console.log('not auth')
                }
            })()
        }
        ;
    }, []);

    return (
        <div className="container mt-5">
            <DashboardCard
                number="3"
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
        </div>
    );
};


