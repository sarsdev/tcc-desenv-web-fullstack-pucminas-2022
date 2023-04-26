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
import MenuPrincipal from './../common/menu-principal/menu-principal'
import NavBarTela from './../common/navbar-tela/navbar-tela'

function Funcao(props) {
    const navigate = useNavigate()
    const [nomeUsuario, setNomeUsuario] = useState('')
    //const [usuario, ] = useState(() => JSON.parse(sessionStorage.getItem('usuariologin')))

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
        } else {
            navigate('/app/acesso')
        }
    }, []);

    const AbaClicada = function (evento) {
        console.log(evento.target.id)
    }

    function MontaLinhasTabelaPermissao() {
        let dadosFiltrados = [
            {
                marcado: true,
                valor: {
                    _id: "643b2ebbae2a74f36837528d",
                    nome: "analista de negócio",
                    fator_produtividade_esperado: 0.95,
                    percentual_estimativa_esperado: 20,
                    situacao: "inativo"
                }
            },
            {
                marcado: false,
                valor: {
                    _id: "643b2ecbae2a74f36837528f",
                    nome: "analista de sistema",
                    fator_produtividade_esperado: 1,
                    percentual_estimativa_esperado: 20,
                    situacao: "ativo"
                }
            },
        ]
        /*let opcaoAcesso = permiteAcesso ? 'sim' : 'nao'
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
        }*/            
        return dadosFiltrados.map((v, i, o) =>             
        <tr key={i}>
                <td>
                    <Form.Check
                        id={'check'+i}
                        type='checkbox'
                        label=''
                        value={v.valor._id}
                        /*checked={v.marcado}*/
                        /*onChange={(e) => SelecionarLinha(e)}*/ />
                </td>
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
            </tr>)
    }

    function MontaPaginacaoTabela() {
        /*if(totalPaginas >= 1 && totalPaginas <= 3) {
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
        }*/
        return <Pagination.Item>{0}</Pagination.Item>
    }

    return (
        <Container>
            <MenuPrincipal usuario={nomeUsuario} />
            <NavBarTela 
                abas={abasFuncao}
                abaInicial={abaComFocoInicial}
                eventoAbaAlterada={AbaClicada} />
            <Row>
                <Col>
                    <Form.Control 
                        type="text" 
                        placeholder="Nome da função..." />
                </Col>
                <Col>
                    <Stack className="mx-auto">
                        <h3 className={1===1 ? 'statusAtivo mx-auto' : 'statusInativo'}>{1===1 ? 'Função Ativa' : 'Função Inativa'}</h3>
                    </Stack>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Stack direction='horizontal' gap={2}>
                        <Form.Label>Fator para simulação</Form.Label>
                        <Form.Control 
                            type="number"
                            className='tamanho-input ms-auto' />
                    </Stack>
                </Col>
                <Col>
                    <Stack direction='horizontal' gap={2}>
                        <Form.Label>% sobre estimativa</Form.Label>
                        <Form.Control 
                            type="number"
                            className='tamanho-input ms-auto' />
                    </Stack>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>*</th>
                                <th>Função</th>
                                <th>Fator</th>
                                <th>% Estimativa</th>
                                <th>Situação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MontaLinhasTabelaPermissao()}
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
                        <Button variant="danger" onClick={() => console.log('Inativar')}>Inativar</Button>
                        <Button variant="primary" onClick={() => console.log('Adicionar')}>Adicionar</Button>
                        <Button variant="light" onClick={() => console.log('Limpar')}>Limpar</Button>
                    </Stack>
                </Col>
            </Row>
        </Container>
    )
}
  
export default Funcao