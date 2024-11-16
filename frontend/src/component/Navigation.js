import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, {useState, useEffect} from 'react';

import '../styles/global.css'

import unifaaLogo from '../assets/images/unifaa_logo.webp';

export function Navigation() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true);
        }
    }, [isAuth]);

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
                            <Nav.Link href="/termosDeUso" className="custom-link">Termos de Uso</Nav.Link>
                        </>
                    ) : null}
                </Nav>
                <Nav>
                    {isAuth ?
                        <Nav.Link href="/logout" className="custom-link">Logout</Nav.Link> :
                        <Nav.Link href="/login" className="custom-link">Login</Nav.Link>
                    }
                </Nav>
            </Navbar>
        </div>
    );
}