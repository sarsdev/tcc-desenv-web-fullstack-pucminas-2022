import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputGroup } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import { PeopleFill, People, PencilSquare } from 'react-bootstrap-icons'
import MenuPrincipal from './../common/menu-principal/menu-principal'
import NavBarTela from './../common/navbar-tela/navbar-tela'
import ModalGerenciarIntegrantes from './components/modal-gerenciar-integrantes/modal-gerenciar-integrantes'

function Projeto(props) {
    const navigate = useNavigate()
    const [nomeUsuario, setNomeUsuario] = useState('')
    const [nomeProjeto, setNomeProjeto] = useState('')
    const [codigoProjeto, setCodigoProjeto] = useState('')
    const [nomeCliente, setNomeCliente] = useState('')
    const [etapaProjeto, setEtapaProjeto] = useState('')
    const [descricaoProjeto, setDescricaoProjeto] = useState('')
    const [tipoProjeto, setTipoProjeto] = useState('')
    const [estimativaProjeto, setEstimativaProjeto] = useState('')
    const [dataPrevista, setDataPrevista] = useState('')
    const [vigenciaInicial, setVigenciaInicial] = useState('')
    const [vigenciaFinal, setVigenciaFinal] = useState('')
    const [listaDadosProjeto, setListaDadosProjeto] = useState([])
    const [linhasGridProjeto, setLinhasGridProjeto] = useState([])    
    const [integrantesSelec, setIntegrantesSelec] = useState([])
    const [clicouFiltrar, setClicouFiltrar] = useState(false)
    const [filtrou, setfiltrou] = useState(false)
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [clicouNavegacaoGrid, setClicouNavegacaoGrid] = useState(false)
    const [dadosParaAtualizar, setDadosParaAtualizar] = useState({})
    const [mostrarModalIntegrantes, setMostrarModalIntegrantes] = useState(false)

    const qtdLinhasPaginacao = 5
    const abaComFocoInicial = 'aba001'
    const abasProjeto = [
        {
            id: 'aba001',
            texto: 'Cadastro de Projeto'
        },
        {
            id: 'aba002',
            texto: 'Visão Macro'
        }
    ]

    useEffect(() => {
        let usuariologin = JSON.parse(sessionStorage.getItem('usuariologin'))
        if (usuariologin && usuariologin._id) {
            setNomeUsuario(usuariologin.dados_pessoais.nome)
            ListaProjetos()
        } else {
            navigate('/app/acesso')
        }
    }, [])

    useEffect(() => {
        MontaLinhasGridProjeto(listaDadosProjeto, null)
        setfiltrou(false)
    }, [listaDadosProjeto])

    useEffect(() => {
        let filtros = {
            nome: nomeProjeto,
            codigo: codigoProjeto,
            cliente: nomeCliente,
            etapa: etapaProjeto,
            descricao: descricaoProjeto,
            tipo: tipoProjeto,
            estimativa: estimativaProjeto,
            previsao: dataPrevista,
            vigencia_inicial: vigenciaInicial,
            vigencia_final: vigenciaFinal
        }
        MontaLinhasGridProjeto(listaDadosProjeto, filtros)
        setfiltrou(true)
    }, [clicouFiltrar])

    useEffect(() => {
        let filtros = null
        if(filtrou) {
            filtros = {
                nome: nomeProjeto,
                codigo: codigoProjeto,
                cliente: nomeCliente,
                etapa: etapaProjeto,
                descricao: descricaoProjeto,
                tipo: tipoProjeto,
                estimativa: estimativaProjeto,
                previsao: dataPrevista,
                vigencia_inicial: vigenciaInicial,
                vigencia_final: vigenciaFinal
            }
        }
        MontaLinhasGridProjeto(listaDadosProjeto, filtros)
    }, [clicouNavegacaoGrid])

    function ListaProjetos() {
        setListaDadosProjeto([
            {
                valor: {
                    _id: '1001',
                    titulo: 'Reuniões mensais',
                    codigo_externo: 'Int002',
                    descricao: 'Para controlar o esforço em reuniões',
                    nome_cliente: 'ApontaDev',
                    tipo: 'interno',
                    etapa: 'backlog',
                    previsao_conclusao: new Date(2023, 7, 31),
                    inicio_projeto: new Date(2023, 1, 1),
                    final_projeto: new Date(2023, 7, 31),
                    horas_estimadas: 250,
                    colaboradores: [
                        {
                            id: '000000000001',
                            nome: 'Abel G C',
                            cargo: 'programador II',
                            funcao: {
                                id: '000000000011',
                                nome: 'programador'
                            },
                            equipe: {
                                id: '000000000021',
                                nome: 'triplo X'
                            }
                        }
                    ]
                }
            },
            {
                valor: {
                    _id: '1002',
                    titulo: 'Apoio técnico',
                    codigo_externo: 'Int001',
                    descricao: 'Para controlar o esforço em apoios técnicos',
                    nome_cliente: 'ApontaDev',
                    tipo: 'interno',
                    etapa: 'analise',
                    previsao_conclusao: new Date(2023, 7, 31),
                    inicio_projeto: new Date(2023, 1, 1),
                    final_projeto: new Date(2023, 7, 31),
                    horas_estimadas: 400,
                    colaboradores: [
                        {
                            id: '000000000001',
                            nome: 'Abel G C',
                            cargo: 'programador II',
                            funcao: {
                                id: '000000000011',
                                nome: 'programador'
                            },
                            equipe: {
                                id: '000000000021',
                                nome: 'triplo X'
                            }
                        },
                        {
                            id: '000000000002',
                            nome: 'A C Martins',
                            cargo: 'programador I',
                            funcao: {
                                id: '000000000011',
                                nome: 'programador'
                            },
                            equipe: {
                                id: '000000000022',
                                nome: 'dobro A'
                            }
                        }
                    ]
                }
            },
            {
                valor: {
                    _id: '1003',
                    titulo: 'Projeto A001',
                    codigo_externo: 'A001',
                    descricao: 'Desenvolvimento de aplicação Web',
                    nome_cliente: 'Sites & Sites LTDA',
                    tipo: 'externo',
                    etapa: 'andamento',
                    previsao_conclusao: new Date(2023, 5, 31),
                    inicio_projeto: new Date(2023, 2, 28),
                    final_projeto: new Date(2023, 6, 30),
                    horas_estimadas: 350,
                    colaboradores: []
                }
            },
            {
                valor: {
                    _id: '1004',
                    titulo: 'Projeto A002',
                    codigo_externo: 'A002',
                    descricao: 'Desenvolvimento de Aplicação para comparar preços',
                    nome_cliente: 'Precim',
                    tipo: 'externo',
                    etapa: 'backlog',
                    previsao_conclusao: new Date(2023, 6, 30),
                    inicio_projeto: new Date(2023, 4, 1),
                    final_projeto: new Date(2023, 7, 20),
                    horas_estimadas: 280
                }
            },
            {
                valor: {
                    _id: '1005',
                    titulo: 'Projeto B045',
                    codigo_externo: 'B045',
                    descricao: 'Desenvolvimento de aplicação para controle de frota',
                    nome_cliente: 'Carrocinha do jãozim',
                    tipo: 'externo',
                    etapa: 'concluido',
                    previsao_conclusao: new Date(2023, 4, 30),
                    inicio_projeto: new Date(2023, 4, 1),
                    final_projeto: new Date(2023, 5, 15),
                    horas_estimadas: 43,
                    colaboradores: [
                        {
                            id: '000000000001',
                            nome: 'Abel G C',
                            cargo: 'programador II',
                            funcao: {
                                id: '000000000011',
                                nome: 'programador'
                            },
                            equipe: {
                                id: '000000000021',
                                nome: 'triplo X'
                            }
                        }
                    ]
                }
            },
            {
                valor: {
                    _id: '1006',
                    titulo: 'Projeto C000',
                    codigo_externo: 'C000',
                    descricao: 'Desenvolvimento de aplicação para controle de estoque',
                    nome_cliente: 'Estoquim',
                    tipo: 'externo',
                    etapa: 'backlog',
                    previsao_conclusao: new Date(2023, 7, 31),
                    inicio_projeto: new Date(2023, 3, 11),
                    final_projeto: new Date(2023, 8, 15),
                    horas_estimadas: 195,
                    colaboradores: []
                }
            },
            {
                valor: {
                    _id: '1007',
                    titulo: 'Projeto A003',
                    codigo_externo: 'A003',
                    descricao: 'Desenvolvimento de aplicação para controle de foguetes',
                    nome_cliente: 'foguetim SA',
                    tipo: 'externo',
                    etapa: 'cancelado',
                    previsao_conclusao: new Date(2023, 6, 21),
                    inicio_projeto: new Date(2023, 5, 1),
                    final_projeto: new Date(2023, 6, 30),
                    horas_estimadas: 120,
                    colaboradores: [
                        {
                            id: '000000000005',
                            nome: 'João B',
                            cargo: 'especialista de software',
                            funcao: {
                                id: '000000000011',
                                nome: 'programador'
                            },
                            equipe: {
                                id: '000000000023',
                                nome: 'Incansáveis'
                            }
                        },
                        {
                            id: '000000000004',
                            nome: 'Thais M',
                            cargo: 'tester III',
                            funcao: {
                                id: '000000000014',
                                nome: 'analista de qualidade'
                            },
                            equipe: {
                                id: '000000000023',
                                nome: 'Incansáveis'
                            }
                        },
                        {
                            id: '000000000003',
                            nome: 'Jessica Amaro',
                            cargo: 'PO proxy',
                            funcao: {
                                id: '000000000013',
                                nome: 'analista de negócio'
                            },
                            equipe: {
                                id: '000000000023',
                                nome: 'Incansáveis'
                            }
                        }
                    ]
                }
            }
        ]
        )
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

    function MontaLinhasGridProjeto(dados, filtros) {
        let dadosFiltrados = dados
        if (filtros && filtros.nome) {
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.titulo.indexOf(filtros.nome) > -1)
        }
        if (filtros && filtros.codigo) {
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.codigo_externo === filtros.codigo)
        }
        if (filtros && filtros.cliente) {
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.nome_cliente.indexOf(filtros.cliente) > -1)
        }
        if (filtros && filtros.etapa) {
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.etapa === filtros.etapa)
        }
        if (filtros && filtros.descricao) {
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.descricao.indexOf(filtros.descricao) > -1)
        }
        if (filtros && filtros.tipo) {
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.tipo === filtros.tipo)
        }
        if (filtros && filtros.estimativa !== '') {
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.horas_estimadas === filtros.estimativa)
        }
        if (filtros && filtros.previsao !== '') {
            let dataQuebrada = filtros.previsao.split('-')
            let dataPrevista = new Date(+dataQuebrada[0], +dataQuebrada[1]-1, +dataQuebrada[2])
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.previsao_conclusao.getTime() === dataPrevista.getTime())
        }
        if (filtros && filtros.vigencia_inicial !== '') {
            let dataQuebrada = filtros.vigencia_inicial.split('-')
            let dataInicial = new Date(+dataQuebrada[0], +dataQuebrada[1]-1, +dataQuebrada[2])
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.inicio_projeto.getTime() >= dataInicial.getTime())
        }
        if (filtros && filtros.vigencia_final !== '') {
            let dataQuebrada = filtros.vigencia_final.split('-')
            let dataFinal = new Date(+dataQuebrada[0], +dataQuebrada[1]-1, +dataQuebrada[2])
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.final_projeto.getTime() <= dataFinal.getTime())
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
        setLinhasGridProjeto(dadosFiltrados.map((v, i) =>
            <tr key={i}>
                <td>
                    {v.valor.codigo_externo}
                </td>
                <td>
                    {v.valor.tipo}
                </td>
                <td>
                    {v.valor.titulo}
                </td>
                <td>
                    {v.valor.descricao}
                </td>
                <td>
                    {v.valor.nome_cliente}
                </td>
                <td>
                    {`${FormataData(v.valor.inicio_projeto, 'DD/MM/YYYY')} - ${FormataData(v.valor.final_projeto, 'DD/MM/YYYY')}`}
                </td>
                <td>
                    {FormataData(v.valor.previsao_conclusao, 'DD/MM/YYYY')}
                </td>
                <td>
                    {v.valor.horas_estimadas}
                </td>
                <td>
                    <Badge pill bg={v.valor.etapa === 'cancelado' ? 'danger' : 'primary'}>{v.valor.etapa}</Badge>
                </td>
                <td>
                    <PencilSquare
                        id={v.valor._id}
                        size={20}
                        onClick={(e) => IniciaEdicao(e)} />
                    {v.valor && v.valor.colaboradores && v.valor.colaboradores.length > 0 ?
                    <PeopleFill
                        id={v.valor._id}
                        size={20}
                        onClick={(e) => AbreModalIntegrantes(e)} /> :
                    <People
                        id={v.valor._id}
                        size={20}
                        onClick={(e) => AbreModalIntegrantes(e)} />}
                </td>
            </tr>)
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

    function SalvarDados() {
        /*let dadosLogin = {
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
        }*/
    }

    function LimparTela() {
        setNomeProjeto('')
        setCodigoProjeto('')
        setNomeCliente('')
        setEtapaProjeto('')
        setDescricaoProjeto('')
        setTipoProjeto('')
        setEstimativaProjeto('')
        setDataPrevista('')
        setVigenciaInicial('')
        setVigenciaFinal('')
        setfiltrou(false)
        setDadosParaAtualizar({})
        MontaLinhasGridProjeto(listaDadosProjeto, null)
    }

    function IniciaEdicao(e) {
        let id = e.target.id ? e.target.id : e.target.parentElement.id
        if(id) {
            let dado = listaDadosProjeto.filter(v => v.valor._id === id)[0]
            setDadosParaAtualizar(dado.valor)
            setNomeProjeto(dado.valor.titulo)
            setCodigoProjeto(dado.valor.codigo_externo)
            setNomeCliente(dado.valor.nome_cliente)
            setEtapaProjeto(dado.valor.etapa)
            setDescricaoProjeto(dado.valor.descricao)
            setTipoProjeto(dado.valor.tipo)
            setEstimativaProjeto(dado.valor.horas_estimadas)
            setDataPrevista(FormataData(dado.valor.previsao_conclusao))
            setVigenciaInicial(FormataData(dado.valor.inicio_projeto))
            setVigenciaFinal(FormataData(dado.valor.final_projeto))
        }
    }

    function FormataData(data, padrao='yyyy-MM-dd') {
        let strDia = data.getDate().toString().padStart(2, '0')
        let strMes = (data.getMonth()+1).toString().padStart(2, '0')
        let strAno = data.getFullYear().toString()
        let dataRetorno = padrao.toLowerCase().replace('dd', strDia).replace('mm', strMes).replace('yyyy', strAno)
        return dataRetorno
    }

    function AbreModalIntegrantes(e) {
        let id = e.target.id ? e.target.id : e.target.parentElement.id
        if(id) {
            let dado = listaDadosProjeto.filter(v => v.valor._id === id)[0]
            if(dado.valor && dado.valor.colaboradores && dado.valor.colaboradores.length > 0) {
                setIntegrantesSelec(dado.valor.colaboradores)
            } else {
                setIntegrantesSelec([])
            }
            setMostrarModalIntegrantes(true)
        }
    }

    return (
        <Container>
            <MenuPrincipal usuario={nomeUsuario} />
            <NavBarTela
                abas={abasProjeto}
                abaInicial={abaComFocoInicial}
                eventoAbaAlterada={AbaClicada} />
            <Row>
                <Col>
                    <Row className='mb-2'>
                        <Col>
                            <Form.Control
                                id='nomeprojeto'
                                type='text'
                                placeholder='Nome do projeto...'
                                value={nomeProjeto}
                                onChange={(e) => setNomeProjeto(e.target.value)} />
                        </Col>
                        <Col>
                            <Form.Control
                                id='codigoexterno'
                                type='text'
                                placeholder='Código externo...'
                                value={codigoProjeto}
                                onChange={(e) => setCodigoProjeto(e.target.value)} />
                        </Col>
                        <Col>
                            <Form.Control
                                id='nomecliente'
                                type='text'
                                placeholder='Nome do cliente...'
                                value={nomeCliente}
                                onChange={(e) => setNomeCliente(e.target.value)} />
                        </Col>
                        <Col>
                            <Form.Select
                                id='etapaprojeto'
                                value={etapaProjeto}
                                onChange={(e) => setEtapaProjeto(e.target.selectedOptions[0].value)}>
                                <option value=''>Etapa do projeto...</option>
                                <option value='backlog'>Backlog</option>
                                <option value='analise'>Análise</option>
                                <option value='andamento'>Andamento</option>
                                <option value='concluido'>Concluído</option>
                                <option value='cancelado'>Cancelado</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className='mb-2'>
                        <Col md={6}>
                            <Form.Control
                                id='descricaoprojeto'
                                type='text'
                                placeholder='Descrição do projeto...'
                                value={descricaoProjeto}
                                onChange={(e) => setDescricaoProjeto(e.target.value)} />
                        </Col>
                        <Col>
                            <Form.Select
                                id='tipoprojeto'
                                value={tipoProjeto}
                                onChange={(e) => setTipoProjeto(e.target.selectedOptions[0].value)}>
                                <option value=''>Tipo do projeto...</option>
                                <option value='interno'>Interno</option>
                                <option value='externo'>Externo</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <InputGroup
                                className='m-0'>
                                <InputGroup.Text>Horas estimadas</InputGroup.Text>
                                <Form.Control
                                    id='horasestimadas'
                                    type='number'
                                    max={8760}
                                    min={0}
                                    step={1}
                                    value={estimativaProjeto}
                                    onChange={(e) => setEstimativaProjeto(e.target.value ? +e.target.value : '')} />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputGroup
                                className='m-0'>
                                <InputGroup.Text>Previsão de Conclusão</InputGroup.Text>
                                <Form.Control
                                    id='previsaoconclusao'
                                    type='date'
                                    value={dataPrevista}
                                    onChange={(e) => setDataPrevista(e.target.value)} />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup
                                className='m-0'>
                                <InputGroup.Text>Vigência do Projeto</InputGroup.Text>
                                <Form.Control
                                    id='vigenciainicial'
                                    type='date'
                                    value={vigenciaInicial}
                                    onChange={(e) => setVigenciaInicial(e.target.value)} />
                                <InputGroup.Text>até</InputGroup.Text>
                                <Form.Control
                                    id='vigenciafinal'
                                    type='date'
                                    value={vigenciaFinal}
                                    onChange={(e) => setVigenciaFinal(e.target.value)} />
                            </InputGroup>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className='mt-3 mb-3'>
                <Col>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Cod.Ext</th>
                                <th>Tipo</th>
                                <th>Projeto</th>
                                <th>Descrição</th>
                                <th>Cliente</th>
                                <th>Vigência</th>
                                <th>Previsão</th>
                                <th>Estimativa</th>
                                <th>Etapa</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {linhasGridProjeto}
                        </tbody>
                    </Table>
                    <Pagination className='d-flex justify-content-center'>
                        {MontaPaginacaoTabela()}
                    </Pagination>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Stack direction='horizontal' className='d-flex flex-row-reverse' gap={2}>
                        <Button
                            variant='primary'
                            onClick={() => SalvarDados()}>
                            {dadosParaAtualizar && dadosParaAtualizar._id ? 'Atualizar' : 'Adicionar'}
                        </Button>
                        <Button
                            variant='light'
                            onClick={() => LimparTela()}>
                            Limpar
                        </Button>
                        <Button
                            variant='light'
                            onClick={() => setClicouFiltrar(!clicouFiltrar)}>
                            Filtrar
                        </Button>
                    </Stack>
                </Col>
            </Row>

            {/* Modais */}
            <ModalGerenciarIntegrantes 
                integrantes={integrantesSelec}
                show={mostrarModalIntegrantes}
                onHide={() => setMostrarModalIntegrantes(false)} />
        </Container>
    )
}

export default Projeto