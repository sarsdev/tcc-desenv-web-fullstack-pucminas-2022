import './modal-pesquisa.css'
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
    const qtdLinhasPaginacao = 5

    const [modalCodigo, setModalCodigo] = useState('')
    const [codigoInvalido, setCodigoInvalido] = useState(false)
    const [modalDescricao, setModalDescricao] = useState('')
    const [descricaoInvalida, setDescricaoInvalida] = useState(false)
    const [dadosTabela, setDadosTabela] = useState([])
    const [linhasMarcadas, setLinhasMarcadas] = useState([])
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [paginaAtual, setPaginaAtual] = useState(1)

    useEffect(() => {
        setLinhasMarcadas([...props.selecionados])
        setPaginaAtual(1)
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
                        console.log(props.selecionados)
                        let dados = resp.dados.map((v) => {
                            let indMarcado = props.selecionados.filter((valor, i, o) => valor.codigo === v._id).length > 0
                            return { marcado: indMarcado, codigo: v._id, descricao: v.nome } 
                        })
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
                        let dados = resp.dados.map((v) => { 
                            let indMarcado = props.selecionados.filter((valor, i, o) => valor.codigo === v._id).length > 0
                            return { marcado: indMarcado, codigo: v._id, descricao: v.nome } 
                        })
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
                        let dados = resp.dados.map((v) => { 
                            let indMarcado = props.selecionados.filter((valor, i, o) => valor.codigo === v._id).length > 0
                            return { marcado: indMarcado, codigo: v._id, descricao: v.dados_pessoais.nome } 
                        })
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

    function valorAlfanumerico(str, campo){
        switch (campo) {
            case 'codigo':
                return /^\w+$/.test(str)
            case 'descricao':
                return /^[\w\s]+$/.test(str)
            default:
                return false
        }
    }

    function RetornarSelecionados() {
        props.onHide({ campo: props.titulo, selecionados: linhasMarcadas })
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
        let dadosFiltrados = dados
        if(modalCodigo) {
            if(valorAlfanumerico(modalCodigo, 'codigo')) {
                if(codigoInvalido) {
                    setCodigoInvalido(false)
                }
                dadosFiltrados = dadosFiltrados.filter((v, i, o) => v.codigo.indexOf(modalCodigo) > -1)
            } else {
                if(!codigoInvalido) {
                    setCodigoInvalido(true)
                }
            }
        }
        if(modalDescricao) {
            if(valorAlfanumerico(modalDescricao, 'descricao')) {
                if(descricaoInvalida) {
                    setDescricaoInvalida(false)
                }
                dadosFiltrados = dadosFiltrados.filter((v, i, o) => v.descricao.indexOf(modalDescricao) > -1)
            } else {
                if(!descricaoInvalida) {
                    setDescricaoInvalida(true)
                }
            }
        }
        if(dadosFiltrados.length > qtdLinhasPaginacao) {
            let qtdPaginas = Math.ceil(dadosFiltrados.length / qtdLinhasPaginacao)
            if(totalPaginas !== qtdPaginas) {
                setTotalPaginas(qtdPaginas)
                if(paginaAtual > qtdPaginas) {
                    setPaginaAtual(qtdPaginas)
                }
            }
            dadosFiltrados = dadosFiltrados.filter((v, i, o) => i >= ((qtdLinhasPaginacao * paginaAtual) - qtdLinhasPaginacao) && i <= (qtdLinhasPaginacao * paginaAtual)-1)
        } else {
            if(totalPaginas !== 1) {
                setTotalPaginas(1)
                if(paginaAtual > 1) {
                    setPaginaAtual(1)
                }
            }
        }
        return dadosFiltrados.map((v, i, o) => 
            <tr key={i}>
                <td>
                    <Form.Check
                        id={'check'+i}
                        type='checkbox'
                        label=''
                        value={JSON.stringify(v)}
                        checked={v.marcado}
                        onChange={(e) => SelecionarLinha(e)} />
                </td>
                <td>
                    {v.codigo}
                </td>
                <td>
                    {v.descricao}
                </td>
            </tr>)
    }

    function MontaPaginacaoTabelaModal() {
        if(totalPaginas >= 1 && totalPaginas <= 3) {
            let listaPaginas = []
            for (let index = 1; index <= totalPaginas; index++) {
                listaPaginas.push(index)                                        
            }
            return (<>
                <Pagination.First
                    id='first'
                    hidden={true}
                    onClick={(e) => MudaPaginaTabela(e)} />
                {listaPaginas.map((v, i, o) => <Pagination.Item
                                                    id={'pag'+v}
                                                    key={i} 
                                                    className={paginaAtual===v ? 'destaquePag' : ''}
                                                    onClick={(e) => MudaPaginaTabela(e)} >
                                                    {v}
                                                </Pagination.Item>)}
                <Pagination.Last
                    id='last'
                    hidden={true}
                    onClick={(e) => MudaPaginaTabela(e)} />
            </>)
        } else {
            return <Pagination.Item>{0}</Pagination.Item>
        }
    }

    function MudaPaginaTabela(e) {
        let campo = e.target.id
        let valor = e.target.text        
        switch (campo) {
            case 'first':
                if(paginaAtual !== 1) {
                    setPaginaAtual(1)
                }
                break
            case 'last':
                if(paginaAtual !== totalPaginas) {
                    setPaginaAtual(totalPaginas)
                }
                break
            default:
                if(campo.length > 3 && campo.substring(0, 3) === 'pag') {
                    let valorNumerico = +valor
                    if(paginaAtual !== valorNumerico) {
                        setPaginaAtual(valorNumerico)
                    }
                }
                break
        }
    }

    function SelecionarLinha(e) {        
        let linhas
        let item = JSON.parse(e.target.value)
        if(e.target.checked) {
            linhas = linhasMarcadas
            linhas.push(JSON.parse(e.target.value))
            setLinhasMarcadas(linhas)
        } else {
            let linhas = linhasMarcadas.filter((v, i, o) => v.codigo !== item.codigo)
            setLinhasMarcadas(linhas)
        }
        let indiceDado = dadosTabela.findIndex((v, i, o) => v.codigo === item.codigo)
        dadosTabela[indiceDado].marcado = e.target.checked
        setDadosTabela([...dadosTabela])        
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
                            isInvalid={codigoInvalido}
                            onChange={(evento) => ValidaCampoModal(evento)} />
                    </Col>
                    <Col  md='9'>
                        <Form.Control
                            id='descricao'
                            type='text'
                            value={modalDescricao}
                            placeholder='Descrição...'
                            isInvalid={descricaoInvalida}
                            onChange={(evento) => ValidaCampoModal(evento)} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>*</th>
                                    <th>Código</th>
                                    <th>Descrição</th>
                                </tr>
                            </thead>
                            <tbody>
                                {InsereLinhasTabela(dadosTabela)}
                            </tbody>
                        </Table>
                        <Pagination className='d-flex justify-content-center'>                            
                            {MontaPaginacaoTabelaModal()}                            
                        </Pagination>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => RetornarSelecionados()} >
                    Retornar
                </Button>
            </Modal.Footer>
        </Modal>
    )
  }
  
  export default ModalPesquisa