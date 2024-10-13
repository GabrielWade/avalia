import {useEffect, useState} from "react";
import axios from "axios";
import TableComponent from "./TableComponent";

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
            <h1>Matérias Disponíveis</h1>
            <TableComponent/>
        </div>
    );
}