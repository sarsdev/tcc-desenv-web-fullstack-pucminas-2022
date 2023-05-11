import './permissao-manutencao.css'
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'
import Badge from 'react-bootstrap/Badge'
import Alert from 'react-bootstrap/Alert'
import { NodeMinus, NodePlus } from 'react-bootstrap-icons'
import ModalPesquisa from './../../../common/modal-pesquisa/modal-pesquisa'
import Loading from '../../../common/loading/loading'
import { ServicoPermissao } from './../../../../service/servico'

function PermissaoManutencao({usuariologin}) {
    const qtdLinhasPaginacao = 5

    const [tipoPermissao, setTipoPermissao] = useState('cadastrado')
    const [permiteAcesso, setPermiteAcesso] = useState(true)
    const [equipes, setEquipes] = useState('')
    const [equipesSelec, setEquipesSelec] = useState([])
    const [todasEquipes, setTodasEquipes] = useState(false)
    const [funcoes, setFuncoes] = useState('')
    const [funcoesSelec, setFuncoesSelec] = useState([])
    const [todasFuncoes, setTodasFuncoes] = useState(false)
    const [usuarios, setUsuarios] = useState('')
    const [usuariosSelec, setUsuariosSelec] = useState([])
    const [todosUsuarios, setTodosUsuarios] = useState(false)
    const [treeViewAplic, setTreeViewAplic] = useState([])
    const [treeViewSelec, setTreeViewSelect] = useState([])
    const [linhasPermissao, setLinhasPermissao] = useState([])
    const [linhasMarcadas, setLinhasMarcadas] = useState([])
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [tituloModal, setTituloModal] = useState('')
    const [mostrarModalPesquisa, setMostrarModalPesquisa] = useState(false)
    const [loading, setLoading] = useState(false)
    const [mostrarAlerta, setMostrarAlerta] = useState(false)
    const [tipoAlerta, setTipoAlerta] = useState('')
    const [msgAlerta, setMsgAlerta] = useState('')

    useEffect(() => {        
        ListaAplicacoes()        
    }, [])

    useEffect(() => {
        if(equipesSelec.length === 1) {
            setEquipes(equipesSelec[0].descricao)
        } else if(equipesSelec.length >= 1) {
            setEquipes(equipesSelec[0].descricao + ' ... (+' + (equipesSelec.length-1) + ')')
        } else {
            setEquipes('')
        }
    }, [equipesSelec])

    useEffect(() => {
        if(funcoesSelec.length === 1) {
            setFuncoes(funcoesSelec[0].descricao)
        } else if(funcoesSelec.length >= 1) {
            setFuncoes(funcoesSelec[0].descricao + ' ... (+' + (funcoesSelec.length-1) + ')')
        } else {
            setFuncoes('')
        }      
    }, [funcoesSelec])

    useEffect(() => {
        if(usuariosSelec.length === 1) {
            setUsuarios(usuariosSelec[0].descricao)
        } else if(usuariosSelec.length >= 1) {
            setUsuarios(usuariosSelec[0].descricao + ' ... (+' + (usuariosSelec.length-1) + ')')
        } else {
            setUsuarios('')
        }     
    }, [usuariosSelec])

    function ListaAplicacoes() {
        AtivaInativaLoading(true)
        let dadosLogin = {
            usuario: usuariologin.email,
            senha: usuariologin.dados_acesso.senha
        }
        ServicoPermissao
        .RetornaListaAplicacoes(dadosLogin)
        .then((resp) => {
            if(resp.erro) {
                console.error(resp.msgErro)
                setTreeViewAplic([])
            } else {
                let dados = resp.dados.map((v) => { return { noAberto: false, valor: v } })
                let dadosOrdenados = dados.sort(function(a, b) {
                    if(a.valor.titulo < b.valor.titulo) return -1
                    if(a.valor.titulo > b.valor.titulo) return 1
                    return 0
                })
                setTreeViewAplic(dadosOrdenados)
            }
        }).catch((err) => {
            console.error(err)
            setTreeViewAplic([])
        }).finally(() => {            
            ListaPermissoes()
        })
    }

    function AbreModalPesquisa(pesquisarPor) {
        switch (pesquisarPor) {
            case 'botao_equipes':
                setTituloModal('Equipes')
                setMostrarModalPesquisa(!mostrarModalPesquisa)
                break
            case 'botao_funcoes':
                setTituloModal('Funções')
                setMostrarModalPesquisa(!mostrarModalPesquisa)
                break
            case 'botao_usuarios':
                setTituloModal('Usuários')
                setMostrarModalPesquisa(!mostrarModalPesquisa)
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
                setTodasEquipes(dados.todos)
                setEquipesSelec([...dados.selecionados])
                break
            case 'Funções':
                setTodasFuncoes(dados.todos)
                setFuncoesSelec([...dados.selecionados])
                break
            case 'Usuários':
                setTodosUsuarios(dados.todos)
                setUsuariosSelec([...dados.selecionados])
                break
            default:
                break
        }
    }

    function ValidaCampoForm(e) {
        const campo = e.target.id
        const valor = campo==='tipopermissao' ? e.target.selectedOptions[0].value : e.target.checked
        Validacao(campo, valor)
    }

    function Validacao(campo, valor) {
        switch(campo) {
            case 'tipopermissao':
                setTipoPermissao(valor)
                break
            case 'modoatalho':
                break
            case 'tema':
                break
            default:
                break
        }        
    }

    function CarregaTreeView(dados) {
        if(!dados) {
            return
        }
        return dados.map((v, i, o) => {
            return (
                <div 
                    key={'top'+v.valor._id} >
                    <Stack
                        key={'stck'+v.valor._id} 
                        direction='horizontal' 
                        className='treeViewCheckAplic'>
                        <div
                            key={'divIcon'+v.valor._id} 
                            onClick={(e) => AbreFechaNodesTreeView(e)} >
                            <NodePlus
                                id={'plus_'+v.valor._id}
                                key={'plus'+v.valor._id}
                                display={v.noAberto ? 'none' : 'block'}                            
                                visibility={v.valor.funcionalidades && v.valor.funcionalidades.length > 0 ? 'visible': 'hidden'}
                                size={20} />
                            <NodeMinus
                                id={'minus_'+v.valor._id}
                                key={'minus'+v.valor._id}
                                display={v.noAberto ? 'block' : 'none'}
                                visibility={v.valor.funcionalidades && v.valor.funcionalidades.length > 0 ? 'visible': 'hidden'}
                                size={20} />                            
                        </div>
                        <Form.Check 
                            id={'chk_'+v.valor._id}
                            key={'chk'+v.valor._id}
                            type='checkbox'
                            className={`form-check-${usuariologin.acessibilidade.tema.titulo}`}
                            label={v.valor.titulo}
                            checked={CheckPaiMarcado(v.valor)}
                            onChange={(e) => SelecionaNodesTreeView(e)} />
                    </Stack>
                    {
                        (v.valor.funcionalidades && v.valor.funcionalidades.length > 0) ?
                        <div
                            key={'div'+v.valor._id}
                            hidden={!v.noAberto}
                            className='treeViewCheckFunc'> {
                            v.valor.funcionalidades.map((val, ind, obj) =>                           
                                <Form.Check
                                    id={'func_'+v.valor._id+'_'+val}
                                    key={'func'+v.valor._id+val}
                                    type='checkbox'
                                    className={`form-check-${usuariologin.acessibilidade.tema.titulo}`}
                                    label={val}
                                    checked={treeViewSelec.find((vlr, i, o) => vlr.id === v.valor._id && vlr.func === val) ? true : false}
                                    onChange={(e) => SelecionaNodesTreeView(e)} />
                            ) 
                        } </div> :
                        null
                    }
                </div>
            )
        })
    }

    function AbreFechaNodesTreeView(e) {
        let operacao = e.target.id.split('_')[0]
        if(operacao) {
            let idAplicacao = e.target.id.split('_')[1]
            let indiceAplic = treeViewAplic.findIndex((v, i, o) => v.valor._id === idAplicacao)
            treeViewAplic[indiceAplic].noAberto = operacao === 'plus'
            setTreeViewAplic([...treeViewAplic])
        }
    }

    function SelecionaNodesTreeView(e) {
        let tipoCheck = e.target.id.split('_')[0]
        if(tipoCheck) {
            let indMarcado = e.target.checked
            let idAplicacao = e.target.id.split('_')[1]

            if(tipoCheck==='chk') {
                if(indMarcado) {
                    let checkPai = treeViewAplic.filter((v, i, o) => v.valor._id === idAplicacao)[0]
                    if(!(checkPai.valor && checkPai.valor.funcionalidades)) {
                        return
                    }
                    checkPai.valor.funcionalidades.forEach((v, i, o) => treeViewSelec.push({ id: idAplicacao, func: v, obj: checkPai.valor }))
                    setTreeViewSelect([...treeViewSelec])
                } else {
                    let nodesSelec = treeViewSelec.filter((v, i, o) => v.id !== idAplicacao)
                    setTreeViewSelect([...nodesSelec])
                }
            }

            if(tipoCheck==='func') {
                let funcAplicacao = e.target.id.split('_')[2]
                if(indMarcado) {
                    let checkPai = treeViewAplic.filter((v, i, o) => v.valor._id === idAplicacao)[0]
                    treeViewSelec.push({ id: idAplicacao, func: funcAplicacao, obj: checkPai.valor })
                    setTreeViewSelect([...treeViewSelec])
                } else {
                    let nodesSelec = treeViewSelec.filter(function(v) {
                        if(v.id === idAplicacao && v.func === funcAplicacao) {
                            return false
                        }
                        return true
                    })
                    setTreeViewSelect([...nodesSelec])
                }
            }
        }
    }

    function CheckPaiMarcado(valor) {
        if(valor && valor.funcionalidades && valor.funcionalidades.length > 0) {
            for (let index = 0; index < valor.funcionalidades.length; index++) {
                let funcionalidade = valor.funcionalidades[index]
                if(treeViewSelec.find((v, i, o) => v.id === valor._id && v.func === funcionalidade)) {
                    return true
                }
            }
        }        
        return false
    }

    function ListaPermissoes() {
        let dadosLogin = {
            usuario: usuariologin.email,
            senha: usuariologin.dados_acesso.senha
        }
        ServicoPermissao
        .RetornaListaPermissoes(dadosLogin)
        .then((resp) => {
            if(resp.erro) {
                console.error(resp.msgErro)
                setLinhasPermissao([])
            } else {
                let dados = resp.dados.map((v) => { return { marcado: false, valor: v } })
                setLinhasPermissao(dados)
            }
        }).catch((err) => {
            console.error(err)
            setLinhasPermissao([])
        }).finally(() => {
            AtivaInativaLoading(false)
        })
    }

    function ExisteUmElementoEmComum(a, b) {
        let temElementoEmComum = false
        a.forEach((v, i, o) => {
            b.forEach((val, ind, obj) => {
                if(v.id === val.codigo) {
                    temElementoEmComum = true
                    return
                }
            })
            if(temElementoEmComum) return
        })
        return temElementoEmComum
    }

    function ExisteUmaFuncionalidadeEmComum(a, b) {
        let temFuncionalidadeEmComum = false
        a.forEach((v, i, o) => {
            b.forEach((val, ind, obj) => {
                if(v === val.func) {
                    temFuncionalidadeEmComum = true
                    return
                }
            })
            if(temFuncionalidadeEmComum) return
        })
        return temFuncionalidadeEmComum
    }

    function MontaLinhasTabelaPermissao(dados) {
        let dadosFiltrados = dados
        let opcaoAcesso = permiteAcesso ? 'sim' : 'nao'
        dadosFiltrados = dadosFiltrados.filter((v, i, o) => v.valor.acesso === opcaoAcesso)
        if(tipoPermissao) {
            dadosFiltrados = dadosFiltrados.filter((v, i, o) => v.valor.tipo === tipoPermissao)
        }
        if(equipesSelec && equipesSelec.length > 0) {
            dadosFiltrados = dadosFiltrados.filter((v, i, o) => {
                if(v.valor.equipe.todos) {
                    return true
                }
                return ExisteUmElementoEmComum(v.valor.equipe.selecionados, equipesSelec)
            })
        }
        if(funcoesSelec && funcoesSelec.length > 0) {
            dadosFiltrados = dadosFiltrados.filter((v, i, o) => {
                if(v.valor.funcao.todos) {
                    return true
                }
                return ExisteUmElementoEmComum(v.valor.funcao.selecionados, funcoesSelec)
            })
        }
        if(usuariosSelec && usuariosSelec.length > 0) {
            dadosFiltrados = dadosFiltrados.filter((v, i, o) => {
                if(v.valor.usuario.todos) {
                    return true
                }
                return ExisteUmElementoEmComum(v.valor.usuario.selecionados, usuariosSelec)
            })
        }
        if(treeViewSelec && treeViewSelec.length > 0) {
            dadosFiltrados = dadosFiltrados.filter((v, i, o) => {
                let existeAplicacao = treeViewSelec.findIndex((val, ind, obj) => val.id === v.valor.tela.id) > -1
                if(!existeAplicacao) {
                    return false
                }
                if(v.valor.funcionalidade.todos) {
                    return true
                }
                return ExisteUmaFuncionalidadeEmComum(v.valor.funcionalidade.selecionados, treeViewSelec)
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
        return dadosFiltrados.map((v, i, o) =>             
        <tr key={i}>
                <td>
                    <Form.Check
                        id={'check'+i}
                        type='checkbox'
                        label=''
                        className={`form-check-${usuariologin.acessibilidade.tema.titulo}`}
                        value={v.valor._id}
                        checked={v.marcado}
                        onChange={(e) => SelecionarLinha(e)} />
                </td>
                <td>
                    {v.valor.tela.titulo}
                </td>
                <td>
                    {
                        v.valor.funcionalidade.todos ?
                        <Badge pill className={`badge-${usuariologin.acessibilidade.tema.titulo}`}>Todas</Badge> :
                        v.valor.funcionalidade.selecionados.map((vlr, ind, obj) => <Badge pill className={`badge-${usuariologin.acessibilidade.tema.titulo}`} key={'func'+ind}>{vlr}</Badge>)
                    }
                </td>
                <td>
                    {
                        v.valor.equipe.todos ?
                        <Badge pill className={`badge-${usuariologin.acessibilidade.tema.titulo}`}>Todas</Badge> :
                        v.valor.equipe.selecionados.map((vlr, ind, obj) => <Badge pill className={`badge-${usuariologin.acessibilidade.tema.titulo}`} key={'equi'+ind}>{vlr.nome}</Badge>)
                    }
                </td>
                <td>
                    {
                        v.valor.funcao.todos ?
                        <Badge pill className={`badge-${usuariologin.acessibilidade.tema.titulo}`}>Todas</Badge> :
                        v.valor.funcao.selecionados.map((vlr, ind, obj) => <Badge pill className={`badge-${usuariologin.acessibilidade.tema.titulo}`} key={'fcao'+ind}>{vlr.nome}</Badge>)
                    }
                </td>
                <td>
                    {
                        v.valor.usuario.todos ?
                        <Badge pill className={`badge-${usuariologin.acessibilidade.tema.titulo}`}>Todas</Badge> :
                        v.valor.usuario.selecionados.map((vlr, ind, obj) => <Badge pill className={`badge-${usuariologin.acessibilidade.tema.titulo}`} key={'usu'+ind}>{vlr.nome}</Badge>)
                    }
                </td>
                <td>
                    <Badge pill className={`badge-${usuariologin.acessibilidade.tema.titulo}`}>{v.valor.acesso}</Badge>
                </td>
            </tr>)
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
                                                    className={paginaAtual===v ? `pagDestaque-${usuariologin.acessibilidade.tema.titulo}` : `pag-${usuariologin.acessibilidade.tema.titulo}`}
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

    function LimparFiltros() {
        setTipoPermissao('cadastrado')
        setEquipes('')
        setEquipesSelec([])
        setFuncoes('')
        setFuncoesSelec([])
        setUsuarios('')
        setUsuariosSelec([])
        setTreeViewSelect([])        
    }

    function SalvarPermissao() {
        AtivaInativaLoading(true)
        let dadosLogin = {
            usuario: usuariologin.email,
            senha: usuariologin.dados_acesso.senha
        }
        let dados = MontaDadosParaInclusao()
        let qtdExecucoes = dados.length
        let qtdFinalizada = 0
        let msgErro = ''
        dados.forEach(valor => {
            ServicoPermissao
            .AdicionarPermissao(dadosLogin, valor)
            .then((resp) => {
                if(resp.erro) {
                    msgErro = resp.msgErro
                }
            }).catch((err) => {
                msgErro = err
            }).finally(() => {
                qtdFinalizada += 1
                if(qtdExecucoes === qtdFinalizada) {
                    ListaPermissoes()
                    if(msgErro !== '') {
                        AlertaErro(msgErro)
                    } else {
                        AlertaSucesso('Permissões adicionadas com sucesso!')
                    }
                }
            })
        })        
    }

    function MontaDadosParaInclusao() {
        let listaPermissao = []
        let aplicacao = [...new Set(treeViewSelec.map(item => item.obj))]
        
        if(!(aplicacao && aplicacao.length > 0)) {
            console.error('Selecione ao menos uma aplicação!')
            return listaPermissao 
        }
        if(!(equipesSelec && equipesSelec.length > 0)) {
            console.error('Selecione ao menos uma equipe!')
            return listaPermissao
        }
        if(!(funcoesSelec && funcoesSelec.length > 0)) {
            console.error('Selecione ao menos uma função!')
            return listaPermissao
        }
        if(!(usuariosSelec && usuariosSelec.length > 0)) {
            console.error('Selecione ao menos um usuário!')
            return listaPermissao
        }

        aplicacao.forEach(app => {
            let funcSelecionadas = treeViewSelec
                .filter(i => i.id === app._id)
                .map(i => i.func)
            let dadosPermissao = {
                tela: {
                    id: app._id,
                    titulo: app.titulo
                },
                funcionalidade: {
                    todos: (funcSelecionadas.length === app.funcionalidades.length),
                    selecionados: (funcSelecionadas.length === app.funcionalidades.length) ? [] : funcSelecionadas
                },
                equipe: {
                    todos: todasEquipes,
                    selecionados: todasEquipes ? [] : equipesSelec.map(i => { return { id: i.codigo, nome: i.descricao } })
                },
                funcao: {
                    todos: todasFuncoes,
                    selecionados: todasFuncoes ? [] : funcoesSelec.map(i => { return { id: i.codigo, nome: i.descricao } })
                },
                usuario: {
                    todos: todosUsuarios,
                    selecionados: todosUsuarios ? [] : usuariosSelec.map(i => { return { id: i.codigo, nome: i.descricao } })
                },
                tipo: tipoPermissao,
                acesso: permiteAcesso ? 'sim' : 'nao'
            }
            listaPermissao.push(dadosPermissao)
        })
        return listaPermissao
    }

    function RemoverPermissao() {
        AtivaInativaLoading(true)
        let dadosLogin = {
            usuario: usuariologin.email,
            senha: usuariologin.dados_acesso.senha
        }
        let dados = linhasPermissao.filter(item => item.marcado)
        let qtdExecucoes = dados.length
        let qtdFinalizada = 0
        let msgErro = ''
        dados.forEach(i => {
            ServicoPermissao
            .RemoverPermissao(dadosLogin, i.valor._id)
            .then((resp) => {
                if(resp.erro) {
                    msgErro = resp.msgErro
                }
            }).catch((err) => {
                msgErro = err
            }).finally(() => {
                qtdFinalizada += 1
                if(qtdExecucoes === qtdFinalizada) {
                    ListaPermissoes()
                    if(msgErro !== '') {
                        AlertaErro(msgErro)
                    } else {
                        AlertaSucesso('Permissões removidas com sucesso!')
                    }
                }
            })
        })
    }

    function SelecionarLinha(e) {
        let id = e.target.value
        if(e.target.checked) {
            linhasMarcadas.push(id)
            setLinhasMarcadas(linhasMarcadas)
        } else {
            let linhas = linhasMarcadas.filter(v => v !== id)
            setLinhasMarcadas(linhas)
        }
        let indiceDado = linhasPermissao.findIndex(v => v.valor._id === id)
        linhasPermissao[indiceDado].marcado = e.target.checked
        setLinhasPermissao([...linhasPermissao])
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
            className={`container-${usuariologin.acessibilidade.tema.titulo}`}>
            { loading ? <Loading /> : null }
            <Row>
                <Col>
                    <Stack>
                        <Stack direction="horizontal"  gap={4}>
                            <Form.Select  
                                id='tipopermissao'
                                size='sm'                                
                                className={`form-select-${usuariologin.acessibilidade.tema.titulo}`}
                                disabled={loading}
                                value={tipoPermissao}
                                onChange={(e) => ValidaCampoForm(e)} >
                                <option key='1001' value='cadastrado'>Permissão para usuários cadastrados</option>
                                <option key='1002' value='nao_cadastrado'>Permissão para usuários autônomos</option>
                            </Form.Select>
                            <Form.Check
                                id={'permiteacesso'}
                                type='checkbox'
                                label='Permitir_acesso'
                                className={`form-check-${usuariologin.acessibilidade.tema.titulo}`}
                                disabled={loading}
                                checked={permiteAcesso}
                                onChange={(e) => setPermiteAcesso(e.target.checked)} />
                        </Stack>
                        <InputGroup>
                            <Form.Control
                                id='equipes'
                                className={`form-control-${usuariologin.acessibilidade.tema.titulo}`}
                                disabled={true}
                                placeholder="Escolha a equipe..."
                                value={equipes} />
                            <Button 
                                id="botao_equipes"
                                variant={usuariologin.acessibilidade.tema.titulo}
                                disabled={loading}
                                onClick={(e) => AbreModalPesquisa(e.target.id)} >
                                Pesquisar
                            </Button>
                        </InputGroup>
                        <InputGroup>
                            <Form.Control
                                id='funcoes'
                                className={`form-control-${usuariologin.acessibilidade.tema.titulo}`}
                                disabled={true}
                                placeholder="Escolha a função..."
                                value={funcoes} />
                            <Button 
                                id="botao_funcoes" 
                                variant={usuariologin.acessibilidade.tema.titulo}
                                disabled={loading}
                                onClick={(e) => AbreModalPesquisa(e.target.id)} >
                                Pesquisar
                            </Button>
                        </InputGroup>
                        <InputGroup>
                            <Form.Control
                                id='usuarios'
                                className={`form-control-${usuariologin.acessibilidade.tema.titulo}`}
                                disabled={true}
                                placeholder="Escolha o usuário..."
                                value={usuarios} />
                            <Button 
                                id="botao_usuarios" 
                                variant={usuariologin.acessibilidade.tema.titulo}
                                disabled={loading}
                                onClick={(e) => AbreModalPesquisa(e.target.id)} >
                                Pesquisar
                            </Button>
                        </InputGroup>
                    </Stack>
                </Col>
                <Col>
                    <div className='treeViewCheck'>
                        {CarregaTreeView(treeViewAplic)}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table 
                        variant={usuariologin.acessibilidade.tema.titulo}>
                        <thead>
                            <tr>
                                <th>*</th>
                                <th>Tela</th>
                                <th>Funcionalidade</th>
                                <th>Equipe</th>
                                <th>Função</th>
                                <th>Usuário</th>
                                <th>Acesso</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MontaLinhasTabelaPermissao(linhasPermissao)}
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
                            variant={usuariologin.acessibilidade.tema.titulo}
                            disabled={loading}
                            onClick={() => RemoverPermissao()}>
                            Excluir
                        </Button>
                        <Button 
                            variant={usuariologin.acessibilidade.tema.titulo}
                            disabled={loading}
                            onClick={() => SalvarPermissao()}>
                            Adicionar
                        </Button>
                        <Button 
                            variant={usuariologin.acessibilidade.tema.titulo}
                            disabled={loading}
                            onClick={() => LimparFiltros()}>
                            Limpar
                        </Button>
                    </Stack>
                </Col>
            </Row>

            {/* Modais */}
            <ModalPesquisa
                usuario={usuariologin}
                titulo={tituloModal}
                multiselecao={'true'}
                selecionados={tituloModal==='Equipes' ? equipesSelec : tituloModal==='Funções' ? funcoesSelec : usuariosSelec}
                show={mostrarModalPesquisa}
                onHide={(dadosSelecionados) => RetornaDadosModal(dadosSelecionados)}
            />

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
  
export default PermissaoManutencao