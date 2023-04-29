import './equipe.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import { PeopleFill, PencilSquare } from 'react-bootstrap-icons'
import MenuPrincipal from './../common/menu-principal/menu-principal'
import NavBarTela from './../common/navbar-tela/navbar-tela'
import ModalPesquisa from './../common/modal-pesquisa/modal-pesquisa'
import ModalIntegrantes from './components/modal-integrantes/modal-integrantes'
import { ServicoEquipe } from './../../service/servico'

function Equipe(props) {
    const navigate = useNavigate()
    const [nomeUsuario, setNomeUsuario] = useState('')
    const [usuarioLogin, ] = useState(() => JSON.parse(sessionStorage.getItem('usuariologin')))
    const [nomeEquipe, setNomeEquipe] = useState('')
    const [situacaoEquipe, setSituacaoEquipe] = useState(true)
    const [ignorarSituacao, setIgnorarSituacao] = useState(true)
    const [descricaoEquipe, setDescricaoEquipe] = useState('')
    const [usuarios, setUsuarios] = useState('')
    const [usuariosSelec, setUsuariosSelec] = useState([])
    const [todosUsuarios, setTodosUsuarios] = useState(false)
    const [tituloModal, setTituloModal] = useState('')
    const [mostrarModalPesquisa, setMostrarModalPesquisa] = useState(false)
    const [mostrarModalIntegrantes, setMostrarModalIntegrantes] = useState(false)
    const [integrantesSelec, setIntegrantesSelec] = useState([])
    const [clicouFiltrar, setClicouFiltrar] = useState(false)
    const [filtrou, setfiltrou] = useState(false)
    const [listaDadosEquipe, setListaDadosEquipe] = useState([])
    const [linhasGridEquipe, setLinhasGridEquipe] = useState([])
    const [dadosParaAtualizar, setDadosParaAtualizar] = useState({})
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [clicouNavegacaoGrid, setClicouNavegacaoGrid] = useState(false)

    const qtdLinhasPaginacao = 5
    const abaComFocoInicial = "aba001"
    const abasEquipe = [
        {
            id: "aba001",
            texto: "Cadastro de Equipe"
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
            ListaEquipes()
        } else {
            navigate('/app/acesso')
        }
    }, []);

    useEffect(() => {
        MontaLinhasGridEquipe(listaDadosEquipe, null)
        setfiltrou(false)
    }, [listaDadosEquipe])

    useEffect(() => {
        if(usuariosSelec.length === 1) {
            setUsuarios(usuariosSelec[0].descricao)
        } else if(usuariosSelec.length >= 1) {
            setUsuarios(usuariosSelec[0].descricao + ' ... (+' + (usuariosSelec.length-1) + ')')
        } else {
            setUsuarios('')
        }     
    }, [usuariosSelec])

    useEffect(() => {
        let filtros = {
            situacao: ignorarSituacao ? '' : situacaoEquipe ? 'ativo' : 'inativo',
            nome: nomeEquipe,
            descricao: descricaoEquipe,
            usuarios: usuariosSelec
        }
        MontaLinhasGridEquipe(listaDadosEquipe, filtros)
        setfiltrou(true)
    }, [clicouFiltrar])

    useEffect(() => {
        let filtros = null
        if(filtrou) {
            filtros = {
                situacao: ignorarSituacao ? '' : situacaoEquipe ? 'ativo' : 'inativo',
                nome: nomeEquipe,
                descricao: descricaoEquipe,
                usuarios: usuariosSelec
            }
        }
        MontaLinhasGridEquipe(listaDadosEquipe, filtros)
    }, [clicouNavegacaoGrid])

    const AbaClicada = function (evento) {
        console.log(evento.target.id)
    }

    function ListaEquipes() {
        let dadosLogin = {
            usuario: usuarioLogin.email,
            senha: usuarioLogin.dados_acesso.senha
        }
        ServicoEquipe
        .RetornaListaEquipe(dadosLogin)
        .then((resp) => {
            if(resp.erro) {
                console.error(resp.msgErro)
                setListaDadosEquipe([])
            } else {
                let dados = resp.dados.map((v) => { return { valor: v } })
                setListaDadosEquipe(dados)
            }
        }).catch((err) => {
            console.error(err)
            setListaDadosEquipe([])
        })
    }

    function MontaLinhasGridEquipe(dados, filtros) { 
        let dadosFiltrados = dados
        if(filtros && filtros.nome) {
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.nome.indexOf(filtros.nome) > -1)
        }
        if(filtros && filtros.situacao) {
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.situacao === filtros.situacao)
        }
        if(filtros && filtros.descricao) {
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.descricao.indexOf(filtros.descricao) > -1)
        }
        if(filtros && filtros.usuarios && filtros.usuarios.length > 0) {
            dadosFiltrados = dadosFiltrados.filter(v => {
                if(todosUsuarios) return true
                return ExisteUmElementoEmComum(v.valor.integrantes, usuariosSelec)
            })
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
        setLinhasGridEquipe(dadosFiltrados.map((v, i, o) =>             
                <tr key={i}>
                    <td>
                        {v.valor.nome}
                    </td>
                    <td>
                        {v.valor.descricao}
                    </td>
                    <td>
                        <Badge pill bg={v.valor.situacao==='ativo'?'primary':'danger'}>{v.valor.situacao}</Badge>
                    </td>                
                    <td>
                        <Stack direction='horizontal' gap={2}>
                            <PencilSquare 
                                id={v.valor._id}
                                size={20}
                                onClick={(e) => IniciaEdicao(e)} />
                            {
                                v.valor.integrantes && v.valor.integrantes.length > 0 ? 
                                <PeopleFill 
                                    id={v.valor._id}    
                                    size={20}
                                    onClick={(e) => AbreModalIntegrantes(e)} /> : 
                                null
                            }
                        </Stack>
                    </td>
                </tr>
            )
        )
    }

    function ExisteUmElementoEmComum(a, b) {
        let temElementoEmComum = false
        a.forEach(v => {
            b.forEach(val => {
                if(v.id === val.codigo) {
                    temElementoEmComum = true
                    return
                }
            })
            if(temElementoEmComum) return
        })
        return temElementoEmComum
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

    function AbreModalPesquisa() {
        setTituloModal('Usuários')
        setMostrarModalPesquisa(!mostrarModalPesquisa)
    }

    function AbreModalIntegrantes(e) {
        let id = e.target.id ? e.target.id : e.target.parentElement.id
        if(id) {
            let dado = listaDadosEquipe.filter(v => v.valor._id === id)[0]
            setIntegrantesSelec(dado.valor.integrantes)
            setMostrarModalIntegrantes(true)
        }
    }

    function RetornaDadosModal(dados) {
        setMostrarModalPesquisa(false)
        setTituloModal('')
        if(!(dados && dados.campo)) {
            return
        }
        setTodosUsuarios(dados.todos)
        setUsuariosSelec([...dados.selecionados])
    }

    function SalvarDados() {
        let dadosLogin = {
            usuario: usuarioLogin.email,
            senha: usuarioLogin.dados_acesso.senha
        }
        if(dadosParaAtualizar && dadosParaAtualizar._id) {
            dadosParaAtualizar.nome = nomeEquipe
            dadosParaAtualizar.descricao = descricaoEquipe
            dadosParaAtualizar.situacao = situacaoEquipe ? 'ativo' : 'inativo'
            dadosParaAtualizar.integrantes = usuariosSelec.map(v => {
                    let objRetorno = {}
                    if(v.obj && v.obj.dados_colaborador) {
                        objRetorno = {
                            id: v.codigo,
                            nome: v.descricao,
                            cargo: v.obj && v.obj.dados_colaborador && v.obj.dados_colaborador.cargo ? v.obj.dados_colaborador.cargo : '',
                            funcao: {
                                id: v.obj && v.obj.dados_colaborador && v.obj.dados_colaborador.funcao && v.obj.dados_colaborador.funcao.id ? v.obj.dados_colaborador.funcao.id : '',
                                nome: v.obj && v.obj.dados_colaborador && v.obj.dados_colaborador.funcao && v.obj.dados_colaborador.funcao.nome ? v.obj.dados_colaborador.funcao.nome : ''
                            }
                        }
                    } else {
                        objRetorno = {
                            id: v.codigo,
                            nome: v.descricao
                        }
                    }
                    return objRetorno
                }
            )
            ServicoEquipe
            .AtualizaEquipe(dadosLogin, dadosParaAtualizar)
            .then((resp) => {
                if(resp.erro) {
                    console.error(resp.msgErro)
                }
            }).catch((err) => {
                console.error(err)
            }).finally(() => {
                LimparTela()
                ListaEquipes()
            })
        } else {
            console.log(usuariosSelec)
            let dados = {
                nome: nomeEquipe,
                descricao: descricaoEquipe,
                situacao: situacaoEquipe ? 'ativo' : 'inativo',
                integrantes: usuariosSelec.map(v => {
                        let objRetorno = {}
                        if(v.obj && v.obj.dados_colaborador) {
                            objRetorno = {
                                id: v.codigo,
                                nome: v.descricao,
                                cargo: v.obj && v.obj.dados_colaborador && v.obj.dados_colaborador.cargo ? v.obj.dados_colaborador.cargo : '',
                                funcao: {
                                    id: v.obj && v.obj.dados_colaborador && v.obj.dados_colaborador.funcao && v.obj.dados_colaborador.funcao.id ? v.obj.dados_colaborador.funcao.id : '',
                                    nome: v.obj && v.obj.dados_colaborador && v.obj.dados_colaborador.funcao && v.obj.dados_colaborador.funcao.nome ? v.obj.dados_colaborador.funcao.nome : ''
                                }
                            }
                        } else {
                            objRetorno = {
                                id: v.codigo,
                                nome: v.descricao
                            }
                        }
                        return objRetorno
                    }
                )
            }
            console.log(dados)
            ServicoEquipe
            .InsereEquipe(dadosLogin, dados)
            .then((resp) => {
                if(resp.erro) {
                    console.error(resp.msgErro)
                }
            }).catch((err) => {
                console.error(err)
            }).finally(() => {
                LimparTela()
                ListaEquipes()
            })
        }
    }

    function LimparTela() {
        setNomeEquipe('')
        setSituacaoEquipe(true)
        setIgnorarSituacao(true)
        setDescricaoEquipe('')
        setUsuariosSelec([])
        setfiltrou(false)
        setDadosParaAtualizar({})
        MontaLinhasGridEquipe(listaDadosEquipe, null)
    }

    function IniciaEdicao(e) {
        let id = e.target.id ? e.target.id : e.target.parentElement.id
        if(id) {
            let dado = listaDadosEquipe.filter(v => v.valor._id === id)[0]
            setDadosParaAtualizar(dado.valor)
            setNomeEquipe(dado.valor.nome)
            setSituacaoEquipe(dado.valor.situacao === 'ativo')
            setIgnorarSituacao(false)
            setDescricaoEquipe(dado.valor.descricao)
            if(dado.valor.integrantes && dado.valor.integrantes.length > 0) {
                let listaIntegrantes = dado.valor.integrantes.map(v => { return { codigo: v.id, descricao: v.nome} })
                setUsuariosSelec(listaIntegrantes)
            }
        }
    }

    return (
        <Container>
            <MenuPrincipal usuario={nomeUsuario} />
            <NavBarTela 
                abas={abasEquipe}
                abaInicial={abaComFocoInicial}
                eventoAbaAlterada={AbaClicada} />
            <Row>
                <Col md={6}>
                    <Form.Control
                        id='nomeequipe'
                        type="text" 
                        placeholder="Nome da equipe..."
                        value={nomeEquipe}
                        onChange={(e) => setNomeEquipe(e.target.value)} />
                </Col>
                <Col>
                    <Form.Check
                        id={'situcao'}
                        type='checkbox'
                        label='Ativo'
                        disabled={ignorarSituacao}
                        checked={situacaoEquipe}
                        onChange={(e) => setSituacaoEquipe(e.target.checked)} />
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
                    <Form.Control
                        id='descricaoequipe'
                        type="text"
                        placeholder='Descrição da equipe...'
                        value={descricaoEquipe}
                        onChange={(e) => setDescricaoEquipe(e.target.value)} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputGroup>
                        <Form.Control
                            id='usuarios'
                            disabled={true}
                            placeholder="Escolha o usuário..."
                            value={usuarios} />
                        <Button 
                            id="botao_usuarios" 
                            variant="outline-secondary"
                            onClick={() => AbreModalPesquisa()} >
                            Pesquisar
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Equipe</th>
                                <th>Descrição</th>
                                <th>Situação</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {linhasGridEquipe}
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

            {/* Modais */}
            <ModalPesquisa
                usuario={usuarioLogin}
                titulo={tituloModal}
                multiselecao={'true'}
                selecionados={usuariosSelec}
                show={mostrarModalPesquisa}
                onHide={(dadosSelecionados) => RetornaDadosModal(dadosSelecionados)}
            />
            <ModalIntegrantes
                integrantes={integrantesSelec}
                show={mostrarModalIntegrantes}
                onHide={() => setMostrarModalIntegrantes(false)}
            />
        </Container>
    )
}
  
export default Equipe