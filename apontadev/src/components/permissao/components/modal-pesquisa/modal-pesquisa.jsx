import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import { ServicoPermissao } from '../../../../service/servico'

function ModalPesquisa(props) {
    const [modalCodigo, setModalCodigo] = useState('')
    const [modalDescricao, setModalDescricao] = useState('')
    const [dadosTabela, setDadosTabela] = useState([])

    useEffect(() => {
        let dadosLogin = {
            usuario: props.usuario.email,
            senha: props.usuario.dados_acesso.senha
        }
        switch (props.titulo) {
            case 'Equipes':
                ServicoPermissao.RetornaListaEquipes(dadosLogin)
                .then((resp) => {
                    if(resp.erro) {
                        console.error(resp.msgErro)
                        setDadosTabela([])
                    } else {
                        let dados = resp.dados.map((v) => { return { codigo: v._id, descricao: v.nome } })
                        setDadosTabela(dados)
                    }
                }).catch((err) => {
                    console.error(err)
                    setDadosTabela([])
                })
                break
            case 'Funções':
                ServicoPermissao.RetornaListaFuncoes(dadosLogin)
                .then((resp) => {
                    if(resp.erro) {
                        console.error(resp.msgErro)
                        setDadosTabela([])
                    } else {
                        let dados = resp.dados.map((v) => { return { codigo: v._id, descricao: v.nome } })
                        setDadosTabela(dados)
                    }
                }).catch((err) => {
                    console.error(err)
                    setDadosTabela([])
                })
                break
            case 'Usuários':
                ServicoPermissao.RetornaListaUsuarios(dadosLogin)
                .then((resp) => {
                    if(resp.erro) {
                        console.error(resp.msgErro)
                        setDadosTabela([])
                    } else {
                        let dados = resp.dados.map((v) => { return { codigo: v._id, descricao: v.dados_pessoais.nome } })
                        setDadosTabela(dados)
                    }
                }).catch((err) => {
                    console.error(err)
                    setDadosTabela([])
                })
                break
            default:
                setDadosTabela([])
                break
        }
    }, [props.titulo])

    function RetornarSelecionados() {
        props.onHide()
    }

    function ValidaCampoModal(e) {       
        const campo = e.target.id
        const valor = e.target.value
        switch (campo) {
            case 'codigo':
                setModalCodigo(valor)
                break
            case 'descricao':
                setModalDescricao(valor)
                break
            default:
                break
        }
    }

    function InsereLinhasTabela(dados) {
        return dados.map((v, i, o) => <tr key={i}><td>{v.codigo}</td><td>{v.descricao}</td></tr>)
    }

    return (
        <Modal
            {...props}
            size='md'
            aria-labelledby='contained-modal-title-vcenter'
            centered>
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>{props.titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md='3'>
                        <Form.Control
                            id='codigo'
                            type='text'
                            value={modalCodigo}
                            placeholder='Código...'
                            onChange={(evento) => ValidaCampoModal(evento)} />
                    </Col>
                    <Col  md='9'>
                        <Form.Control
                            id='descricao'
                            type='text'
                            value={modalDescricao}
                            placeholder='Descrição...'
                            onChange={(evento) => ValidaCampoModal(evento)} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descrição</th>
                                </tr>
                            </thead>
                            <tbody>
                                {InsereLinhasTabela(dadosTabela)}
                            </tbody>
                        </Table>
                        <Pagination className='d-flex justify-content-center'>
                            <Pagination.First />
                            <Pagination.Item>{1}</Pagination.Item>
                            <Pagination.Last />
                        </Pagination>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => RetornarSelecionados()} >
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    )
  }
  
  export default ModalPesquisa