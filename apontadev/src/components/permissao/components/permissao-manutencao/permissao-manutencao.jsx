import './permissao-manutencao.css'
import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import Badge from 'react-bootstrap/Badge'
import ModalPesquisa from '../modal-pesquisa/modal-pesquisa'

function PermissaoManutencao({usuariologin}) {
    const [tipoPermissao, setTipoPermissao] = useState('cadastrado')
    const [tituloModal, setTituloModal] = useState('')
    const [mostrarModalPesquisa, setMostrarModalPesquisa] = useState(false)

    function AbreModalPesquisa(pesquisarPor) {
        switch (pesquisarPor) {
            case 'botao_equipes':
                setTituloModal('Equipes')
                setMostrarModalPesquisa(!mostrarModalPesquisa)
                break
            case 'botao_funcoes':
                setTituloModal('Funções')
                setMostrarModalPesquisa(!mostrarModalPesquisa)
                break
            case 'botao_usuarios':
                setTituloModal('Usuários')
                setMostrarModalPesquisa(!mostrarModalPesquisa)
                break
            default:
                break
        }
    }

    function ValidaCampoForm(e) {       
        const campo = e.target.id
        const valor = campo==='tipopermissao' ? e.target.selectedOptions[0].value : e.target.checked
        Validacao(campo, valor)
    }

    function Validacao(campo, valor) {
        switch(campo) {
            case 'tipopermissao':
                setTipoPermissao(valor)
                break
            case 'modoatalho':
                break
            case 'tema':
                break
            default:
                break
        }        
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Stack>
                        <Form.Select  
                            id='tipopermissao'
                            size='sm'
                            value={tipoPermissao}
                            onChange={(e) => ValidaCampoForm(e)} >
                            <option key='1001' value='cadastrado'>Permissão para usuários cadastrados</option>
                            <option key='1002' value='nao_cadastrado'>Permissão para usuários autônomos</option>
                        </Form.Select>
                        <InputGroup>
                            <Form.Control
                                id='equipes'
                                disabled={true}
                                placeholder="Escolha a equipe..." />
                            <Button 
                                id="botao_equipes"
                                variant="outline-secondary"
                                onClick={(e) => AbreModalPesquisa(e.target.id)} >
                                Pesquisar
                            </Button>
                        </InputGroup>
                        <InputGroup>
                            <Form.Control
                                id='funcoes'
                                disabled={true}
                                placeholder="Escolha a função..." />
                            <Button 
                                id="botao_funcoes" 
                                variant="outline-secondary"
                                onClick={(e) => AbreModalPesquisa(e.target.id)} >
                                Pesquisar
                            </Button>
                        </InputGroup>
                        <InputGroup>
                            <Form.Control
                                id='usuarios'
                                disabled={true}
                                placeholder="Escolha o usuário..." />
                            <Button 
                                id="botao_usuarios" 
                                variant="outline-secondary"
                                onClick={(e) => AbreModalPesquisa(e.target.id)} >
                                Pesquisar
                            </Button>
                        </InputGroup>
                    </Stack>
                </Col>
                <Col>
                    <h1>Filtros 2</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Tela</th>
                                <th>Funcionalidade</th>
                                <th>Equipe</th>
                                <th>Função</th>
                                <th>Usuário</th>
                                <th>Acesso</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Permissão</td>
                                <td>
                                    <Badge pill bg="success">Todas</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="success">Todas</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="success">Coordenador</Badge>
                                    <Badge pill bg="success">Desenvolvedor</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="success">Todos</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="primary">Sim</Badge>
                                </td>
                            </tr>
                            <tr>
                                <td>Agenda</td>
                                <td>
                                    <Badge pill bg="success">Incluir</Badge>
                                    <Badge pill bg="success">remover</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="success">Todas</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="success">Analista</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="success">Todos</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="danger">Não</Badge>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Pagination className='d-flex justify-content-center'>
                        <Pagination.First />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Last />
                    </Pagination>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Stack direction="horizontal" className='d-flex flex-row-reverse' gap={2}>
                        <Button variant="danger">Excluir</Button>
                        <Button variant="light">Limpar</Button>
                        <Button variant="primary">Adicionar</Button>
                    </Stack>
                </Col>
            </Row>

            {/* Modais */}
            <ModalPesquisa
                usuario={usuariologin}
                titulo={tituloModal}
                show={mostrarModalPesquisa}
                onHide={() => setMostrarModalPesquisa(false)}
            />
        </Container>
    )
}
  
export default PermissaoManutencao