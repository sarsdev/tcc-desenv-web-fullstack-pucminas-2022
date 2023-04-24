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
    const [tipoPermissao, setTipoPermissao] = useState('cadastrado')
    const [equipes, setEquipes] = useState('')
    const [equipesSelec, setEquipesSelec] = useState([])
    const [funcoes, setFuncoes] = useState('')
    const [funcoesSelec, setFuncoesSelec] = useState([])
    const [usuarios, setUsuarios] = useState('')
    const [usuariosSelec, setUsuariosSelec] = useState([])
    const [treeViewAplic, setTreeViewAplic] = useState([])
    const [treeViewSelec, setTreeViewSelect] = useState([])
    const [tituloModal, setTituloModal] = useState('')
    const [mostrarModalPesquisa, setMostrarModalPesquisa] = useState(false)

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
        console.log('AbreFechaNodesTreeView', e)
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
                    console.log('Desmarcar', treeViewSelec, nodesSelec, idAplicacao, funcAplicacao)
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
                            <tr>
                                <td>Permissão</td>
                                <td>
                                    <Badge pill bg="success">Todas</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="success">Todas</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="success">Coordenador</Badge>
                                    <Badge pill bg="success">Desenvolvedor</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="success">Todos</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="primary">Sim</Badge>
                                </td>
                            </tr>
                            <tr>
                                <td>Agenda</td>
                                <td>
                                    <Badge pill bg="success">Incluir</Badge>
                                    <Badge pill bg="success">remover</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="success">Todas</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="success">Analista</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="success">Todos</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="danger">Não</Badge>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Pagination className='d-flex justify-content-center'>
                        <Pagination.First />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Last />
                    </Pagination>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Stack direction="horizontal" className='d-flex flex-row-reverse' gap={2}>
                        <Button variant="danger" onClick={() => console.log(treeViewSelec)}>Excluir</Button>
                        <Button variant="light" onClick={() => console.log(treeViewAplic)}>Limpar</Button>
                        <Button variant="primary">Adicionar</Button>
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