import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import { GearFill, FileEarmarkSpreadsheetFill, FileEarmarkPptFill, PlayCircle, StopCircle } from 'react-bootstrap-icons'
import MenuPrincipal from './../common/menu-principal/menu-principal'
import NavBarTela from './../common/navbar-tela/navbar-tela'

function Agenda(props) {
    const navigate = useNavigate()
    const [nomeUsuario, setNomeUsuario] = useState('')
    const [nomeProjeto, setNomeProjeto] = useState('')
    const [linhasDadosAgenda, setLinhasDadosAgenda] = useState([])
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [clicouNavegacaoGrid, setClicouNavegacaoGrid] = useState(false)

    const qtdLinhasPaginacao = 5
    const abaComFocoInicial = 'aba001'
    const abasAgenda = [
        {
            id: 'aba001',
            texto: 'Agenda'
        }
    ]

    useEffect(() => {
        let usuariologin = JSON.parse(sessionStorage.getItem('usuariologin'))
        if (usuariologin && usuariologin._id) {
            setNomeUsuario(usuariologin.dados_pessoais.nome)
            ListaAgenda()
        } else {
            navigate('/app/acesso')
        }
    }, [])

    useEffect(() => {
        MontaLinhasGridAgenda(linhasDadosAgenda)
    }, [clicouNavegacaoGrid])

    function ListaAgenda() {
        setLinhasDadosAgenda([
            {
                apontando: false,
                apontamento_atual: {
                    data: '',
                    hora_inicial: '',
                    hora_final: ''
                },
                valor: {
                    _id: '1001',
                    projeto: {
                        tipo: 'interno',
                        titulo: 'Reuniões mensais',
                        descricao: 'Para controlar o esforço em reuniões',
                        nome_cliente: 'ApontaDev',
                        previsao_conclusao: new Date(2023, 7, 31),
                        horas_estimadas: 250
                    },
                    apontamentos: [
                        {
                            colaborador: {
                                id: '0001',
                                nome: 'João JJ'
                            },
                            data: new Date(),
                            hora_inicial: '',
                            hora_final: '',
                            saldo: '',
                            observacao: ''
                        }
                    ]
                }
            },
            {
                apontando: false,
                apontamento_atual: {
                    data: '',
                    hora_inicial: '',
                    hora_final: ''
                },
                valor: {
                    _id: '1002',
                    projeto: {
                        tipo: 'externo',
                        titulo: 'Aplicação Web',
                        descricao: 'Desenvolvimento para cliente',
                        nome_cliente: 'Foguim',
                        previsao_conclusao: new Date(2023, 7, 31),
                        horas_estimadas: 200
                    },
                    apontamentos: [
                        {
                            colaborador: {
                                id: '0001',
                                nome: 'João JJ'
                            },
                            data: new Date(),
                            hora_inicial: '',
                            hora_final: '',
                            saldo: '',
                            observacao: ''
                        },
                        {
                            colaborador: {
                                id: '0001',
                                nome: 'João JJ'
                            },
                            data: new Date(),
                            hora_inicial: '',
                            hora_final: '',
                            saldo: '',
                            observacao: ''
                        },
                        {
                            colaborador: {
                                id: '0002',
                                nome: 'Bruno BB'
                            },
                            data: new Date(),
                            hora_inicial: '',
                            hora_final: '',
                            saldo: '',
                            observacao: ''
                        }
                    ]
                }
            }
        ])
        /*let dadosLogin = {
            usuario: usuario.email,
            senha: usuario.dados_acesso.senha
        }
        ServicoFuncao
        .RetornaListaFuncoes(dadosLogin)
        .then((resp) => {
            if(resp.erro) {
                console.error(resp.msgErro)
                setListaDadosFuncao([])
            } else {
                let dados = resp.dados.map((v) => { return { valor: v } })
                setListaDadosFuncao(dados)
            }
        }).catch((err) => {
            console.error(err)
            setListaDadosFuncao([])
        })*/
    }

    const AbaClicada = function (evento) {
        console.log(evento.target.id)
    }

    function MontaLinhasGridAgenda(dados) {
        let dadosFiltrados = dados
        if (nomeProjeto) {
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.projeto.titulo.indexOf(nomeProjeto) > -1)
        }
        if (dadosFiltrados.length > qtdLinhasPaginacao) {
            let qtdPaginas = Math.ceil(dadosFiltrados.length / qtdLinhasPaginacao)
            if (totalPaginas !== qtdPaginas) {
                setTotalPaginas(qtdPaginas)
                if (paginaAtual > qtdPaginas) {
                    setPaginaAtual(qtdPaginas)
                }
            }
            dadosFiltrados = dadosFiltrados.filter((v, i, o) => i >= ((qtdLinhasPaginacao * paginaAtual) - qtdLinhasPaginacao) && i <= (qtdLinhasPaginacao * paginaAtual) - 1)
        } else {
            if (totalPaginas !== 1) {
                setTotalPaginas(1)
                if (paginaAtual > 1) {
                    setPaginaAtual(1)
                }
            }
        }
        return dadosFiltrados.map((v, i) =>
            <tr key={i}>
                <td>
                    {v.valor.projeto.tipo}
                </td>
                <td>
                    {v.valor.projeto.titulo}
                </td>
                <td>
                    {v.valor.projeto.descricao}
                </td>
                <td>
                    <Stack direction='horizontal' gap={2}>                        
                        {v.apontando ?
                        <StopCircle
                            id={v.valor._id}
                            size={20}
                            onClick={(e) => FinalizaApontamento(e)} /> :
                        <PlayCircle
                            id={v.valor._id}
                            size={20}
                            onClick={(e) => IniciaApontamento(e)} />}
                        <FileEarmarkPptFill
                            id={v.valor._id}
                            size={20}
                            onClick={(e) => AbreModalDadosProjeto(e)} />
                        <FileEarmarkSpreadsheetFill
                            id={v.valor._id}
                            size={20}
                            onClick={(e) => AbreModalApontamentosProjeto(e)} />
                    </Stack>
                </td>
            </tr>
        )
    }

    function MontaPaginacaoTabela() {
        if (totalPaginas >= 1 && totalPaginas <= 3) {
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
                    id={'pag' + v}
                    key={i}
                    className={paginaAtual === v ? 'destaquePag' : ''}
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
                if (paginaAtual !== 1) {
                    setPaginaAtual(1)
                }
                break
            case 'last':
                if (paginaAtual !== totalPaginas) {
                    setPaginaAtual(totalPaginas)
                }
                break
            default:
                if (campo.length > 3 && campo.substring(0, 3) === 'pag') {
                    let valorNumerico = +valor
                    if (paginaAtual !== valorNumerico) {
                        setPaginaAtual(valorNumerico)
                    }
                }
                break
        }
        setClicouNavegacaoGrid(!clicouNavegacaoGrid)
    }

    function IniciaApontamento(e) {
        console.log('IniciaApontamento')
        console.log(e)
    }

    function FinalizaApontamento(e) {
        console.log('FinalizaApontamento')
        console.log(e)
    }

    function AbreModalDadosProjeto(e) {
        console.log('AbreModalDadosProjeto')
        console.log(e)
    }

    function AbreModalApontamentosProjeto(e) {
        console.log('AbreModalApontamentosProjeto')
        console.log(e)
    }

    function AbreModalConfiguracoes() {
        console.log('AbreModalConfiguracoes')
    }

    function AbreModalApontamentosDoDia() {
        console.log('AbreModalApontamentosDoDia')
    }

    function LancaCompensacao() {
        console.log('LancaCompensacao')
    }

    return (
        <Container>
            <MenuPrincipal usuario={nomeUsuario} />
            <NavBarTela
                abas={abasAgenda}
                abaInicial={abaComFocoInicial}
                eventoAbaAlterada={AbaClicada} />
            <Row>
                <Col>
                    <Form.Control 
                        id='filtroprojeto'
                        type='text'
                        placeholder='Filtra o projeto...'
                        value={nomeProjeto}
                        onChange={(e) => setNomeProjeto(e.target.value)} />
                </Col>
                <Col md={'auto'}>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <GearFill 
                                size={20}
                                onClick={() => AbreModalConfiguracoes()} />
                            <FileEarmarkSpreadsheetFill 
                                size={20}
                                className='m-2'
                                onClick={() => AbreModalApontamentosDoDia()} />
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <InputGroup className='m-0'>
                        <InputGroup.Text>Total de horas apontadas hoje</InputGroup.Text>
                        <Form.Control                    
                            id='horasapontadasdia'
                            type='number'
                            max={8760}
                            min={0}
                            step={1}
                            readOnly={true} />
                    </InputGroup>
                </Col>
                <Col md={'auto'}>
                    <Button 
                        variant='primary'
                        onClick={() => LancaCompensacao()}>
                        Compensação
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Projeto</th>
                                <th>Descrição</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MontaLinhasGridAgenda(linhasDadosAgenda)}
                        </tbody>
                    </Table>
                    <Pagination className='d-flex justify-content-center'>
                        {MontaPaginacaoTabela()}
                    </Pagination>
                </Col>
            </Row>
        </Container>
    )
}
  
export default Agenda