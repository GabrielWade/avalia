import React, {useState, useEffect} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import '../styles/global.css';

import unifaaLogo from '../assets/images/unifaa_logo.webp';

export function Navigation() {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [showTermsModal, setShowTermsModal] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true);
            fetchUserData();
        }
    }, [isAuth]);

    const fetchUserData = async () => {
        try {
            const response = await fetch('http://localhost:8000/user/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
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

    const handleShowTermsModal = () => setShowTermsModal(true);
    const handleCloseTermsModal = () => setShowTermsModal(false);

    const handleGoToAdmin = () => {
        window.location.href = 'http://localhost:8000/admin/login/?next=/admin/';
    };

    return (
        <div>
            <Navbar bg="light" variant="light" className="px-3">
                <Navbar.Brand href="/">
                    <img
                        src={unifaaLogo}
                        width="150"
                        height="auto"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Nav className="me-auto">
                    {isAuth ? (
                        <>
                            <Nav.Link href="/" className="custom-link">Home</Nav.Link>
                            <Nav.Link href="/exam" className="custom-link">Avaliações</Nav.Link>
                            <Nav.Link href="/resultados" className="custom-link">Resultados</Nav.Link>
                        </>
                    ) : null}
                </Nav>
                <Nav>
                    {isAuth && user ? (
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="light" className="custom-link" id="user-dropdown">
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
            </Navbar>

            {/* Modal para Termos de Uso */}
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
        </div>
    );
}
