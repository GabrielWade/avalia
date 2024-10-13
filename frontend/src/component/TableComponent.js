import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { getSubjects } from "../api/UserSubject";

function TableComponent() {
    const [materias, setMaterias] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [materiaSelecionada, setMateriaSelecionada] = useState(null);
    const [formData, setFormData] = useState({
        dataProva: '',
        horarioProva: '',
        localProva: '',
    });

    const locaisDeProva = [
        'Sala 101',
        'Sala 102',
        'Laboratório de Informática',
        'Biblioteca',
        // Adicione mais locais conforme necessário
    ];

    useEffect(() => {
        const fetchMaterias = async () => {
            const data = await getSubjects();
            setMaterias(data);
        };

        fetchMaterias();
    }, []);

    const handleAgendarProva = (materia) => {
        setMateriaSelecionada(materia);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setMateriaSelecionada(null);
        setFormData({
            dataProva: '',
            horarioProva: '',
            localProva: '',
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('Prova agendada para a matéria:', materiaSelecionada.subject_name);
        console.log('Data:', formData.dataProva);
        console.log('Horário:', formData.horarioProva);
        console.log('Local:', formData.localProva);
        handleCloseModal();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome da Matéria</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {materias.map((materia) => (
                        <tr key={materia.id}>
                            <td>{materia.subject_name}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleAgendarProva(materia)}>
                                    Agendar Prova
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {materiaSelecionada && (
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agendar Prova - {materiaSelecionada.subject_name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formLocal">
                                <Form.Label>Local de Prova</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="localProva"
                                    value={formData.localProva}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecione o local</option>
                                    {locaisDeProva.map((local, index) => (
                                        <option key={index} value={local}>
                                            {local}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formData">
                                <Form.Label>Data da Prova</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dataProva"
                                    value={formData.dataProva}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formHorario">
                                <Form.Label>Horário</Form.Label>
                                <Form.Control
                                    type="time"
                                    name="horarioProva"
                                    value={formData.horarioProva}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mt-3">
                                Agendar
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
}

export default TableComponent;
