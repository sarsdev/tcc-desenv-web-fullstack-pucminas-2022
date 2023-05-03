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
import { ServicoProjeto } from './../../service/servico'

function Projeto(props) {
    const navigate = useNavigate()
    const [nomeUsuario, setNomeUsuario] = useState('')
    const [usuario, ] = useState(() => JSON.parse(sessionStorage.getItem('usuariologin')))
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
    const [integrantesSelec, setIntegrantesSelec] = useState({ idprojeto: '', dados: [] })
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
                previsao: `${dataPrevista}T03:00:00Z`,
                vigencia_inicial: `${vigenciaInicial}T03:00:00Z`,
                vigencia_final: `${vigenciaFinal}T03:00:00Z`
            }
        }
        MontaLinhasGridProjeto(listaDadosProjeto, filtros)
    }, [clicouNavegacaoGrid])

    function ListaProjetos() {
        let dadosLogin = {
            usuario: usuario.email,
            senha: usuario.dados_acesso.senha
        }
        ServicoProjeto
        .RetornaListaProjetos(dadosLogin)
        .then((resp) => {
            if(resp.erro) {
                console.error(resp.msgErro)
                setListaDadosProjeto([])
            } else {
                let dados = resp.dados.map((v) => { return { valor: v } })
                setListaDadosProjeto(dados)
            }
        }).catch((err) => {
            console.error(err)
            setListaDadosProjeto([])
        })
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
            dadosFiltrados = dadosFiltrados.filter(v => new Date(v.valor.previsao_conclusao).getTime() === dataPrevista.getTime())
        }
        if (filtros && filtros.vigencia_inicial !== '') {
            let dataQuebrada = filtros.vigencia_inicial.split('-')
            let dataInicial = new Date(+dataQuebrada[0], +dataQuebrada[1]-1, +dataQuebrada[2])
            dadosFiltrados = dadosFiltrados.filter(v => new Date(v.valor.inicio_projeto).getTime() >= dataInicial.getTime())
        }
        if (filtros && filtros.vigencia_final !== '') {
            let dataQuebrada = filtros.vigencia_final.split('-')
            let dataFinal = new Date(+dataQuebrada[0], +dataQuebrada[1]-1, +dataQuebrada[2])
            dadosFiltrados = dadosFiltrados.filter(v => new Date(v.valor.final_projeto).getTime() <= dataFinal.getTime())
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
                    {`${FormataData(new Date(v.valor.inicio_projeto), 'DD/MM/YYYY')} - ${FormataData(new Date(v.valor.final_projeto), 'DD/MM/YYYY')}`}
                </td>
                <td>
                    {FormataData(new Date(v.valor.previsao_conclusao), 'DD/MM/YYYY')}
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
        let dadosLogin = {
            usuario: usuario.email,
            senha: usuario.dados_acesso.senha
        }
        if(dadosParaAtualizar && dadosParaAtualizar._id) {
            dadosParaAtualizar.titulo = nomeProjeto
            dadosParaAtualizar.codigo_externo = codigoProjeto
            dadosParaAtualizar.nome_cliente = nomeCliente
            dadosParaAtualizar.etapa = etapaProjeto
            dadosParaAtualizar.descricao = descricaoProjeto
            dadosParaAtualizar.tipo = tipoProjeto
            dadosParaAtualizar.horas_estimadas = estimativaProjeto
            dadosParaAtualizar.previsao_conclusao = `${dataPrevista}T03:00:00Z`
            dadosParaAtualizar.inicio_projeto = `${vigenciaInicial}T03:00:00Z`
            dadosParaAtualizar.final_projeto = `${vigenciaFinal}T03:00:00Z`
            ServicoProjeto
            .AtualizaProjeto(dadosLogin, dadosParaAtualizar)
            .then((resp) => {
                if(resp.erro) {
                    console.error(resp.msgErro)
                }
            }).catch((err) => {
                console.error(err)
            }).finally(() => {
                LimparTela()
                ListaProjetos()
            })
        } else {
            let dados = {
                titulo: nomeProjeto,
                codigo_externo: codigoProjeto,
                descricao: descricaoProjeto,
                nome_cliente: nomeCliente,
                tipo: tipoProjeto,
                etapa: etapaProjeto,
                previsao_conclusao: `${dataPrevista}T03:00:00Z`,
                inicio_projeto: `${vigenciaInicial}T03:00:00Z`,
                final_projeto: `${vigenciaFinal}T03:00:00Z`,
                horas_estimadas: estimativaProjeto,
                colaboradores: []
            }
            ServicoProjeto
            .InsereProjeto(dadosLogin, dados)
            .then((resp) => {
                if(resp.erro) {
                    console.error(resp.msgErro)
                }
            }).catch((err) => {
                console.error(err)
            }).finally(() => {
                LimparTela()
                ListaProjetos()
            })
        }
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
            setDataPrevista(FormataData(new Date(dado.valor.previsao_conclusao)))
            setVigenciaInicial(FormataData(new Date(dado.valor.inicio_projeto)))
            setVigenciaFinal(FormataData(new Date(dado.valor.final_projeto)))
        }
    }

    function FormataData(data, padrao='yyyy-MM-dd') {
        try {
            let strDia = data.getDate().toString().padStart(2, '0')
            let strMes = (data.getMonth()+1).toString().padStart(2, '0')
            let strAno = data.getFullYear().toString()
            let dataRetorno = padrao.toLowerCase().replace('dd', strDia).replace('mm', strMes).replace('yyyy', strAno)
            return dataRetorno            
        } catch {
            return '' 
        }
    }

    function AbreModalIntegrantes(e) {
        let id = e.target.id ? e.target.id : e.target.parentElement.id
        if(id) {
            IniciaEdicao(e)
            integrantesSelec.idprojeto = id
            let dado = listaDadosProjeto.filter(v => v.valor._id === id)[0]
            if(dado.valor && dado.valor.colaboradores && dado.valor.colaboradores.length > 0) {
                integrantesSelec.dados = dado.valor.colaboradores
            } else {
                integrantesSelec.dados = []
            }
            setIntegrantesSelec(integrantesSelec)
            setMostrarModalIntegrantes(true)
        }
    }

    function RetornoModalIntegrantes(retorno) {
        setMostrarModalIntegrantes(false)
        if(retorno && retorno.idprojeto) {
            let indice = listaDadosProjeto.findIndex(v => v.valor._id === retorno.idprojeto)
            listaDadosProjeto[indice].valor.colaboradores = retorno.dados
            setListaDadosProjeto([...listaDadosProjeto])
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
                usuariologin={usuario}
                show={mostrarModalIntegrantes}
                onHide={(retorno) => RetornoModalIntegrantes(retorno)} />
        </Container>
    )
}

export default Projeto