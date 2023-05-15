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
import Alert from 'react-bootstrap/Alert'
import { 
    GearFill, 
    FileEarmarkSpreadsheetFill, 
    FileEarmarkPptFill, 
    PlayCircle, 
    StopCircle } from 'react-bootstrap-icons'
import MenuPrincipal from './../common/menu-principal/menu-principal'
import NavBarTela from './../common/navbar-tela/navbar-tela'
import ModalDadosProjeto from './components/modal-dados-projeto/modal-dados-projeto'
import ModalApontamentosProjeto from './components/modal-apontamentos-projeto/modal-apontamentos-projeto'
import ModalConfigAgenda from './components/modal-config-agenda/modal-config-agenda'
import ModalApontamentosDia from './components/modal-apontamentos-dia/modal-apontamentos-dia'
import ModalObservacao from './components/modal-observacao/modal-observacao'
import Loading from '../common/loading/loading'
import { ServicoAgenda } from './../../service/servico'
import { Utils } from './../../service/utils'

function Agenda(props) {
    const navigate = useNavigate()
    const [usuario, ] = useState(() => JSON.parse(sessionStorage.getItem('usuariologin')))
    const [nomeProjeto, setNomeProjeto] = useState('')
    const [horasApontDia, setHorasApontDia] = useState('')
    const [linhasDadosAgenda, setLinhasDadosAgenda] = useState([])
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [clicouNavegacaoGrid, setClicouNavegacaoGrid] = useState(false)
    const [dadosProjeto, setDadosProjeto] = useState({
        nomecliente: '',
        dataprevista: '',
        horasestimadas: '',
        horasconsumidas: ''
    })
    const [mostraModalDadosProj, setMostraModalDadosProj] = useState(false)
    const [apontamentosProj, setApontamentosProj] = useState([])
    const [mostraModalApontProj, setMostraModalApontProj] = useState(false)
    const [configAgenda, setConfigAgenda] = useState({})
    const [mostraModalConfigAgenda, setMostraModalConfigAgenda] = useState(false)
    const [apontamentosDia, setApontamentosDia] = useState([])
    const [mostraModalApontDia, setMostraModalApontDia] = useState(false)
    const [idModalObservacao, setIdModalObservacao] = useState('')
    const [mostraModalObservacao, setMostraModalObservacao] = useState(false)
    const [idAgendaApont, setIdAgendaApont] = useState('')
    const [loading, setLoading] = useState(false)
    const [mostrarAlerta, setMostrarAlerta] = useState(false)
    const [tipoAlerta, setTipoAlerta] = useState('')    
    const [msgAlerta, setMsgAlerta] = useState('')
    const [permAcaoRegistrarApontamento, setPermAcaoRegistrarApontamento] = useState(false)
    const [permAcaoAlterarConfiguracoes, setPermAcaoAlterarConfiguracoes] = useState(false)

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
            let body = document.getElementsByTagName('body')
            body[0].classList.forEach(v => body[0].classList.remove(v))            
            body[0].classList.add(`body-${usuariologin.acessibilidade.tema.titulo}`)
            AtivaInativaLoading(true)
            AplicaPermissao(usuariologin)
            ListaConfigAgenda()            
        } else {
            navigate('/app/acesso')
        }
    }, [])

    useEffect(() => {
        AtualizaHorasApontadasDia()
        if(configAgenda.encerra_apont_ao_iniciar_outro && idAgendaApont) {
            RegistraInicioApontamento(idAgendaApont)
            setIdAgendaApont('')
        }
    }, [linhasDadosAgenda])

    useEffect(() => {
        MontaLinhasGridAgenda(linhasDadosAgenda)
    }, [clicouNavegacaoGrid])

    function AplicaPermissao(usuariologin) {
        setPermAcaoRegistrarApontamento(Utils.TemPermissaoNaAcao(usuariologin, 'Agenda', 'Registrar apontamento'))
        setPermAcaoAlterarConfiguracoes(Utils.TemPermissaoNaAcao(usuariologin, 'Agenda', 'Alterar configurações'))
    }

    function ListaAgenda() {
        let dadosLogin = {
            usuario: usuario.email,
            senha: usuario.dados_acesso.senha
        }
        ServicoAgenda
        .RetornaListaAgenda(dadosLogin, { usuarioid: usuario._id })
        .then((resp) => {
            if(resp.erro) {
                AlertaErro(resp.msgErro)
                setLinhasDadosAgenda([])
            } else {
                let dados = resp.dados.map((v) => { return { apontando: false, inicio_apontamento: '', valor: v } })
                setLinhasDadosAgenda([...dados])
            }
        }).catch((err) => {
            AlertaErro(err)
            setLinhasDadosAgenda([])
        }).finally(() => AtivaInativaLoading(false))
    }

    function ListaConfigAgenda() {
        let dadosLogin = {
            usuario: usuario.email,
            senha: usuario.dados_acesso.senha
        }
        ServicoAgenda
        .RetornaListaConfigAgenda(dadosLogin, { usuarioid: usuario._id })
        .then((resp) => {
            if(resp.erro) {
                AlertaErro(resp.msgErro)
                setConfigAgenda({})
            } else {
                let dados = resp.dados[0]
                setConfigAgenda(dados)
            }
        }).catch((err) => {
            AlertaErro(err)
            setConfigAgenda({})
        }).finally(() => ListaAgenda())
    }

    const AbaClicada = function (evento) {
        console.log(evento.target.id)
    }

    function MontaLinhasGridAgenda(dados) {
        let dadosFiltrados = dados
        if (nomeProjeto) {
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.projeto.titulo.toLowerCase().indexOf(nomeProjeto.toLowerCase()) > -1)
        }
        if(configAgenda.ordena_grid_por_ultimo) {
            dadosFiltrados = dadosFiltrados.sort((a, b) => {
                if(!(a.valor.apontamentos && a.valor.apontamentos.length > 0)) {
                    if(!(b.valor.apontamentos && b.valor.apontamentos.length > 0)) {
                        return -1
                    } else {
                        return 1
                    }
                } else {
                    if(!(b.valor.apontamentos && b.valor.apontamentos.length > 0)) {
                        return -1
                    } else {
                        let apontRecenteA = ''
                        a.valor.apontamentos.forEach(v => {
                            if(apontRecenteA) {
                                let dataAux = new Date(v.hora_final)
                                if(apontRecenteA.getTime() < dataAux.getTime()) {
                                    apontRecenteA = dataAux
                                }
                            } else {
                                apontRecenteA = new Date(v.hora_final)
                            }
                        })
                        let apontRecenteB = ''
                        b.valor.apontamentos.forEach(v => {
                            if(apontRecenteB) {
                                let dataAux = new Date(v.hora_final)
                                if(apontRecenteB.getTime() < dataAux.getTime()) {
                                    apontRecenteB = dataAux
                                }
                            } else {
                                apontRecenteB = new Date(v.hora_final)
                            }
                        })
                        if(apontRecenteA.getTime() >= apontRecenteB.getTime()) {
                            return -1
                        } else {
                            return 1
                        }
                    }
                }
            })
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
                        <div hidden={!permAcaoRegistrarApontamento}>                      
                            {v.apontando ?
                            <StopCircle
                                id={v.valor._id}
                                size={20}
                                onClick={(e) => FinalizaApontamento(e)} /> :
                            <PlayCircle
                                id={v.valor._id}
                                size={20}
                                onClick={(e) => IniciaApontamento(e)} />}
                        </div>
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
                    className={paginaAtual===v ? `pagDestaque-${usuario.acessibilidade.tema.titulo}` : `pag-${usuario.acessibilidade.tema.titulo}`}
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
        let id = e.target.id ? e.target.id : e.target.parentElement.id
        let indiceAnt = linhasDadosAgenda.findIndex(v => v.apontando)
        if(!configAgenda.encerra_apont_ao_iniciar_outro && indiceAnt > -1) {
            console.error('Não é possível iniciar outro apontamento')
            return
        }
        if(configAgenda.encerra_apont_ao_iniciar_outro && indiceAnt > -1) {
            setIdAgendaApont(id)
            FinalizaApontamento({ target: { id: linhasDadosAgenda[indiceAnt].valor._id } })
            return
        }
        RegistraInicioApontamento(id)
    }

    function FinalizaApontamento(e) {
        let id = e.target.id ? e.target.id : e.target.parentElement.id
        if(configAgenda.mostra_obg_apos_apont) {
            setIdModalObservacao(id)
            setMostraModalObservacao(true)
        } else {
            SalvaApontamentoFinalizado(id, '')
        }
    }

    function AbreModalDadosProjeto(e) {
        let id = e.target.id ? e.target.id : e.target.parentElement.id
        if(id) {
            let dado = linhasDadosAgenda.filter(v => v.valor._id === id)[0]
            dadosProjeto.nomecliente = dado.valor.projeto.nome_cliente
            dadosProjeto.dataprevista = FormataData(new Date(dado.valor.projeto.previsao_conclusao), 'DD/MM/YYYY')
            dadosProjeto.horasestimadas = dado.valor.projeto.horas_estimadas.toFixed(2)
            if(dado.valor.apontamentos && dado.valor.apontamentos.length > 0) {
                let horasConsumidas = 0
                dado.valor.apontamentos.forEach(v => horasConsumidas += v.colaborador.id === usuario._id ? v.saldo : 0)
                dadosProjeto.horasconsumidas = (horasConsumidas / 3600000).toFixed(2)
            } else {
                dadosProjeto.horasconsumidas = ''
            }
            setDadosProjeto(dadosProjeto)
            setMostraModalDadosProj(true)
        }
    }

    function AbreModalApontamentosProjeto(e) {
        let id = e.target.id ? e.target.id : e.target.parentElement.id
        if(id) {
            let dado = linhasDadosAgenda.filter(v => v.valor._id === id)[0]
            if(dado.valor.apontamentos && dado.valor.apontamentos.length > 0) {
                setApontamentosProj(dado.valor.apontamentos)
            } else {
                setApontamentosProj([])
            }
            setMostraModalApontProj(true)
        }
    }

    function AbreModalConfiguracoes() {
        setMostraModalConfigAgenda(true)
    }

    function RetornoModalConfiguracoes(retorno) {
        setMostraModalConfigAgenda(false)
        if(retorno) {
            AtivaInativaLoading(true)
            let dadosLogin = {
                usuario: usuario.email,
                senha: usuario.dados_acesso.senha
            }
            ServicoAgenda
            .AtualizaConfigAgenda(dadosLogin, retorno)
            .then((resp) => {
                if(resp.erro) {
                    AlertaErro(resp.msgErro)
                } else {
                    setConfigAgenda(retorno)
                    AlertaSucesso('Configurações salvas com sucesso!')
                }
            }).catch((err) => {
                AlertaErro(err)
            }).finally(() => AtivaInativaLoading(false))
        }
    }

    function AbreModalApontamentosDoDia() {
        let apontamentosEmProjeto = RetornaApontsUsuarioDia()
        if(apontamentosEmProjeto) {
            setApontamentosDia(apontamentosEmProjeto)
        } else {
            setApontamentosDia([])
        }
        setMostraModalApontDia(true)
    }

    function LancaCompensacao() {
        console.log('LancaCompensacao')
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

    function FormataHora(data, padrao='hh:mm') {
        try {
            let strHora = data.getHours().toString().padStart(2, '0')
            let strMinuto = data.getMinutes().toString().padStart(2, '0')
            let dataRetorno = padrao.toLowerCase().replace('hh', strHora).replace('mm', strMinuto)
            return dataRetorno            
        } catch {
            return '' 
        }
    }

    function MilisegundoParaData(valor) {
        const horaEmMilisegundos = 3600000
        // Calculando as horas
        let fracaoDeHoras = valor / horaEmMilisegundos
        let hora = +(fracaoDeHoras.toString().split('.')[0])
        // Calculando os minutos
        let restoFracaoHoras = +(fracaoDeHoras.toFixed(2).toString().split('.')[1])
        let fracaoDeMinuto = restoFracaoHoras * 0.6
        let minuto = +(fracaoDeMinuto.toString().split('.')[0])
        // Montando a data
        let novaData = new Date(
            1900,
            1,
            1, 
            hora,
            minuto,
            0
        )
        return novaData
    }

    function AtualizaHorasApontadasDia() {
        let apontsDia = RetornaApontsUsuarioDia()        
        let saldoDiaMilisegundos = 0
        apontsDia.forEach(v => {
            saldoDiaMilisegundos += v.saldo
        })
        if(saldoDiaMilisegundos > 0) {
            let saldoEmHora = FormataHora(MilisegundoParaData(saldoDiaMilisegundos))
            setHorasApontDia(saldoEmHora)
        } else {
            setHorasApontDia('00:00')
        }
    }

    function RetornaApontsUsuarioDia() {
        let hoje = new Date()
        let apontamentosEmProjeto = []
        linhasDadosAgenda.forEach(v => {
            if(v.valor.apontamentos && v.valor.apontamentos.length > 0) {
                apontamentosEmProjeto.push(...v.valor.apontamentos.filter(i => {
                    if(i.colaborador && i.colaborador.id && i.colaborador.id === usuario._id) {
                        let dataApontHora = new Date(i.data)
                        let dataApont = new Date(dataApontHora.getFullYear(), dataApontHora.getMonth()+1, dataApontHora.getDate())
                        let dataHoje = new Date(hoje.getFullYear(), hoje.getMonth()+1, hoje.getDate())
                        if(dataApont.getTime() === dataHoje.getTime()) {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }
                }))
            }
        })
        return apontamentosEmProjeto
    }

    function SalvaApontamentoFinalizado(id, comentario) {
        if(id) {
            let indice = linhasDadosAgenda.findIndex(v => v.valor._id === id)
            let fimApont = new Date()
            let dados = linhasDadosAgenda[indice]
            if(dados.inicio_apontamento) {
                AtivaInativaLoading(true)
                let strHoje = `${dados.inicio_apontamento.getFullYear()}-${(dados.inicio_apontamento.getMonth()+1).toString().padStart(2, '0')}-${dados.inicio_apontamento.getDate().toString().padStart(2, '0')}`
                let strHoraInicial = `${dados.inicio_apontamento.getHours().toString().padStart(2, '0')}:${dados.inicio_apontamento.getMinutes().toString().padStart(2, '0')}:${dados.inicio_apontamento.getSeconds().toString().padStart(2, '0')}`
                let strHoraFinal = `${fimApont.getHours().toString().padStart(2, '0')}:${fimApont.getMinutes().toString().padStart(2, '0')}:${fimApont.getSeconds().toString().padStart(2, '0')}`
                let saldoApont = fimApont.getTime() - dados.inicio_apontamento.getTime()
                if(dados.valor.apontamentos.length > 0) {
                    dados.valor.apontamentos.push({
                        colaborador: {
                            id: usuario._id,
                            nome: usuario.dados_pessoais.nome
                        },
                        data: `${strHoje}T03:00:00Z`,
                        hora_inicial: `${strHoje}T${strHoraInicial}Z`,
                        hora_final: `${strHoje}T${strHoraFinal}Z`,
                        saldo: saldoApont,
                        observacao: comentario ? comentario : configAgenda.texto_padrao_obs ? configAgenda.texto_padrao_obs : ''
                    })
                } else {
                    dados.valor.apontamentos = [
                        {
                            colaborador: {
                                id: usuario._id,
                                nome: usuario.dados_pessoais.nome
                            },
                            data: `${strHoje}T03:00:00Z`,
                            hora_inicial: `${strHoje}T${strHoraInicial}Z`,
                            hora_final: `${strHoje}T${strHoraFinal}Z`,
                            saldo: saldoApont,
                            observacao: comentario ? comentario : configAgenda.texto_padrao_obs ? configAgenda.texto_padrao_obs : ''
                        }
                    ]
                }
                dados.apontando = false
                dados.inicio_apontamento = ''
                let dadosLogin = {
                    usuario: usuario.email,
                    senha: usuario.dados_acesso.senha
                }
                ServicoAgenda
                .AtualizaAgenda(dadosLogin, dados.valor)
                .then((resp) => {
                    if(resp.erro) {
                        AlertaErro(resp.msgErro)
                    } else {
                        AlertaSucesso('Apontamento salvo com sucesso!')
                    }
                }).catch((err) => {
                    AlertaErro(err)
                }).finally(() => ListaAgenda())
            }
        }
    }

    function RetornoModalObservacao(retorno) {
        setMostraModalObservacao(false)
        SalvaApontamentoFinalizado(idModalObservacao, retorno)
    }

    function RegistraInicioApontamento(id) {
        if(id) {
            let indice = linhasDadosAgenda.findIndex(v => v.valor._id === id)
            linhasDadosAgenda[indice].apontando = true
            linhasDadosAgenda[indice].inicio_apontamento = new Date()
            setLinhasDadosAgenda([...linhasDadosAgenda])
        }
    }

    function AtivaInativaLoading(ativa) {
        if(ativa) {
            setLoading(true)
        } else {
            setTimeout(() => {
                setLoading(false)
            }, 2000)
        }
    }

    function AlertaSucesso(msg) {
        setTipoAlerta('success')
        setMsgAlerta(msg)
        setMostrarAlerta(true)
        setTimeout(() => {
            setMostrarAlerta(false)
        }, 5000)
    }

    function AlertaErro(msg) {
        setTipoAlerta('danger')
        setMsgAlerta(msg)
        setTimeout(() => {
            setTipoAlerta('')
            setMsgAlerta('')
        }, 5000)
    }

    return (
        <Container
            className={`container-${usuario.acessibilidade.tema.titulo}`}>
            <MenuPrincipal usuario={usuario} />
            <NavBarTela
                abas={abasAgenda}
                abaInicial={abaComFocoInicial}
                eventoAbaAlterada={AbaClicada}
                usuariologin={usuario} />            
            { loading ? <Loading /> : null }
            <Row>
                <Col>
                    <Form.Control 
                        id='filtroprojeto'
                        type='text'
                        placeholder='Filtra o projeto...'
                        className={`form-control-${usuario.acessibilidade.tema.titulo}`}
                        disabled={loading}
                        value={nomeProjeto}
                        onChange={(e) => setNomeProjeto(e.target.value)} />
                </Col>
                <Col md={'auto'}>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <GearFill 
                                size={20}
                                disabled={!permAcaoAlterarConfiguracoes || loading}
                                onClick={() => AbreModalConfiguracoes()} />
                            <FileEarmarkSpreadsheetFill 
                                size={20}
                                disabled={loading}
                                className='m-2'
                                onClick={() => AbreModalApontamentosDoDia()} />
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <InputGroup className='m-0'>
                        <InputGroup.Text
                            className={`form-text-${usuario.acessibilidade.tema.titulo}`}>
                            Total de horas apontadas hoje
                        </InputGroup.Text>
                        <Form.Control                    
                            id='horasapontadasdia'
                            type='time'
                            className={`form-control-${usuario.acessibilidade.tema.titulo}`}
                            readOnly={true}
                            value={horasApontDia} />
                    </InputGroup>
                </Col>
                <Col md={'auto'}>
                    <Button 
                        variant='primary'
                        hidden={true}
                        onClick={() => LancaCompensacao()}>
                        Compensação
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table 
                        variant={usuario.acessibilidade.tema.titulo}>
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

            {/* Modais */}
            <ModalDadosProjeto
                dadosprojeto={dadosProjeto}
                usuario={usuario}
                show={mostraModalDadosProj}
                onHide={() => setMostraModalDadosProj(false)} />
            <ModalApontamentosProjeto
                apontamentosprojeto={apontamentosProj}
                usuario={usuario}
                show={mostraModalApontProj}
                onHide={() => setMostraModalApontProj(false)} />
            <ModalConfigAgenda
                configatual={configAgenda}
                usuario={usuario}
                show={mostraModalConfigAgenda}
                onHide={(retorno) => RetornoModalConfiguracoes(retorno)} />
            <ModalApontamentosDia
                apontamentos={apontamentosDia}
                usuario={usuario}
                show={mostraModalApontDia}
                onHide={() => setMostraModalApontDia(false)} />
            <ModalObservacao
                obspadrao={configAgenda.texto_padrao_obs}
                usuario={usuario}
                show={mostraModalObservacao}
                onHide={(retorno) => RetornoModalObservacao(retorno)} /> 
            
            {/* Alertas */}
            <Alert 
                variant={tipoAlerta}
                dismissible={true}
                onClose={() => setMostrarAlerta(false)}
                show={mostrarAlerta}>
                {msgAlerta}
            </Alert>
        </Container>
    )
}
  
export default Agenda