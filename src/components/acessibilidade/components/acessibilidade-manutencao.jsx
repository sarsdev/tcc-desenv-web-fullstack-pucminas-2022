import './acessibilidade-manutencao.css'
import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Loading from '../../common/loading/loading'
import { ServicoAcessibilidade } from './../../../service/servico'
import { Utils } from './../../../service/utils'

function AcessibilidadeManutencao({usuariologin, onMudaTema}) {
    const [listaTemas, setListaTemas] = useState([])
    const [configAtual, setConfigAtual] = useState({})
    const [modoLeitura, setModoLeitura] = useState(false)
    const [modoAtalho, setModoAtalho] = useState(false)
    const [tema, setTema] = useState('Dia')
    const [loading, setLoading] = useState(false)
    const [mostrarAlerta, setMostrarAlerta] = useState(false)
    const [tipoAlerta, setTipoAlerta] = useState('')    
    const [msgAlerta, setMsgAlerta] = useState('')
    const [permAcaoAdicionar, setPermAcaoAdicionar] = useState(false)

    useEffect(() => {        
        AtivaInativaLoading(true)
        AplicaPermissao(usuariologin)
        CarregaTemas()
        .then(() => {
            CarregaDadosAcessibilidade()
            .then((retorno) => {
                setConfigAtual(retorno.config)
                setModoLeitura(retorno.modo_leitura)
                setModoAtalho(retorno.modo_atalho_unico)
                setTema(retorno.tema)
            }).catch((err) => {
                AlertaErro(err)
            })
        }).catch((err) => {
            AlertaErro(err)
        }).finally(() => AtivaInativaLoading(false))
    }, [])

    function AplicaPermissao(usuariologin) {
        setPermAcaoAdicionar(Utils.TemPermissaoNaAcao(usuariologin, 'Acessibilidade', 'Adicionar'))
    }

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
            throw new Error(err)
        }   
    }

    async function AtualizaPadraoAcessibilidade() {
        try {        
            let retorno = await ServicoAcessibilidade.AtualizaPadrao({
                usuario: usuariologin.email,
                senha: usuariologin.dados_acesso.senha
            }, configAtual)
            if(!retorno.erro) {
                usuariologin.acessibilidade = configAtual
                sessionStorage.setItem('usuariologin', JSON.stringify(usuariologin))
            }
            return retorno  
        } catch (err) {
            throw new Error(err)
        }
    }

    async function InserePadraoAcessibilidade() {
        try {
            let temaSelecionado = listaTemas.find(valor => valor.titulo === tema)
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
            let retorno = await ServicoAcessibilidade.InserePadrao({
                usuario: usuariologin.email,
                senha: usuariologin.dados_acesso.senha
            }, padrao)
            if(retorno.erro) {
                return retorno
            } else {
                setConfigAtual(retorno.dados)
                usuariologin.acessibilidade = retorno.dados
                sessionStorage.setItem('usuariologin', JSON.stringify(usuariologin))
                return retorno
            }  
        } catch (err) {
            throw new Error(err)
        }
    }

    function SalvarPadrao() {
        AtivaInativaLoading(true)
        if(configAtual && configAtual._id) {
            AtualizaPadraoAcessibilidade()
            .then((resp) => {
                if(resp.erro) {
                    AlertaErro(resp.msgErro)
                } else {
                    AlertaSucesso('Dados atualizados com sucesso!')
                }
            }).finally(() => AtivaInativaLoading(false))
        } else {
            InserePadraoAcessibilidade()
            .then((resp) => {
                if(resp.erro) {
                    AlertaErro(resp.msgErro)
                } else {
                    AlertaSucesso('Dados inseridos com sucesso!')
                }
            }).finally(() => AtivaInativaLoading(false))
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
                    onMudaTema(configAtual)
                }
                break
            default:
                break
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

    function AtualizaTemaTela() {
        let body = document.getElementsByTagName('body')
        body[0].classList.forEach(v => body[0].classList.remove(v))            
        body[0].classList.add(`body-${usuariologin.acessibilidade.tema.titulo}`)
    }

    return (
        <Container
            className={`container-${usuariologin.acessibilidade.tema.titulo}`}>
            { AtualizaTemaTela() }
            { loading ? <Loading /> : null }
            <Row className='linha'>
                {/*<Col>
                    <Card className={`cartoes cards-${usuariologin.acessibilidade.tema.titulo}`}>
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
                                className={`form-check-${usuariologin.acessibilidade.tema.titulo}`}
                                checked={modoLeitura}
                                disabled={loading}
                                onChange={(e) => ValidaCampoForm(e)} />
                        </Card.Footer>
                    </Card>
                </Col>*/}
                {/*<Col>
                    <Card className={`cartoes cards-${usuariologin.acessibilidade.tema.titulo}`}>
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
                                className={`form-check-${usuariologin.acessibilidade.tema.titulo}`}
                                checked={modoAtalho}
                                disabled={loading}
                                onChange={(e) => ValidaCampoForm(e)} />                            
                        </Card.Footer>
                    </Card>
                </Col>*/}
                <Col>
                    <Card className={`cartoes cards-${usuariologin.acessibilidade.tema.titulo}`}>
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
                                className={`form-select-${usuariologin.acessibilidade.tema.titulo}`}
                                value={tema}
                                disabled={loading}
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
                        <Button 
                            variant={usuariologin.acessibilidade.tema.titulo} 
                            disabled={!permAcaoAdicionar || loading}
                            onClick={(e) => SalvarPadrao(e)}>Salvar</Button>
                    </Stack>
                </Col>
            </Row>

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
  
export default AcessibilidadeManutencao