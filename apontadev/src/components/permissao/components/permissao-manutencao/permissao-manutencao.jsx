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
import { NodeMinus, NodePlus } from 'react-bootstrap-icons'
import ModalPesquisa from '../modal-pesquisa/modal-pesquisa'
import { ServicoPermissao } from '../../../../service/servico'

function PermissaoManutencao({usuariologin}) {
    const qtdLinhasPaginacao = 5

    const [tipoPermissao, setTipoPermissao] = useState('cadastrado')
    const [equipes, setEquipes] = useState('')
    const [equipesSelec, setEquipesSelec] = useState([])
    const [funcoes, setFuncoes] = useState('')
    const [funcoesSelec, setFuncoesSelec] = useState([])
    const [usuarios, setUsuarios] = useState('')
    const [usuariosSelec, setUsuariosSelec] = useState([])
    const [treeViewAplic, setTreeViewAplic] = useState([])
    const [treeViewSelec, setTreeViewSelect] = useState([])
    const [linhasPermissao, setLinhasPermissao] = useState([])
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [tituloModal, setTituloModal] = useState('')
    const [mostrarModalPesquisa, setMostrarModalPesquisa] = useState(false)

    useEffect(() => {
        ListaAplicacoes()
        ListaPermissoes()
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
        if(!(dados && dados.campo)) {
            return
        }
        switch(dados.campo) {
            case 'Equipes':
                setEquipesSelec([...dados.selecionados])
                break
            case 'Funções':
                setFuncoesSelec([...dados.selecionados])
                break
            case 'Usuários':
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
                    let nodesSelec = treeViewSelec.filter((v, i, o) => v.id === idAplicacao && v.func !== funcAplicacao)
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
        setLinhasPermissao([
            {
                tela: {
                    id: "643b283c61fe076c63e90fd2",
                    titulo: "Acessibilidade"
                },
                funcionalidade: {
                    todos: false,
                    selecionados: [
                        "Atualizar"
                    ]
                },
                equipe: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643beb15551eba732fe9fa85",
                            nome: "equipe a"
                        }
                    ]
                },
                funcao: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643b2ecbae2a74f36837528f",
                            nome: "analista de sistema"
                        }
                    ]
                },
                usuario: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643c872f603603dd580a9134",
                            nome: "João John"
                        }
                    ]
                },
                _id: "643bf920adef860752e13a9f",
                tipo: "cadastrado",
                acesso: "sim",
                __v: 0
            },
            {
                tela: {
                    id: "643b283c61fe076c63e90fd2",
                    titulo: "Acessibilidade"
                },
                funcionalidade: {
                    todos: false,
                    selecionados: [
                        "Pesquisar",
                        "Atualizar"
                    ]
                },
                equipe: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643beb26551eba732fe9fa88",
                            nome: "equipe b"
                        }
                    ]
                },
                funcao: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643b2ecbae2a74f36837528f",
                            nome: "analista de sistema"
                        }
                    ]
                },
                usuario: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643c87c6603603dd580a9138",
                            nome: "lucia lucy"
                        }
                    ]
                },
                _id: "643bf920adef860752e13a9f",
                tipo: "nao_cadastrado",
                acesso: "sim",
                __v: 0
            },
            {
                tela: {
                    id: "643b283c61fe076c63e90fd2",
                    titulo: "Acessibilidade"
                },
                funcionalidade: {
                    todos: true,
                    selecionados: []
                },
                equipe: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643beb26551eba732fe9fa88",
                            nome: "equipe b"
                        }
                    ]
                },
                funcao: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643b2ebbae2a74f36837528d",
                            nome: "analista de negócio"
                        }
                    ]
                },
                usuario: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643c87c6603603dd580a9138",
                            nome: "lucia lucy"
                        }
                    ]
                },
                _id: "643bf920adef860752e13a9f",
                tipo: "cadastrado",
                acesso: "sim",
                __v: 0
            },
            {
                tela: {
                    id: "643b2b1e61fe076c63e90fe8",
                    titulo: "Acompanhamento"
                },
                funcionalidade: {
                    todos: false,
                    selecionados: [
                        "Pesquisar"
                    ]
                },
                equipe: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643beb26551eba732fe9fa88",
                            nome: "equipe b"
                        }
                    ]
                },
                funcao: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643b2ebbae2a74f36837528d",
                            nome: "analista de negócio"
                        },
                        {
                            id: "643b2ecbae2a74f36837528f",
                            nome: "analista de sistema"
                        }
                    ]
                },
                usuario: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643c876e603603dd580a9136",
                            nome: "maria marie"
                        }
                    ]
                },
                _id: "643bf920adef860752e13a9f",
                tipo: "nao_cadastrado",
                acesso: "sim",
                __v: 0
            },
            {
                tela: {
                    id: "643b2a6a61fe076c63e90fe2",
                    titulo: "Agenda"
                },
                funcionalidade: {
                    todos: false,
                    selecionados: [
                        "Registrar apontamento",
                        "Compensação"
                    ]
                },
                equipe: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643beb26551eba732fe9fa88",
                            nome: "equipe b"
                        }
                    ]
                },
                funcao: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643b2ecbae2a74f36837528f",
                            nome: "analista de sistema"
                        }
                    ]
                },
                usuario: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643c872f603603dd580a9134",
                            nome: "João John"
                        }
                    ]
                },
                _id: "643bf920adef860752e13a9f",
                tipo: "nao_cadastrado",
                acesso: "sim",
                __v: 0
            },
            {
                tela: {
                    id: "643b2a6a61fe076c63e90fe2",
                    titulo: "Agenda"
                },
                funcionalidade: {
                    todos: true,
                    selecionados: []
                },
                equipe: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643beb26551eba732fe9fa88",
                            nome: "equipe b"
                        }
                    ]
                },
                funcao: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643b2ecbae2a74f36837528f",
                            nome: "analista de sistema"
                        }
                    ]
                },
                usuario: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643c872f603603dd580a9134",
                            nome: "João John"
                        }
                    ]
                },
                _id: "643bf920adef860752e13a9f",
                tipo: "nao_cadastrado",
                acesso: "sim",
                __v: 0
            },
            {
                tela: {
                    id: "643b2a6a61fe076c63e90fe2",
                    titulo: "Agenda"
                },
                funcionalidade: {
                    todos: false,
                    selecionados: [
                        "Alterar configurações",
                        "Pesquisar"
                    ]
                },
                equipe: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643beb26551eba732fe9fa88",
                            nome: "equipe b"
                        }
                    ]
                },
                funcao: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643b2ebbae2a74f36837528d",
                            nome: "analista de negócio"
                        },
                        {
                            id: "643b2ecbae2a74f36837528f",
                            nome: "analista de sistema"
                        }
                    ]
                },
                usuario: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643c876e603603dd580a9136",
                            nome: "maria marie"
                        }
                    ]
                },
                _id: "643bf920adef860752e13a9f",
                tipo: "cadastrado",
                acesso: "sim",
                __v: 0
            },
            {
                tela: {
                    id: "643be710f3736eef53953950",
                    titulo: "permissao"
                },
                funcionalidade: {
                    todos: false,
                    selecionados: [
                        "incluir",
                        "excluir",
                        "atualizar"
                    ]
                },
                equipe: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643beb26551eba732fe9fa88",
                            nome: "equipe b"
                        }
                    ]
                },
                funcao: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643b2ecbae2a74f36837528f",
                            nome: "analista de sistema"
                        }
                    ]
                },
                usuario: {
                    todos: false,
                    selecionados: [
                        {
                            id: "643c872f603603dd580a9134",
                            nome: "João John"
                        }
                    ]
                },
                _id: "643bf920adef860752e13a9f",
                tipo: "nao_cadastrado",
                acesso: "sim",
                __v: 0
            }
        ])
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
        if(tipoPermissao) {
            dadosFiltrados = dadosFiltrados.filter((v, i, o) => v.tipo === tipoPermissao)
        }
        if(equipesSelec && equipesSelec.length > 0) {
            dadosFiltrados = dadosFiltrados.filter((v, i, o) => {
                if(v.equipe.todos) {
                    return true
                }
                return ExisteUmElementoEmComum(v.equipe.selecionados, equipesSelec)
            })
        }
        if(funcoesSelec && funcoesSelec.length > 0) {
            dadosFiltrados = dadosFiltrados.filter((v, i, o) => {
                if(v.funcao.todos) {
                    return true
                }
                return ExisteUmElementoEmComum(v.funcao.selecionados, funcoesSelec)
            })
        }
        if(usuariosSelec && usuariosSelec.length > 0) {
            dadosFiltrados = dadosFiltrados.filter((v, i, o) => {
                if(v.usuario.todos) {
                    return true
                }
                return ExisteUmElementoEmComum(v.usuario.selecionados, usuariosSelec)
            })
        }
        if(treeViewSelec && treeViewSelec.length > 0) {
            dadosFiltrados = dadosFiltrados.filter((v, i, o) => {
                let existeAplicacao = treeViewSelec.findIndex((val, ind, obj) => val.id === v.tela.id) > -1
                if(!existeAplicacao) {
                    return false
                }
                if(v.funcionalidade.todos) {
                    return true
                }
                return ExisteUmaFuncionalidadeEmComum(v.funcionalidade.selecionados, treeViewSelec)
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
                        value={JSON.stringify(v)}
                        /*checked={v.marcado}*/
                        /*onChange={(e) => SelecionarLinha(e)}*/ />
                </td>
                <td>
                    {v.tela.titulo}
                </td>
                <td>
                    {
                        v.funcionalidade.todos ?
                        <Badge pill bg="success">Todas</Badge> :
                        v.funcionalidade.selecionados.map((vlr, ind, obj) => <Badge pill bg="success" key={'func'+ind}>{vlr}</Badge>)
                    }
                </td>
                <td>
                    {
                        v.equipe.todos ?
                        <Badge pill bg="success">Todas</Badge> :
                        v.equipe.selecionados.map((vlr, ind, obj) => <Badge pill bg="success" key={'equi'+ind}>{vlr.nome}</Badge>)
                    }
                </td>
                <td>
                    {
                        v.funcao.todos ?
                        <Badge pill bg="success">Todas</Badge> :
                        v.funcao.selecionados.map((vlr, ind, obj) => <Badge pill bg="success" key={'fcao'+ind}>{vlr.nome}</Badge>)
                    }
                </td>
                <td>
                    {
                        v.usuario.todos ?
                        <Badge pill bg="success">Todas</Badge> :
                        v.usuario.selecionados.map((vlr, ind, obj) => <Badge pill bg="success" key={'usu'+ind}>{vlr.nome}</Badge>)
                    }
                </td>
                <td>
                    <Badge pill bg={v.acesso==='sim'?'primary':'danger'}>{v.acesso}</Badge>
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

    return (
        <Container>
            <Row>
                <Col>
                    <Stack>
                        <Form.Select  
                            id='tipopermissao'
                            size='sm'
                            value={tipoPermissao}
                            onChange={(e) => ValidaCampoForm(e)} >
                            <option key='1001' value='cadastrado'>Permissão para usuários cadastrados</option>
                            <option key='1002' value='nao_cadastrado'>Permissão para usuários autônomos</option>
                        </Form.Select>
                        <InputGroup>
                            <Form.Control
                                id='equipes'
                                disabled={true}
                                placeholder="Escolha a equipe..."
                                value={equipes} />
                            <Button 
                                id="botao_equipes"
                                variant="outline-secondary"
                                onClick={(e) => AbreModalPesquisa(e.target.id)} >
                                Pesquisar
                            </Button>
                        </InputGroup>
                        <InputGroup>
                            <Form.Control
                                id='funcoes'
                                disabled={true}
                                placeholder="Escolha a função..."
                                value={funcoes} />
                            <Button 
                                id="botao_funcoes" 
                                variant="outline-secondary"
                                onClick={(e) => AbreModalPesquisa(e.target.id)} >
                                Pesquisar
                            </Button>
                        </InputGroup>
                        <InputGroup>
                            <Form.Control
                                id='usuarios'
                                disabled={true}
                                placeholder="Escolha o usuário..."
                                value={usuarios} />
                            <Button 
                                id="botao_usuarios" 
                                variant="outline-secondary"
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
                    <Table striped>
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
                        <Button variant="danger" onClick={() => console.log(treeViewSelec)}>Excluir</Button>
                        <Button variant="primary">Adicionar</Button>
                        <Button variant="light" onClick={() => console.log(treeViewAplic)}>Limpar</Button>
                    </Stack>
                </Col>
            </Row>

            {/* Modais */}
            <ModalPesquisa
                usuario={usuariologin}
                titulo={tituloModal}
                selecionados={ tituloModal==='Equipes' ? equipesSelec : tituloModal==='Funções' ? funcoesSelec : usuariosSelec }
                show={mostrarModalPesquisa}
                onHide={(dadosSelecionados) => RetornaDadosModal(dadosSelecionados)}
            />
        </Container>
    )
}
  
export default PermissaoManutencao