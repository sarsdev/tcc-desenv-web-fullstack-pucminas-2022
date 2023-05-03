import './acessibilidade-manutencao.css'
import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { ServicoAcessibilidade } from './../../../service/servico'

function AcessibilidadeManutencao({usuariologin}) {
    const [listaTemas, setListaTemas] = useState([])
    const [configAtual, setConfigAtual] = useState({})
    const [modoLeitura, setModoLeitura] = useState(false)
    const [modoAtalho, setModoAtalho] = useState(false)
    const [tema, setTema] = useState('Dia')

    useEffect(() => {
        CarregaTemas()
        .then(() => {
            CarregaDadosAcessibilidade()
            .then((retorno) => {
                setConfigAtual(retorno.config)
                setModoLeitura(retorno.modo_leitura)
                setModoAtalho(retorno.modo_atalho_unico)
                setTema(retorno.tema)
            }).catch((err) => {
                console.error(err)
            })
        }).catch((err) => {
            console.error(err)
        })
      }, []);
    
    async function CarregaTemas() {
        try {
            let retorno = await ServicoAcessibilidade.RetornaListaTemas({
                usuario: usuariologin.email,
                senha: usuariologin.dados_acesso.senha
            })
            if(retorno.erro) {
                throw new Error(retorno.msgErro)
            } else {
                setListaTemas(retorno.dados)
            }
        } catch (err) {
            setListaTemas([])
            throw new Error(err)
        }    
    }

    async function CarregaDadosAcessibilidade() {
        try {
            let retorno = await ServicoAcessibilidade.RetornaPadraoAcessibilidade({
                usuario: usuariologin.email,
                senha: usuariologin.dados_acesso.senha
            })
            if(retorno.erro) {
                console.error(retorno.msgErro)
                return {
                    modo_leitura: false,
                    modo_atalho_unico: false,
                    tema: 'Dia',
                    config: {}
                }
            } else {
                return {
                    modo_leitura: retorno.dados.modo_leitura,
                    modo_atalho_unico: retorno.dados.modo_atalho_unico,
                    tema: retorno.dados.tema.titulo,
                    config: retorno.dados
                }
            }
        } catch (err) {
            console.error(err)
            throw err
        }   
    }

    async function AtualizaPadraoAcessibilidade() {
        try {        
            let retorno = await ServicoAcessibilidade.AtualizaPadrao({
                usuario: usuariologin.email,
                senha: usuariologin.dados_acesso.senha
            }, configAtual)
            return retorno  
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async function InserePadraoAcessibilidade() {
        try {
            let temaSelecionado = listaTemas.find((valor, indice, obj) => valor.titulo === tema)
            let padrao = {
                modo_leitura: modoLeitura,
                modo_atalho_unico: modoAtalho,
                usuario: {
                    id: usuariologin._id,
                    email: usuariologin.email
                },
                tema: {
                    id: temaSelecionado._id,
                    titulo: temaSelecionado.titulo
                }
            }
            console.log('InserePadraoAcessibilidade', padrao)
            let retorno = await ServicoAcessibilidade.InserePadrao({
                usuario: usuariologin.email,
                senha: usuariologin.dados_acesso.senha
            }, padrao)
            if(retorno.erro) {
                return retorno
            } else {
                setConfigAtual(retorno.dados)
                return retorno
            }  
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    function SalvarPadrao() {
        console.info(configAtual, modoLeitura, modoAtalho, tema, 'SalvarPadrao')
        if(configAtual && configAtual._id) {
            AtualizaPadraoAcessibilidade()
            .then((resp) => {
                if(resp.erro) {
                    console.log(resp.msgErro)
                } else {
                    console.log('Dados atualizados com sucesso!')
                }
            })
        } else {
            console.info('InserePadraoAcessibilidade')
            InserePadraoAcessibilidade()
            .then((resp) => {
                if(resp.erro) {
                    console.log(resp.msgErro)
                } else {
                    console.log('Dados inseridos com sucesso!')
                }
            })
        }
    }

    function ListaTemasCombo(temas) {
        return temas.map((tema) => <option key={tema._id}>{tema.titulo}</option>)
    }

    function ValidaCampoForm(e) {       
        const campo = e.target.id
        const valor = campo==='tema' ? e.target.selectedOptions[0].text : e.target.checked
        Validacao(campo, valor)
    }

    function Validacao(campo, valor) {
        switch(campo) {
            case 'modoleitura':
                setModoLeitura(valor)
                if(configAtual._id) {
                    configAtual.modo_leitura = valor
                    setConfigAtual(configAtual)
                }
                break
            case 'modoatalho':
                setModoAtalho(valor)
                if(configAtual._id) {
                    configAtual.modo_atalho_unico = valor
                    setConfigAtual(configAtual)
                }
                break
            case 'tema':
                setTema(valor)
                if(configAtual._id) {
                    let itemTema = listaTemas.find((v, i, o) => v.titulo === valor)
                    configAtual.tema.id = itemTema._id
                    configAtual.tema.titulo = itemTema.titulo
                    setConfigAtual(configAtual)
                }
                break
            default:
                break
        }        
    }

    return (
        <Container>
            <Row className='linha'>
                <Col>
                    <Card className='cartoes'>
                        <Card.Header>Ajuste visual</Card.Header>
                        <Card.Body>
                            <Card.Title>Modo leitura</Card.Title>
                            <Card.Text>
                                Conforme o ponteiro do mouse passa sobre os elementos, lê seu conteúdo ou descrição.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Form.Check
                                id='modoleitura'
                                type="switch" 
                                label="Ativo" 
                                checked={modoLeitura}
                                onChange={(e) => ValidaCampoForm(e)} />
                        </Card.Footer>
                    </Card>
                </Col>
                <Col>
                    <Card className='cartoes'>
                        <Card.Header>Ajuste coordenação motora</Card.Header>
                        <Card.Body>
                            <Card.Title>Modo atalho único</Card.Title>
                            <Card.Text>
                                As telas e funcionalidades tem o atalho de tecla única apresentado em tela para evitar o uso do mouse.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Form.Check 
                                id='modoatalho'
                                type="switch" 
                                label="Ativo"
                                checked={modoAtalho}
                                onChange={(e) => ValidaCampoForm(e)} />                            
                        </Card.Footer>
                    </Card>
                </Col>
                <Col>
                    <Card className='cartoes'>
                        <Card.Header>Ajuste visual</Card.Header>
                        <Card.Body>
                            <Card.Title>Tema da aplicação</Card.Title>
                            <Card.Text>
                                Aplica uma paleta de cores na aplicação, ajustando as cores para a sensibilidade ou condição visual do usuário.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Form.Select 
                                id='tema'
                                size='sm'
                                value={tema}
                                onChange={(e) => ValidaCampoForm(e)} >
                                { ListaTemasCombo(listaTemas) }
                            </Form.Select>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            <Row className='linha'>
                <Col>
                    <Stack direction="horizontal" className='d-flex flex-row-reverse'>
                        <Button variant="primary" onClick={(e) => SalvarPadrao(e)}>Salvar</Button>
                    </Stack>
                </Col>
            </Row>
        </Container>
    )
}
  
export default AcessibilidadeManutencao