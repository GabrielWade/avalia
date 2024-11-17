import React, {useState, useEffect} from 'react';
import {Navbar, Nav, Dropdown, Modal, Button, Container, Table} from 'react-bootstrap';
import '../styles/global.css';
import unifaaLogo from '../assets/images/unifaa_logo.webp';

export function Navigation() {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showAlertsModal, setShowAlertsModal] = useState(false);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsAuth(true);
            fetchUserData(token);
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await fetch('http://localhost:8000/user/', {
                headers: {Authorization: `Bearer ${token}`},
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                console.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchAlerts = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch('http://localhost:8000/exams_location/alert/', {
                headers: {Authorization: `Bearer ${token}`},
            });
            if (response.ok) {
                const data = await response.json();
                setAlerts(data.emails);
            } else {
                console.error('Failed to fetch alerts');
            }
        } catch (error) {
            console.error('Error fetching alerts:', error);
        }
    };

    const deleteAlert = async (id) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`http://localhost:8000/exams_location/alert/${id}/`, {
                method: 'DELETE',
                headers: {Authorization: `Bearer ${token}`},
            });
            if (response.ok) {
                setAlerts((prevAlerts) => prevAlerts.filter(alert => alert.id !== id));
            } else {
                console.error('Failed to delete alert');
            }
        } catch (error) {
            console.error('Error deleting alert:', error);
        }
    };

    const handleShowTermsModal = () => setShowTermsModal(true);
    const handleCloseTermsModal = () => setShowTermsModal(false);

    const handleShowAlertsModal = () => {
        fetchAlerts();
        setShowAlertsModal(true);
    };
    const handleCloseAlertsModal = () => setShowAlertsModal(false);

    const handleGoToAdmin = () => window.location.href = 'http://localhost:8000/admin/login/?next=/admin/';

    return (
        <>
            <Navbar bg="light" expand="lg" className="px-3">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={unifaaLogo}
                            width="150"
                            height="auto"
                            className="d-inline-block align-top"
                            alt="Logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {isAuth && (
                                <>
                                    <Nav.Link href="/" className="custom-link">Home</Nav.Link>
                                    <Nav.Link href="/exam" className="custom-link">Avaliações</Nav.Link>
                                    <Nav.Link href="/resultados" className="custom-link">Resultados</Nav.Link>
                                    <Nav.Link onClick={handleShowAlertsModal} className="custom-link">Alertas</Nav.Link>
                                </>
                            )}
                        </Nav>
                        <Nav>
                            {isAuth && user ? (
                                <Dropdown align="end">
                                    <Dropdown.Toggle variant="light" className="custom-link">
                                        {user.username}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {user.is_superuser && (
                                            <Dropdown.Item onClick={handleGoToAdmin}>
                                                Grupo: Super User
                                            </Dropdown.Item>
                                        )}
                                        <Dropdown.Item onClick={handleShowTermsModal}>
                                            Termos de Uso
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                <Nav.Link href="/login" className="custom-link">Login</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={showTermsModal} onHide={handleCloseTermsModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Termos de Uso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        É dever do usuário utilizar o banco de questões de fonte AvaliA com idoneidade, não sendo
                        permitida a distribuição, disseminação e disponibilização das questões aos estudantes na forma
                        de cadernos de provas ou similares, assim como para demais integrantes da comunidade acadêmica
                        e não-acadêmica.
                    </p>
                    <p>
                        Não é permitido ao usuário redistribuição, revenda ou sublicenciamento de qualquer forma e para
                        qualquer terceiro que não os usuários da plataforma AvaliA.
                    </p>
                    <p>
                        Não é permitida a modificação, tradução ou transformação dos conteúdos da plataforma AvaliA de
                        forma que infrinjam os direitos de autor ou outros direitos de propriedade intelectual ora
                        licenciados.
                    </p>
                    <p>
                        Não é permitida também, a realização de cópias, mesmo que temporárias, dos conteúdos presentes
                        na plataforma AvaliA.
                    </p>
                    <p>
                        Também é vedada a incorporação de partes dos conteúdos da plataforma AvaliA em apostilas de
                        curso impressas ou eletrônicas e em ambientes virtuais de ensino.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseTermsModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAlertsModal} onHide={handleCloseAlertsModal} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Alertas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="table-responsive">
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Email</th>
                                <th>Horário</th>
                                <th>Assunto</th>
                                <th>Mensagem</th>
                                <th>Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                            {alerts.map((alert) => (
                                <tr key={alert.id}>
                                    <td>{alert.email}</td>
                                    <td>{new Date(alert.schedule_time).toLocaleString()}</td>
                                    <td>{alert.subject}</td>
                                    <td>{alert.message}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => deleteAlert(alert.id)}
                                        >
                                            Deletar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAlertsModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}
