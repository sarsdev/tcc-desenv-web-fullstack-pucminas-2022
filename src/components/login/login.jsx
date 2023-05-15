import './login.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import { ServicoLogin } from '../../service/servico'
import CriacaoSenha from './components/criacao-senha/criacao-senha'
import RecuperacaoSenha from './components/recuperacao-senha/recuperacao-senha'

function Login() {
    const navigate = useNavigate()

    const [formUsuario, setFormUsuario] = useState('')
    const [usuarioValido, setUsuarioValido] = useState(false)
    const [formSenha, setFormSenha] = useState('')
    const [senhaValida, setSenhaValida] = useState(false)
    const [mostrarCriacaoSenha, setMostrarCriacaoSenha] = useState(false)
    const [mostrarRecuperacaoSenha, setMostrarRecuperacaoSenha] = useState(false)
    const [mostrarAlerta, setMostrarAlerta] = useState(false)
    const [textoAlerta, setTextoAlerta] = useState('')
    const [mostraLoading, setMostraLoading] = useState(false)
    const [paramUsuario, setParamUsuario] = useState({})

    useEffect(() => {
        console.log(paramUsuario)
        if(paramUsuario._id) {
            sessionStorage.setItem('usuariologin', JSON.stringify(paramUsuario))
            navigate('/app/inicial')
        }        
    }, [paramUsuario])

    function LimpaTelaLogin() {
        setFormUsuario('')
        setUsuarioValido(false)
        setFormSenha('')
        setSenhaValida(false)
        setMostrarCriacaoSenha(false)
        setMostrarRecuperacaoSenha(false)
    }

    function BuscaDadosUsuario(e) {
        e.preventDefault()
        if(!(usuarioValido && senhaValida)) {
            return
        }
        setMostraLoading(true)
        const dados = {
            usuario: formUsuario,
            senha: formSenha
        }
        ServicoLogin.ValidarAcesso(dados)
        .then((resp) => {
            if(resp.erro) {
                setTextoAlerta(resp.msgErro)
                setMostrarAlerta(true)
            } else {
                setParamUsuario(ServicoLogin.RetornaDadosUsuario().dados)
            }
        })
        .catch((err) => {
            setTextoAlerta(err)
            setMostrarAlerta(true)
        })
        .finally(() => setMostraLoading(false))
    }

    function ValidaCampoForm(e) {
        const campo = e.target.id
        const valor = e.target.value
        Validacao(campo, valor)
    }

    function Validacao(campo, valor) {
        switch(campo) {
            case 'formUsuario':
                setFormUsuario(valor)
                setUsuarioValido(valor.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false)
                break
            case 'formSenha':
                setFormSenha(valor)
                setSenhaValida(valor.length >= 6)
                break
            default:
                break
        }        
    }

    function AcessarComGmail() {
        if(ServicoLogin.DeveCriarSenha()) {
            setMostrarCriacaoSenha(true)
        }
    }
    
    return (
        <div className='retangulo-externo col-xxl-3 col-lg-4 col-md-6 col-sm-8 mx-auto'>
            <Form onSubmit={BuscaDadosUsuario} noValidate>
                <h3>Acesso</h3>
                <hr />
                <Form.Group className='mb-2' controlId='formUsuario'>
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control
                        type='email'
                        value={formUsuario}
                        onChange={(evento) => ValidaCampoForm(evento)}
                        isInvalid={!usuarioValido}
                        required/>
                    <Form.Control.Feedback type='invalid'>O e-mail deve estar em um padrão válido</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-2' controlId='formSenha'>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control 
                        type='password'
                        value={formSenha}
                        onChange={(evento) => ValidaCampoForm(evento)}
                        isInvalid={!senhaValida}
                        required/>
                    <Form.Control.Feedback type='invalid'>A senha deve ter 6 digitos ou mais</Form.Control.Feedback>
                </Form.Group>
                <Button
                    className='col-sm-12 mx-auto'
                    type='submit'
                    disabled={!(usuarioValido && senhaValida)||mostraLoading}>
                        <Spinner
                            hidden={!mostraLoading}
                            as="span"
                            animation='border'
                            size='sm'
                            variant='light'
                            role='status'
                        />
                        Acessar
                </Button>
                <div className='d-flex flex-row-reverse'>
                    <Button 
                        className='recupera-senha'
                        disabled={mostraLoading}
                        onClick={() => setMostrarRecuperacaoSenha(true)}>
                        Esqueci minha senha
                    </Button>
                </div>
                <hr hidden={true} />
                <Button 
                    variant='danger'
                    className='col-sm-12 mx-auto'
                    disabled={true}
                    hidden={true}
                    onClick={() => AcessarComGmail()}>Acessar com GMail</Button>
            </Form>
                        
            {/* Alertas */}
            <Alert
                variant='danger'
                className='mt-2'
                show={mostrarAlerta}
                onClose={() => setMostrarAlerta(false)}
                dismissible>{textoAlerta}</Alert>

            {/* Modais */}
            <CriacaoSenha
                show={mostrarCriacaoSenha}
                onHide={() => setMostrarCriacaoSenha(false)}
            />
            <RecuperacaoSenha 
                show={mostrarRecuperacaoSenha}
                onHide={() => LimpaTelaLogin()}/>

        </div>
    )
}
  
export default Login