import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import { DashCircle, PlusCircle } from 'react-bootstrap-icons'

function ModalGerenciarIntegrantes(props) {
    const qtdLinhasPaginacao = 3

    const [nomePesquisa, setNomePesquisa] = useState('')
    const [tipoPesquisa, setTipoPesquisa] = useState('')
    const [listaDadosPesquisa, setListaDadosPesquisa] = useState([])
    const [totalPaginasPesquisa, setTotalPaginasPesquisa] = useState(1)
    const [paginaAtualPesquisa, setPaginaAtualPesquisa] = useState(1)
    const [totalPaginasIntegrantes, setTotalPaginasIntegrantes] = useState(1)
    const [paginaAtualIntegrantes, setPaginaAtualIntegrantes] = useState(1)

    useEffect(() => {
        setTipoPesquisa('Usuário')
    }, [])

    useEffect(() => {
        switch (tipoPesquisa) {
            case 'Usuário':
                setListaDadosPesquisa([
                    {
                        id: '00001',
                        nome: 'João Carlos',
                        obj: {}
                    },
                    {
                        id: '00002',
                        nome: 'Carlos Antônio',
                        obj: {}
                    },
                    {
                        id: '00003',
                        nome: 'Antônio Marcio',
                        obj: {}
                    },
                    {
                        id: '00004',
                        nome: 'Marcio Henrique',
                        obj: {}
                    },
                    {
                        id: '00005',
                        nome: 'Henrique João',
                        obj: {}
                    }
                ])
                break
            case 'Função':
                setListaDadosPesquisa([
                    {
                        id: '00001',
                        nome: 'Product Owner',
                        obj: {}
                    },
                    {
                        id: '00002',
                        nome: 'Designer',
                        obj: {}
                    },
                    {
                        id: '00003',
                        nome: 'Developer',
                        obj: {}
                    },
                    {
                        id: '00004',
                        nome: 'Engineer',
                        obj: {}
                    },
                    {
                        id: '00005',
                        nome: 'Q&A',
                        obj: {}
                    }
                ])
                break
            case 'Equipe':
                setListaDadosPesquisa([
                    {
                        id: '00001',
                        nome: 'Sky One',
                        obj: {}
                    },
                    {
                        id: '00002',
                        nome: 'Titans',
                        obj: {}
                    },
                    {
                        id: '00003',
                        nome: 'Lovers',
                        obj: {}
                    },
                    {
                        id: '00004',
                        nome: 'Furiosos',
                        obj: {}
                    }
                ])
                break
            default:
                break
        }
    }, [tipoPesquisa])

    function InsereLinhasPesquisa(dados) {
        let dadosFiltrados = dados
        if(nomePesquisa) {       
            dadosFiltrados = dadosFiltrados.filter(v => v.nome.toLowerCase().indexOf(nomePesquisa.toLowerCase()) > -1)
        }
        if(dadosFiltrados.length > qtdLinhasPaginacao) {
            let qtdPaginas = Math.ceil(dadosFiltrados.length / qtdLinhasPaginacao)
            if(totalPaginasPesquisa !== qtdPaginas) {
                setTotalPaginasPesquisa(qtdPaginas)
                if(paginaAtualPesquisa > qtdPaginas) {
                    setPaginaAtualPesquisa(qtdPaginas)
                }
            }
            dadosFiltrados = dadosFiltrados.filter((v, i, o) => i >= ((qtdLinhasPaginacao * paginaAtualPesquisa) - qtdLinhasPaginacao) && i <= (qtdLinhasPaginacao * paginaAtualPesquisa)-1)
        } else {
            if(totalPaginasPesquisa !== 1) {
                setTotalPaginasPesquisa(1)
                if(paginaAtualPesquisa > 1) {
                    setPaginaAtualPesquisa(1)
                }
            }
        }
        return dadosFiltrados.map((v, i) =>
            <tr key={i}>
                <td>
                    {v.nome}
                </td>
                <td>
                    <PlusCircle
                        id={v.id}
                        size={20}
                        onClick={(e) => AdicionaIntegrantes(e)} />
                </td>
            </tr>)
    }

    function MontaPaginacaoPesquisa() {
        if(totalPaginasPesquisa >= 1 && totalPaginasPesquisa <= 3) {
            let listaPaginas = []
            for (let index = 1; index <= totalPaginasPesquisa; index++) {
                listaPaginas.push(index)                                        
            }
            return (<>
                <Pagination.First
                    id='first'
                    hidden={true}
                    onClick={(e) => MudaPaginaPesquisa(e)} />
                {listaPaginas.map((v, i) => <Pagination.Item
                                                id={'pag'+v}
                                                key={i} 
                                                className={paginaAtualPesquisa===v ? 'destaquePag' : ''}
                                                onClick={(e) => MudaPaginaPesquisa(e)} >
                                                {v}
                                            </Pagination.Item>)}
                <Pagination.Last
                    id='last'
                    hidden={true}
                    onClick={(e) => MudaPaginaPesquisa(e)} />
            </>)
        } else {
            return <Pagination.Item>{0}</Pagination.Item>
        }
    }

    function MudaPaginaPesquisa(e) {
        let campo = e.target.id
        let valor = e.target.text        
        switch (campo) {
            case 'first':
                if(paginaAtualPesquisa !== 1) {
                    setPaginaAtualPesquisa(1)
                }
                break
            case 'last':
                if(paginaAtualPesquisa !== totalPaginasPesquisa) {
                    setPaginaAtualPesquisa(totalPaginasPesquisa)
                }
                break
            default:
                if(campo.length > 3 && campo.substring(0, 3) === 'pag') {
                    let valorNumerico = +valor
                    if(paginaAtualPesquisa !== valorNumerico) {
                        setPaginaAtualPesquisa(valorNumerico)
                    }
                }
                break
        }
    }

    function InsereLinhasIntegrantes(dados) {
        let dadosFiltrados = dados
        if(dadosFiltrados.length > qtdLinhasPaginacao) {
            let qtdPaginas = Math.ceil(dadosFiltrados.length / qtdLinhasPaginacao)
            if(totalPaginasIntegrantes !== qtdPaginas) {
                setTotalPaginasIntegrantes(qtdPaginas)
                if(paginaAtualIntegrantes > qtdPaginas) {
                    setPaginaAtualIntegrantes(qtdPaginas)
                }
            }
            dadosFiltrados = dadosFiltrados.filter((v, i, o) => i >= ((qtdLinhasPaginacao * paginaAtualIntegrantes) - qtdLinhasPaginacao) && i <= (qtdLinhasPaginacao * paginaAtualIntegrantes)-1)
        } else {
            if(totalPaginasIntegrantes !== 1) {
                setTotalPaginasIntegrantes(1)
                if(paginaAtualIntegrantes > 1) {
                    setPaginaAtualIntegrantes(1)
                }
            }
        }
        return dadosFiltrados.map((v, i) =>
            <tr key={i}>
                <td>
                    {v.nome}
                </td>
                <td>
                    {v.funcao ? v.funcao.nome : ''}
                </td>
                <td>
                    {v.equipe ? v.equipe.nome : ''}
                </td>
                <td>
                    <DashCircle
                        id={v.id}
                        size={20}
                        onClick={(e) => RemoveIntegrante(e)} />
                </td>
            </tr>)
    }

    function MontaPaginacaoIntegrantes() {
        if(totalPaginasIntegrantes >= 1 && totalPaginasIntegrantes <= 3) {
            let listaPaginas = []
            for (let index = 1; index <= totalPaginasIntegrantes; index++) {
                listaPaginas.push(index)                                        
            }
            return (<>
                <Pagination.First
                    id='first'
                    hidden={true}
                    onClick={(e) => MudaPaginaIntegrantes(e)} />
                {listaPaginas.map((v, i) => <Pagination.Item
                                                id={'pag'+v}
                                                key={i} 
                                                className={paginaAtualIntegrantes===v ? 'destaquePag' : ''}
                                                onClick={(e) => MudaPaginaIntegrantes(e)} >
                                                {v}
                                            </Pagination.Item>)}
                <Pagination.Last
                    id='last'
                    hidden={true}
                    onClick={(e) => MudaPaginaIntegrantes(e)} />
            </>)
        } else {
            return <Pagination.Item>{0}</Pagination.Item>
        }
    }

    function MudaPaginaIntegrantes(e) {
        let campo = e.target.id
        let valor = e.target.text        
        switch (campo) {
            case 'first':
                if(paginaAtualIntegrantes !== 1) {
                    setPaginaAtualIntegrantes(1)
                }
                break
            case 'last':
                if(paginaAtualIntegrantes !== totalPaginasIntegrantes) {
                    setPaginaAtualIntegrantes(totalPaginasIntegrantes)
                }
                break
            default:
                if(campo.length > 3 && campo.substring(0, 3) === 'pag') {
                    let valorNumerico = +valor
                    if(paginaAtualIntegrantes !== valorNumerico) {
                        setPaginaAtualIntegrantes(valorNumerico)
                    }
                }
                break
        }
    }

    function RemoveIntegrante(e) {
        let id = e.target.id ? e.target.id : e.target.parentElement.id
        console.log('RemoveIntegrante', id)
    }

    function AdicionaIntegrantes(e) {
        let id = e.target.id ? e.target.id : e.target.parentElement.id
        console.log('AdicionaIntegrantes', id)
    }

    function AlterandoTipoPesquisa(e) {
        if(e !== tipoPesquisa) {
            setTipoPesquisa(e)
        }
    }

    return (
        <Modal
            {...props}
            size='md'
            aria-labelledby='contained-modal-title-vcenter'
            centered>
            <Modal.Header closeButton>
                <Modal.Title 
                    id='contained-modal-title-vcenter'>
                    Integrantes do projeto
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <InputGroup 
                            className='mb-2'
                            size='sm'>
                            <Form.Control 
                                id='nomepesquisa'
                                value={nomePesquisa}
                                onChange={(e) => setNomePesquisa(e.target.value)}/>
                            <DropdownButton
                                id='tipopesquisa'
                                variant='outline-secondary'
                                title={tipoPesquisa}
                                align='end'
                                onSelect={(e) => AlterandoTipoPesquisa(e)}>
                                <Dropdown.Item eventKey={'Usuário'}>Usuário</Dropdown.Item>
                                <Dropdown.Item eventKey={'Função'}>Função</Dropdown.Item>
                                <Dropdown.Item eventKey={'Equipe'}>Equipe</Dropdown.Item>
                            </DropdownButton>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {InsereLinhasPesquisa(listaDadosPesquisa)}
                            </tbody>
                        </Table>
                        <Pagination className='d-flex justify-content-center'>                            
                            {MontaPaginacaoPesquisa()}                            
                        </Pagination>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <hr/>
                        <h6>Atualmente no projeto</h6>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Função</th>
                                    <th>Equipe</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {InsereLinhasIntegrantes(props.integrantes)}
                            </tbody>
                        </Table>
                        <Pagination className='d-flex justify-content-center'>                            
                            {MontaPaginacaoIntegrantes()}                            
                        </Pagination>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
  }
  
  export default ModalGerenciarIntegrantes