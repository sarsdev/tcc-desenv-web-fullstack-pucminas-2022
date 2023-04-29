import './funcao.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import { PencilSquare } from 'react-bootstrap-icons'
import MenuPrincipal from './../common/menu-principal/menu-principal'
import NavBarTela from './../common/navbar-tela/navbar-tela'
import { ServicoFuncao } from './../../service/servico'

function Funcao(props) {
    const navigate = useNavigate()
    const [nomeUsuario, setNomeUsuario] = useState('')
    const [usuario, ] = useState(() => JSON.parse(sessionStorage.getItem('usuariologin')))
    const [nomeFuncao, setNomeFuncao] = useState('')
    const [situacaoFuncao, setSituacaoFuncao] = useState(true)
    const [ignorarSituacao, setIgnorarSituacao] = useState(true)
    const [fatorFuncao, setFatorFuncao] = useState('')
    const [percSimulacaoFuncao, setPercSimulacaoFuncao] = useState('')
    const [listaDadosFuncao, setListaDadosFuncao] = useState([])
    const [linhasGridFuncao, setLinhasGridFuncao] = useState([])
    const [clicouFiltrar, setClicouFiltrar] = useState(false)
    const [filtrou, setfiltrou] = useState(false)
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [clicouNavegacaoGrid, setClicouNavegacaoGrid] = useState(false)
    const [dadosParaAtualizar, setDadosParaAtualizar] = useState({})
    
    const qtdLinhasPaginacao = 5
    const abaComFocoInicial = "aba001"
    const abasFuncao = [
        {
            id: "aba001",
            texto: "Cadastro de Função"
        },
        {
            id: "aba002",
            texto: "Visão Macro"
        }
    ]

    useEffect(() => {
        let usuariologin = JSON.parse(sessionStorage.getItem('usuariologin'))
        if(usuariologin && usuariologin._id) {
            setNomeUsuario(usuariologin.dados_pessoais.nome)
            ListaFuncoes()
        } else {
            navigate('/app/acesso')
        }
    }, [])

    useEffect(() => {
        MontaLinhasGridFuncao(listaDadosFuncao, null)
        setfiltrou(false)
    }, [listaDadosFuncao])

    useEffect(() => {
        let filtros = {
            situacao: ignorarSituacao ? '' : situacaoFuncao ? 'ativo' : 'inativo',
            nome: nomeFuncao,
            fator: fatorFuncao,
            percSimulacao: percSimulacaoFuncao
        }
        MontaLinhasGridFuncao(listaDadosFuncao, filtros)
        setfiltrou(true)
    }, [clicouFiltrar])

    useEffect(() => {
        let filtros = null
        if(filtrou) {
            filtros = {
                situacao: ignorarSituacao ? '' : situacaoFuncao ? 'ativo' : 'inativo',
                nome: nomeFuncao,
                fator: fatorFuncao,
                percSimulacao: percSimulacaoFuncao
            }
        }
        MontaLinhasGridFuncao(listaDadosFuncao, filtros)
    }, [clicouNavegacaoGrid])

    const AbaClicada = function (evento) {
        console.log(evento.target.id)
    }

    function ListaFuncoes() {
        let dadosLogin = {
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
        })
    }

    function MontaLinhasGridFuncao(dados, filtros) {
        let dadosFiltrados = dados
        if(filtros && filtros.nome) {
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.nome.indexOf(filtros.nome) > -1)
        }
        if(filtros && filtros.situacao) {
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.situacao === filtros.situacao)
        }
        if(filtros && filtros.fator !== '') {
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.fator_produtividade_esperado === filtros.fator)
        }
        if(filtros && filtros.percSimulacao !== '') {
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.percentual_estimativa_esperado === filtros.percSimulacao)
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
        setLinhasGridFuncao(dadosFiltrados.map((v, i, o) =>             
        <tr key={i}>
                <td>
                    {v.valor.nome}
                </td>
                <td>
                    {v.valor.fator_produtividade_esperado}
                </td>
                <td>
                    {v.valor.percentual_estimativa_esperado}
                </td>
                <td>
                    <Badge pill bg={v.valor.situacao==='ativo'?'primary':'danger'}>{v.valor.situacao}</Badge>
                </td>
                <td>
                    <PencilSquare 
                        id={v.valor._id}
                        size={20}
                        onClick={(e) => IniciaEdicao(e)} />
                </td>
            </tr>)
        )
    }

    function MontaPaginacaoTabela() {
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
        setClicouNavegacaoGrid(!clicouNavegacaoGrid)
    }

    function LimparTela() {
        setNomeFuncao('')
        setSituacaoFuncao(true)
        setIgnorarSituacao(true)
        setFatorFuncao('')
        setPercSimulacaoFuncao('')
        setfiltrou(false)
        setDadosParaAtualizar({})
        MontaLinhasGridFuncao(listaDadosFuncao, null)
    }

    function SalvarDados() {
        let dadosLogin = {
            usuario: usuario.email,
            senha: usuario.dados_acesso.senha
        }
        if(dadosParaAtualizar && dadosParaAtualizar._id) {
            dadosParaAtualizar.nome = nomeFuncao
            dadosParaAtualizar.fator_produtividade_esperado = fatorFuncao
            dadosParaAtualizar.percentual_estimativa_esperado = percSimulacaoFuncao
            dadosParaAtualizar.situacao = situacaoFuncao ? 'ativo' : 'inativo'
            ServicoFuncao
            .AtualizaFuncao(dadosLogin, dadosParaAtualizar)
            .then((resp) => {
                if(resp.erro) {
                    console.error(resp.msgErro)
                }
            }).catch((err) => {
                console.error(err)
            }).finally(() => {
                LimparTela()
                ListaFuncoes()
            })
        } else {
            let dados = {
                nome: nomeFuncao,
                fator_produtividade_esperado: fatorFuncao,
                percentual_estimativa_esperado: percSimulacaoFuncao,
                situacao: situacaoFuncao ? 'ativo' : 'inativo'
            }
            ServicoFuncao
            .InsereFuncao(dadosLogin, dados)
            .then((resp) => {
                if(resp.erro) {
                    console.error(resp.msgErro)
                }
            }).catch((err) => {
                console.error(err)
            }).finally(() => {
                LimparTela()
                ListaFuncoes()
            })
        }
    }

    function IniciaEdicao(e) {
        let id = e.target.id ? e.target.id : e.target.parentElement.id
        if(id) {
            let dado = listaDadosFuncao.filter(v => v.valor._id === id)[0]
            setDadosParaAtualizar(dado.valor)
            setNomeFuncao(dado.valor.nome)
            setSituacaoFuncao(dado.valor.situacao === 'ativo')
            setIgnorarSituacao(false)
            setFatorFuncao(dado.valor.fator_produtividade_esperado)
            setPercSimulacaoFuncao(dado.valor.percentual_estimativa_esperado)
        }
    }

    return (
        <Container>
            <MenuPrincipal usuario={nomeUsuario} />
            <NavBarTela 
                abas={abasFuncao}
                abaInicial={abaComFocoInicial}
                eventoAbaAlterada={AbaClicada} />
            <Row>
                <Col md={6}>
                    <Form.Control
                        id='nomefuncao'
                        type="text" 
                        placeholder="Nome da função..."
                        value={nomeFuncao}
                        onChange={(e) => setNomeFuncao(e.target.value)} />
                </Col>
                <Col>
                    <Form.Check
                        id={'situcao'}
                        type='checkbox'
                        label='Ativo'
                        disabled={ignorarSituacao}
                        checked={situacaoFuncao}
                        onChange={(e) => setSituacaoFuncao(e.target.checked)} />
                </Col>
                <Col>
                    <Form.Check
                        id={'ignorarsitucao'}
                        type='checkbox'
                        label='Ignorar situação'
                        checked={ignorarSituacao}
                        onChange={(e) => setIgnorarSituacao(e.target.checked)} />
                </Col>
            </Row>
            <Row className='espaco-entre'>
                <Col>
                    <Stack direction='horizontal' gap={2}>
                        <Form.Label>Fator para simulação</Form.Label>
                        <Form.Control
                            id='fator'
                            type="number"
                            max={10}
                            min={0}
                            step={0.1}
                            className='tamanho-input ms-auto'
                            value={fatorFuncao}
                            onChange={(e) => setFatorFuncao(e.target.value ? +e.target.value : '')} />
                    </Stack>
                </Col>
                <Col>
                    <Stack direction='horizontal' gap={2}>
                        <Form.Label>% sobre estimativa</Form.Label>
                        <Form.Control
                            id='percsimulacao'
                            type="number"
                            max={100}
                            min={0}
                            className='tamanho-input ms-auto'
                            value={percSimulacaoFuncao}
                            onChange={(e) => setPercSimulacaoFuncao(e.target.value ? +e.target.value : '')} />
                    </Stack>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Função</th>
                                <th>Fator</th>
                                <th>% Estimativa</th>
                                <th>Situação</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {linhasGridFuncao}
                        </tbody>
                    </Table>
                    <Pagination className='d-flex justify-content-center'>
                        {MontaPaginacaoTabela()}
                    </Pagination>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Stack direction="horizontal" className='d-flex flex-row-reverse' gap={2}>
                        <Button 
                            variant="primary"
                            onClick={() => SalvarDados()}>
                            {dadosParaAtualizar && dadosParaAtualizar._id ? 'Atualizar' : 'Adicionar'}
                        </Button>
                        <Button 
                            variant="light" 
                            onClick={() => LimparTela()}>
                            Limpar
                        </Button>
                        <Button 
                            variant="light" 
                            onClick={() => setClicouFiltrar(!clicouFiltrar)}>
                            Filtrar
                        </Button>
                    </Stack>
                </Col>
            </Row>
        </Container>
    )
}
  
export default Funcao