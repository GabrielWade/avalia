import React, {useState, useEffect} from 'react';
import {Table, Button} from 'react-bootstrap';
import axios from 'axios';
import {getSubjects} from '../api/UserSubject';
import ScheduleExamModal from './ScheduleExamModal';

import '../styles/global.css';

function TableComponent() {
    const [userId, setUserId] = useState(null);
    const [materias, setMaterias] = useState([]);
    const [locaisDeProva, setLocaisDeProva] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [materiaSelecionada, setMateriaSelecionada] = useState(null);
    const [examesDaMateria, setExamesDaMateria] = useState([]);

    useEffect(() => {
        const fetchLocaisDeProva = async () => {
            try {
                const {data} = await axios.get('http://localhost:8000/exams_location/');
                setLocaisDeProva(
                    data.exam_location.map((location) => ({
                        id: location.id,
                        name: location.name,
                    }))
                );
            } catch (error) {
                console.error('Erro ao buscar locais de prova:', error);
            }
        };

        fetchLocaisDeProva();
    }, []);

    useEffect(() => {
        const fetchMaterias = async () => {
            const data = await getSubjects();
            setMaterias(data);
        };
        fetchMaterias();
    }, []);

    const handleAgendarProva = async (materia) => {
        setMateriaSelecionada(materia);
        setShowModal(true);

        try {
            const {data} = await axios.get(`http://localhost:8000/exams/exam/${materia.subject}`);
            setExamesDaMateria(data);
        } catch (error) {
            console.error('Erro ao buscar exames da matéria:', error);
            setExamesDaMateria([]);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setMateriaSelecionada(null);
        setExamesDaMateria([]);
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th className="bold-heading">Matérias</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {materias.map((materia) => (
                    <tr key={materia.id}>
                        <td>{materia.subject_name}</td>
                        <td>
                            <Button variant="primary" size="sm" onClick={() => handleAgendarProva(materia)}>
                                Agendar Prova
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {materiaSelecionada && (
                <ScheduleExamModal
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                    materiaSelecionada={materiaSelecionada}
                    examesDaMateria={examesDaMateria}
                    locaisDeProva={locaisDeProva}
                    userId={userId}
                />
            )}
        </>
    );
}

export default TableComponent;
