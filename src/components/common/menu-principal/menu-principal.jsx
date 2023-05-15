import './menu-principal.css'
import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'
import { Utils } from './../../../service/utils'

function MenuPrincipal({usuario, atualizar}) {
    return (
        <Navbar 
            expand="lg"
            className={usuario && usuario.acessibilidade ? `menu-${usuario.acessibilidade.tema.titulo}`:''}>
            <Container>
                <Navbar.Brand href='/app/inicial'>ApontaDev</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Parâmetro">
                            <NavDropdown.Item as={'div'} disabled={!Utils.TemPermissaoNaAplicacao(usuario, 'Permissão')}>
                                <Link
                                    to={'/app/permissao'}
                                    className='link-menu'>
                                    Permissão
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={'div'} disabled={!Utils.TemPermissaoNaAplicacao(usuario, 'Acessibilidade')}>
                                <Link
                                    to={'/app/acessibilidade'}
                                    className='link-menu'>
                                    Acessibilidade
                                </Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Cadastro">
                            <NavDropdown.Item as={'div'} disabled={!Utils.TemPermissaoNaAplicacao(usuario, 'Usuário')}>
                                <Link
                                    to={'/app/usuario'}                                   
                                    className='link-menu'>
                                    Usuário
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={'div'} disabled={!Utils.TemPermissaoNaAplicacao(usuario, 'Função')}>
                                <Link
                                    to={'/app/funcao'}
                                    className='link-menu'>
                                    Função
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={'div'} disabled={!Utils.TemPermissaoNaAplicacao(usuario, 'Equipe')}>
                                <Link
                                    to={'/app/equipe'}
                                    className='link-menu'>
                                    Equipe
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={'div'} disabled={!Utils.TemPermissaoNaAplicacao(usuario, 'Projeto')}>
                                <Link 
                                    to={'/app/projeto'}
                                    className='link-menu'>
                                    Projeto
                                </Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Apontamento">
                            <NavDropdown.Item as={'div'} disabled={!Utils.TemPermissaoNaAplicacao(usuario, 'Agenda')}>
                                <Link
                                    to={'/app/agenda'}
                                    className='link-menu'>
                                    Agenda
                                </Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Usuário: {usuario && usuario.dados_pessoais ? usuario.dados_pessoais.nome : usuario}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
  
export default MenuPrincipal