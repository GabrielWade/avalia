import React, {useState} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import axios from 'axios';

function ScheduleExamModal({
                               showModal,
                               handleCloseModal,
                               materiaSelecionada,
                               examesDaMateria,
                               locaisDeProva,
                               userId,
                           }) {
    const [formData, setFormData] = useState({
        exameSelecionado: '',
        localProva: '',
        mesSelecionado: '',
        dataProva: '',
        horarioProva: '',
    });
    const [horariosDeProva, setHorariosDeProva] = useState([]);
    const [mesesDisponiveis, setMesesDisponiveis] = useState([]);
    const [diasDisponiveis, setDiasDisponiveis] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLocalChange = async (event) => {
        const localProvaId = event.target.value;
        setFormData({...formData, localProva: localProvaId, mesSelecionado: '', dataProva: '', horarioProva: ''});
        setHorariosDeProva([]);
        setMesesDisponiveis([]);
        setDiasDisponiveis([]);
        setErrorMessage('');

        try {
            const {data: horariosData} = await axios.get(
                `http://localhost:8000/exams_location/exam_location_time/${localProvaId}`
            );
            setHorariosDeProva(
                horariosData.exam_location_time.map((horario) => ({
                    id: horario.id,
                    start: horario.start_time,
                    end: horario.end_time,
                }))
            );

            const {data: calendarioData} = await axios.get(
                `http://localhost:8000/exams_location/exam_location_calendar/${localProvaId}`
            );
            const meses = calendarioData.calendars.map((calendario) => ({
                month: calendario.month,
                days: calendario.days,
            }));
            setMesesDisponiveis(meses);

            if (meses.length > 0) {
                setFormData((prevState) => ({
                    ...prevState,
                    mesSelecionado: meses[0].month,
                }));
                setDiasDisponiveis(meses[0].days);
            }
        } catch (error) {
            console.error('Erro ao buscar horários e calendário de prova:', error);
        }
    };

    const handleMesChange = (event) => {
        const mes = event.target.value;
        setFormData({...formData, mesSelecionado: mes, dataProva: '', horarioProva: ''});

        const diasDoMes = mesesDisponiveis.find((item) => item.month === mes)?.days || [];
        setDiasDisponiveis(diasDoMes);
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const {exameSelecionado, localProva, dataProva, horarioProva} = formData;

        if (!exameSelecionado || !localProva || !dataProva || !horarioProva) {
            setErrorMessage('Erro: Todos os campos são obrigatórios.');
            return;
        }

        const payload = {
            exam_location: parseInt(localProva, 10),
            user: userId,
            calendar: parseInt(dataProva, 10),
            exam_time: parseInt(horarioProva, 10),
            exam: parseInt(exameSelecionado, 10),
            month: formData.mesSelecionado,
        };

        setIsSubmitting(true);

        try {
            const response = await axios.post('http://localhost:8000/exams_location/exam_scheduled/', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response && response.data) {
                console.log('Prova agendada com sucesso:', response.data);
                handleCloseModal();
            } else {
                throw new Error('Resposta inesperada do servidor.');
            }
        } catch (error) {
            const serverError = error.response?.data?.detail || 'Horário indisponível';
            setErrorMessage(serverError);
            console.error('Erro ao agendar a prova:', error);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <Modal show={showModal} onHide={!isSubmitting ? handleCloseModal : null}>
            <Modal.Header closeButton={!isSubmitting}>
                <Modal.Title>Agendar Prova - {materiaSelecionada.subject_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formExame">
                        <Form.Label>Exame</Form.Label>
                        <Form.Control
                            as="select"
                            name="exameSelecionado"
                            value={formData.exameSelecionado}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione o exame</option>
                            {examesDaMateria.map((exame) => (
                                <option key={exame.id} value={exame.id}>
                                    {exame.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formLocal">
                        <Form.Label>Local de Prova</Form.Label>
                        <Form.Control
                            as="select"
                            name="localProva"
                            value={formData.localProva}
                            onChange={handleLocalChange}
                            required
                        >
                            <option value="">Selecione o local</option>
                            {locaisDeProva.map((local) => (
                                <option key={local.id} value={local.id}>
                                    {local.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formMes">
                        <Form.Label>Mês da Prova</Form.Label>
                        <Form.Control
                            as="select"
                            name="mesSelecionado"
                            value={formData.mesSelecionado}
                            onChange={handleMesChange}
                            required
                            disabled={!mesesDisponiveis.length}
                        >
                            <option value="">Selecione o mês</option>
                            {mesesDisponiveis.map((mes) => (
                                <option key={mes.month} value={mes.month}>
                                    {mes.month}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formData">
                        <Form.Label>Dia da Prova ({formData.mesSelecionado})</Form.Label>
                        <Form.Control
                            as="select"
                            name="dataProva"
                            value={formData.dataProva}
                            onChange={handleChange}
                            required
                            disabled={!diasDisponiveis.length}
                        >
                            <option value="">Selecione o dia</option>
                            {diasDisponiveis.map((dia) => (
                                <option key={dia} value={dia}>
                                    {dia}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formHorario">
                        <Form.Label>Horário</Form.Label>
                        <Form.Control
                            as="select"
                            name="horarioProva"
                            value={formData.horarioProva}
                            onChange={handleChange}
                            required
                            disabled={!horariosDeProva.length}
                        >
                            <option value="">Selecione o horário</option>
                            {horariosDeProva.map((horario) => (
                                <option key={horario.id} value={horario.id}>
                                    {`${horario.start} - ${horario.end}`}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3" disabled={isSubmitting}>
                        {isSubmitting ? 'Aguarde...' : 'Agendar'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>

    );
}

export default ScheduleExamModal;
