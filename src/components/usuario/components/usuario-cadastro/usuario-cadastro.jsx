import './usuario-cadastro.css'
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Alert from 'react-bootstrap/Alert'
import { PencilSquare } from 'react-bootstrap-icons'
import ModalPesquisa from '../../../common/modal-pesquisa/modal-pesquisa'
import Loading from '../../../common/loading/loading'
import { ServicoUsuario } from '../../../../service/servico'
import { Utils } from './../../../../service/utils'

function UsuarioCadastro(props) {
    const [nomeUsuario, setNomeUsuario] = useState('')
    const [emailUsuario, setEmailUsuario] = useState('')
    const [fatorUsuario, setFatorUsuario] = useState('')
    const [cargoUsuario, setCargoUsuario] = useState('')
    const [situacaoUsuario, setSituacaoUsuario] = useState(true)
    const [ignorarSituacao, setIgnorarSituacao] = useState(true)
    const [equipeUsuario, setEquipeUsuario] = useState('')
    const [equipeSelec, setEquipeSelec] = useState([])
    const [funcaoUsuario, setFuncaoUsuario] = useState('')
    const [funcaoSelec, setFuncaoSelec] = useState([])
    const [listaDadosUsuario, setListaDadosUsuario] = useState([])
    const [linhasGridUsuario, setLinhasGridUsuario] = useState([])
    const [clicouFiltrar, setClicouFiltrar] = useState(false)
    const [filtrou, setfiltrou] = useState(false)
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [clicouNavegacaoGrid, setClicouNavegacaoGrid] = useState(false)
    const [dadosParaAtualizar, setDadosParaAtualizar] = useState({})
    const [tituloModal, setTituloModal] = useState('')
    const [mostrarModalPesquisa, setMostrarModalPesquisa] = useState(false)
    const [loading, setLoading] = useState(false)
    const [mostrarAlerta, setMostrarAlerta] = useState(false)
    const [tipoAlerta, setTipoAlerta] = useState('')    
    const [msgAlerta, setMsgAlerta] = useState('')
    const [permAcaoAdicionar, setPermAcaoAdicionar] = useState(false)
    const [permAcaoLimpar, setPermAcaoLimpar] = useState(false)
    const [permAcaoPesquisar, setPermAcaoPesquisar] = useState(false)

    const qtdLinhasPaginacao = 5

    useEffect(() => {
        AtivaInativaLoading(true)
        AplicaPermissao(props.usuariologin)
        ListaUsuarios()
    }, [])

    useEffect(() => {
        MontaLinhasGridUsuario(listaDadosUsuario, null)
        setfiltrou(false)
    }, [listaDadosUsuario])

    useEffect(() => {
        let filtros = {
            nome: nomeUsuario,
            email: emailUsuario,
            fator: fatorUsuario,
            cargo: cargoUsuario,
            situacao: ignorarSituacao ? '' : situacaoUsuario ? 'ativo' : 'inativo',
            equipe: equipeSelec[0],
            funcao: funcaoSelec[0]
        }
        MontaLinhasGridUsuario(listaDadosUsuario, filtros)
        setfiltrou(true)
    }, [clicouFiltrar])

    useEffect(() => {
        let filtros = null
        if(filtrou) {
            filtros = {
                nome: nomeUsuario,
                email: emailUsuario,
                fator: fatorUsuario,
                cargo: cargoUsuario,
                situacao: ignorarSituacao ? '' : situacaoUsuario ? 'ativo' : 'inativo',
                equipe: equipeSelec[0],
                funcao: funcaoSelec[0]
            }
        }
        MontaLinhasGridUsuario(listaDadosUsuario, filtros)
    }, [clicouNavegacaoGrid])

    useEffect(() => {
        if(equipeSelec.length > 0 && equipeSelec[0].codigo) {
            setEquipeUsuario(equipeSelec[0].descricao)
        } else {
            setEquipeUsuario('')
        }
    }, [equipeSelec])

    useEffect(() => {
        if(funcaoSelec.length > 0 && funcaoSelec[0].codigo) {
            setFuncaoUsuario(funcaoSelec[0].descricao)
        } else {
            setFuncaoUsuario('')
        }      
    }, [funcaoSelec])

    function AplicaPermissao(usuariologin) {
        setPermAcaoAdicionar(Utils.TemPermissaoNaAcao(usuariologin, 'Usuário', 'Adicionar'))
        setPermAcaoLimpar(Utils.TemPermissaoNaAcao(usuariologin, 'Usuário', 'Limpar'))
        setPermAcaoPesquisar(Utils.TemPermissaoNaAcao(usuariologin, 'Usuário', 'Pesquisar'))
    }

    function ListaUsuarios() {
        let dadosLogin = {
            usuario: props.usuariologin.email,
            senha: props.usuariologin.dados_acesso.senha
        }
        ServicoUsuario
        .RetornaListaUsuario(dadosLogin)
        .then((resp) => {
            if(resp.erro) {
                AlertaErro(resp.msgErro)
                setListaDadosUsuario([])
            } else {
                let dados = resp.dados.map((v) => { return { valor: v } })
                setListaDadosUsuario(dados)
            }
        }).catch((err) => {
            AlertaErro(err)
            setListaDadosUsuario([])
        }).finally(() => AtivaInativaLoading(false))
    }

    function MontaLinhasGridUsuario(dados, filtros) {
        let dadosFiltrados = dados
        if(filtros && filtros.nome) {
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.dados_pessoais ? v.valor.dados_pessoais.nome.indexOf(filtros.nome) > -1 : false)
        }
        if(filtros && filtros.email) {
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.email.indexOf(filtros.email) > -1)
        }
        if(filtros && filtros.fator !== '') {
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.dados_colaborador ? v.valor.dados_colaborador.fator_produtividade === filtros.fator : false)
        }
        if(filtros && filtros.cargo) {
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.dados_colaborador ? v.valor.dados_colaborador.cargo.indexOf(filtros.cargo) > -1 : false)
        }
        if(filtros && filtros.situacao) {
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.situacao === filtros.situacao)
        }
        if(filtros && filtros.equipe && filtros.equipe.descricao) {
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.dados_colaborador ? v.valor.dados_colaborador.equipe.nome === filtros.equipe.descricao : false)
        }
        if(filtros && filtros.funcao && filtros.funcao.descricao) {
            dadosFiltrados = dadosFiltrados.filter(v => v.valor.dados_colaborador ? v.valor.dados_colaborador.funcao.nome === filtros.funcao.descricao : false)
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
        setLinhasGridUsuario(dadosFiltrados.map((v, i) =>
            <tr key={i}>
                <td>
                    {v.valor.dados_pessoais ? v.valor.dados_pessoais.nome : null}
                </td>
                <td>
                    {v.valor.email}
                </td>
                <td>
                    {v.valor.dados_colaborador ? v.valor.dados_colaborador.cargo : null}
                </td>
                <td>
                    {v.valor.dados_colaborador && v.valor.dados_colaborador.equipe ? v.valor.dados_colaborador.equipe.nome : null}
                </td>
                <td>
                    {v.valor.dados_colaborador && v.valor.dados_colaborador.funcao ? v.valor.dados_colaborador.funcao.nome : null}
                </td>
                <td>
                    {v.valor.dados_colaborador ? v.valor.dados_colaborador.fator_produtividade : null}
                </td>
                <td>
                    <Badge pill className={`badge-${props.usuariologin.acessibilidade.tema.titulo}`}>{v.valor.situacao}</Badge>
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
                                                    className={paginaAtual===v ? `pagDestaque-${props.usuariologin.acessibilidade.tema.titulo}` : `pag-${props.usuariologin.acessibilidade.tema.titulo}`}
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

    function AbreModalPesquisa(pesquisarPor) {
        switch (pesquisarPor) {
            case 'botao-equipe':
                setTituloModal('Equipes')
                setMostrarModalPesquisa(true)
                break
            case 'botao-funcao':
                setTituloModal('Funções')
                setMostrarModalPesquisa(true)
                break
            default:
                break
        }
    }

    function RetornaDadosModal(dados) {
        setMostrarModalPesquisa(false)
        setTituloModal('')
        if(!(dados && dados.campo)) {
            return
        }
        switch(dados.campo) {
            case 'Equipes':
                setEquipeSelec(dados.selecionados)
                break
            case 'Funções':
                setFuncaoSelec(dados.selecionados)
                break
            default:
                break
        }
    }

    function LimparTela() {
        setNomeUsuario('')
        setEmailUsuario('')
        setFatorUsuario('')
        setCargoUsuario('')
        setSituacaoUsuario(true)
        setIgnorarSituacao(true)
        setEquipeUsuario('')
        setEquipeSelec([])
        setFuncaoUsuario('')
        setFuncaoSelec([])
        setfiltrou(false)
        setDadosParaAtualizar({})
        MontaLinhasGridUsuario(listaDadosUsuario, null)
    }

    function SalvarDados() {
        AtivaInativaLoading(true)
        let dadosLogin = {
            usuario: props.usuariologin.email,
            senha: props.usuariologin.dados_acesso.senha
        }
        if(dadosParaAtualizar && dadosParaAtualizar._id) {
            let dados = {
                email: emailUsuario,
                situacao: situacaoUsuario ? 'ativo' : 'inativo'
            }
            if(dadosParaAtualizar && dadosParaAtualizar._id) {
                dados._id = dadosParaAtualizar._id
                dados.__v = dadosParaAtualizar.__v
            }
            if(nomeUsuario) {
                dados.dados_pessoais = {
                    nome: nomeUsuario
                }
            }
            if(dadosParaAtualizar.dados_pessoais && dadosParaAtualizar.dados_pessoais.cpf) {
                if(dados.dados_pessoais) {
                    dados.dados_pessoais.cpf = dadosParaAtualizar.dados_pessoais.cpf
                } else {
                    dados.dados_pessoais = {
                        cpf: dadosParaAtualizar.dados_pessoais.cpf
                    }
                }
            }
            if(cargoUsuario || fatorUsuario !== '' || equipeSelec.length > 0 || funcaoSelec.length > 0) {
                dados.dados_colaborador = {}
                if(cargoUsuario) {
                    dados.dados_colaborador.cargo = cargoUsuario
                }
                if(fatorUsuario !== '') {
                    dados.dados_colaborador.fator_produtividade = fatorUsuario
                }
                if(equipeSelec.length > 0) {
                    dados.dados_colaborador.equipe = {
                        id: equipeSelec[0].codigo,
                        nome: equipeSelec[0].descricao
                    }
                }
                if(funcaoSelec.length > 0) {
                    dados.dados_colaborador.funcao = {
                        id: funcaoSelec[0].codigo,
                        nome: funcaoSelec[0].descricao
                    }
                }
            }
            if(dadosParaAtualizar.dados_acesso && dadosParaAtualizar.dados_acesso.senha) {
                dados.dados_acesso = {
                    data_ultimo_acesso: dadosParaAtualizar.dados_acesso.data_ultimo_acesso,
                    ind_acesso_temporario: dadosParaAtualizar.dados_acesso.ind_acesso_temporario,
                    senha: dadosParaAtualizar.dados_acesso.senha,
                    situacao: dadosParaAtualizar.dados_acesso.situacao
                }
            }
            ServicoUsuario
            .AtualizaUsuario(dadosLogin, dados)
            .then((resp) => {
                if(resp.erro) {
                    AlertaErro(resp.msgErro)
                } else {
                    AlertaSucesso('Usuário atualizado com sucesso!')
                }
            }).catch((err) => {
                AlertaErro(err)
            }).finally(() => {
                LimparTela()
                ListaUsuarios()
            })
        } else {
            let dados = {
                email: emailUsuario,
                situacao: situacaoUsuario ? 'ativo' : 'inativo',
                dados_acesso: {
                    ind_acesso_temporario: false,
                    situacao: 'aprovado'
                }
            }
            if(nomeUsuario) {
                dados.dados_pessoais = {
                    nome: nomeUsuario
                }
            }
            if(cargoUsuario || fatorUsuario !== '' || equipeSelec.length > 0 || funcaoSelec.length > 0) {
                dados.dados_colaborador = {}
                if(cargoUsuario) {
                    dados.dados_colaborador.cargo = cargoUsuario
                }
                if(fatorUsuario !== '') {
                    dados.dados_colaborador.fator_produtividade = fatorUsuario
                }
                if(equipeSelec.length > 0) {
                    dados.dados_colaborador.equipe = {
                        id: equipeSelec[0].codigo,
                        nome: equipeSelec[0].descricao
                    }
                }
                if(funcaoSelec.length > 0) {
                    dados.dados_colaborador.funcao = {
                        id: funcaoSelec[0].codigo,
                        nome: funcaoSelec[0].descricao
                    }
                }
            }
            ServicoUsuario
            .InsereUsuario(dadosLogin, dados)
            .then((resp) => {
                if(resp.erro) {
                    AlertaErro(resp.msgErro)
                } else {
                    AlertaSucesso('Usuário adicionado com sucesso!')
                }
            }).catch((err) => {
                AlertaErro(err)
            }).finally(() => {
                LimparTela()
                ListaUsuarios()
            })
        }
    }

    function IniciaEdicao(e) {
        let id = e.target.id ? e.target.id : e.target.parentElement.id
        if(id) {
            let dado = listaDadosUsuario.filter(v => v.valor._id === id)[0]
            setDadosParaAtualizar(dado.valor)
            setNomeUsuario(dado.valor.dados_pessoais && dado.valor.dados_pessoais.nome ? dado.valor.dados_pessoais.nome : '')
            setEmailUsuario(dado.valor.email)
            setFatorUsuario(dado.valor.dados_colaborador && dado.valor.dados_colaborador.fator_produtividade ? dado.valor.dados_colaborador.fator_produtividade : '')
            setCargoUsuario(dado.valor.dados_colaborador && dado.valor.dados_colaborador.cargo ? dado.valor.dados_colaborador.cargo : '')
            setSituacaoUsuario(dado.valor.situacao === 'ativo')
            setIgnorarSituacao(false)
            let equipe = []
            if(dado.valor.dados_colaborador && dado.valor.dados_colaborador.equipe) {
                equipe.push({
                    codigo: dado.valor.dados_colaborador.equipe.id,
                    descricao: dado.valor.dados_colaborador.equipe.nome
                })
            }
            setEquipeSelec(equipe)
            let funcao = []
            if(dado.valor.dados_colaborador && dado.valor.dados_colaborador.funcao) {
                funcao.push({
                    codigo: dado.valor.dados_colaborador.funcao.id,
                    descricao: dado.valor.dados_colaborador.funcao.nome
                })
            }
            setFuncaoSelec(funcao)
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
            className={`container-${props.usuariologin.acessibilidade.tema.titulo}`}>
            { loading ? <Loading /> : null }
            <Row>
                <Col>
                    <Stack>
                        <Form.Group>
                            <Form.Control
                                id='nomeusuario'
                                type='text' 
                                placeholder='Nome do usuário...'
                                className={`form-control-${props.usuariologin.acessibilidade.tema.titulo}`}
                                disabled={loading}
                                value={nomeUsuario}
                                onChange={(e) => setNomeUsuario(e.target.value)} />
                        </Form.Group>
                        <InputGroup>
                            <Form.Control
                                id='emailusuario'
                                type='email' 
                                placeholder='E-mail do usuário...'
                                className={`form-control-${props.usuariologin.acessibilidade.tema.titulo}`}
                                disabled={loading}
                                value={emailUsuario}
                                onChange={(e) => setEmailUsuario(e.target.value)} />
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text
                                className={`form-text-${props.usuariologin.acessibilidade.tema.titulo}`}>
                                Fator de Produtividade
                            </InputGroup.Text>
                            <Form.Control
                                id='fatorusuario'
                                type='number'
                                max={10}
                                min={0}
                                step={0.1}
                                className={`tamanho-input ms-auto form-control-${props.usuariologin.acessibilidade.tema.titulo}`}
                                disabled={loading}
                                value={fatorUsuario}                                
                                onChange={(e) => setFatorUsuario(+e.target.value)} />
                        </InputGroup>
                    </Stack>
                </Col>
                <Col>
                    <Stack>
                        <Form.Group>
                            <Row>
                                <Col md={6}>
                                    <Form.Control
                                        id=''
                                        type='text'
                                        placeholder='Cargo...'
                                        className={`form-control-${props.usuariologin.acessibilidade.tema.titulo}`}
                                        disabled={loading}
                                        value={cargoUsuario}
                                        onChange={(e) => setCargoUsuario(e.target.value)} />
                                </Col>
                                <Col>
                                    <Form.Check
                                        id={'situcao'}
                                        type='checkbox'
                                        label='Ativo'
                                        className={`form-check-${props.usuariologin.acessibilidade.tema.titulo}`}
                                        disabled={ignorarSituacao}
                                        checked={situacaoUsuario}
                                        onChange={(e) => setSituacaoUsuario(e.target.checked)} />
                                </Col>
                                <Col md={4}>
                                    <Form.Check
                                        id={'ignorarsitucao'}
                                        type='checkbox'
                                        label='Ignorar situação'
                                        className={`form-check-${props.usuariologin.acessibilidade.tema.titulo}`}
                                        checked={ignorarSituacao}
                                        disabled={loading}
                                        onChange={(e) => setIgnorarSituacao(e.target.checked)} />
                                </Col>
                            </Row>
                        </Form.Group>
                        <InputGroup>
                            <Form.Control
                                id='equipeusuario'
                                placeholder='Escolha a equipe...'
                                className={`form-control-${props.usuariologin.acessibilidade.tema.titulo}`}
                                disabled={true}
                                value={equipeUsuario} />
                            <Button 
                                id='botao-equipe'
                                variant={props.usuariologin.acessibilidade.tema.titulo}
                                disabled={loading}
                                onClick={(e) => AbreModalPesquisa(e.target.id)}>
                                Pesquisar
                            </Button>
                        </InputGroup>
                        <InputGroup>
                            <Form.Control
                                id='funcaousuario'
                                placeholder='Escolha a função...'
                                className={`form-control-${props.usuariologin.acessibilidade.tema.titulo}`}
                                disabled={true}
                                value={funcaoUsuario} />
                            <Button 
                                id='botao-funcao'
                                variant={props.usuariologin.acessibilidade.tema.titulo}
                                disabled={loading}
                                onClick={(e) => AbreModalPesquisa(e.target.id)}>
                                Pesquisar
                            </Button>
                        </InputGroup>
                    </Stack>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table
                        variant={props.usuariologin.acessibilidade.tema.titulo}>
                        <thead>
                            <tr>
                                <th>Usuário</th>
                                <th>E-mail</th>
                                <th>Cargo</th>
                                <th>Equipe</th>
                                <th>Função</th>
                                <th>Fator</th>
                                <th>Situação</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {linhasGridUsuario}
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
                            variant={props.usuariologin.acessibilidade.tema.titulo}
                            disabled={!permAcaoAdicionar || loading}
                            onClick={() => SalvarDados()}>
                            {dadosParaAtualizar && dadosParaAtualizar._id ? 'Atualizar' : 'Adicionar'}
                        </Button>
                        <Button 
                            variant={props.usuariologin.acessibilidade.tema.titulo}
                            disabled={!permAcaoLimpar || loading}
                            onClick={() => LimparTela()}>
                            Limpar
                        </Button>
                        <Button 
                            variant={props.usuariologin.acessibilidade.tema.titulo}
                            disabled={!permAcaoPesquisar || loading}
                            onClick={() => setClicouFiltrar(!clicouFiltrar)}>
                            Filtrar
                        </Button>
                    </Stack>
                </Col>
            </Row>

            {/* Modais */}
            <ModalPesquisa
                usuario={props.usuariologin}
                titulo={tituloModal}
                multiselecao={'false'}
                selecionados={tituloModal==='Equipes' ? equipeSelec : tituloModal==='Funções' ? funcaoSelec : []}
                show={mostrarModalPesquisa}
                onHide={(dadosSelecionados) => RetornaDadosModal(dadosSelecionados)} />

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
  
export default UsuarioCadastro