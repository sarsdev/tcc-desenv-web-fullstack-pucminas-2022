import './menu-principal.css'
import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'

function MenuPrincipal({usuario}) {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href='/app/inicial'>ApontaDev</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Parâmetro">
                            <NavDropdown.Item as={'div'}>
                                <Link to={'/app/permissao'} className='link-menu'>Permissão</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={'div'}>
                                <Link to={'/app/acessibilidade'} className='link-menu'>Acessibilidade</Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Cadastro">
                            <NavDropdown.Item href="usuario">Usuário</NavDropdown.Item>
                            <NavDropdown.Item href="funcao">Função</NavDropdown.Item>
                            <NavDropdown.Item href="equipe">Equipe</NavDropdown.Item>
                            <NavDropdown.Item href="projeto">Projeto</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Apontamento">
                            <NavDropdown.Item href="agenda">Agenda</NavDropdown.Item>
                            <NavDropdown.Item href="manutencao">Manutenção</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Análise">
                            <NavDropdown.Item href="acompanhamento">Acompanhamento</NavDropdown.Item>
                            <NavDropdown.Item href="simulador">Simulador</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Usuário: {usuario}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
  
export default MenuPrincipal