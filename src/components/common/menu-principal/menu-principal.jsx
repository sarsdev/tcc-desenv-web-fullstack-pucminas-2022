import './menu-principal.css'
import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'

function MenuPrincipal({usuario, atualizar}) {
    return (
        <Navbar 
            expand="lg"
            className={usuario.acessibilidade ? `menu-${usuario.acessibilidade.tema.titulo}`:''}>
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
                            <NavDropdown.Item as={'div'}>
                                <Link to={'/app/usuario'} className='link-menu'>Usuário</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={'div'}>
                                <Link to={'/app/funcao'} className='link-menu'>Função</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={'div'}>
                                <Link to={'/app/equipe'} className='link-menu'>Equipe</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={'div'}>
                                <Link to={'/app/projeto'} className='link-menu'>Projeto</Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Apontamento">
                            <NavDropdown.Item href="agenda">Agenda</NavDropdown.Item>
                            {/* <NavDropdown.Item href="manutencao">Manutenção</NavDropdown.Item> */}
                        </NavDropdown>
                        {/* <NavDropdown title="Análise">
                            <NavDropdown.Item href="acompanhamento">Acompanhamento</NavDropdown.Item>
                            <NavDropdown.Item href="simulador">Simulador</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Usuário: {usuario.acessibilidade ? usuario.dados_pessoais.nome : usuario}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
  
export default MenuPrincipal