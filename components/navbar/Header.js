import React, { Component } from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
export default function Headers({ Component, pageProps }) {
 
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbars</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Homess</Nav.Link>
                        <Nav.Link href="#features">Featuress</Nav.Link>
                        <Nav.Link href="#pricing">Pricings</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
} 