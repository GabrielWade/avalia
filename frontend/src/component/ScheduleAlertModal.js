import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function ScheduleAlertModal({ showModal, handleCloseModal, userId }) {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');

    const handleSubmit = async () => {
        const alertData = {
            email,
            subject,
            message,
            schedule_time: scheduleTime,
        };

        try {
            await axios.post('http://localhost:8000/exams_location/alert/', alertData);
            alert('Alerta criado com sucesso!');
            handleCloseModal();
        } catch (error) {
            console.error('Erro ao criar alerta:', error);
            alert('Erro ao criar alerta.');
        }
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Criar Alerta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Digite o email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formSubject" className="mt-3">
                        <Form.Label>Assunto</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o assunto"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formMessage" className="mt-3">
                        <Form.Label>Mensagem</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Digite a mensagem"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formScheduleTime" className="mt-3">
                        <Form.Label>Data e Hora</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={scheduleTime}
                            onChange={(e) => setScheduleTime(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Criar Alerta
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ScheduleAlertModal;
