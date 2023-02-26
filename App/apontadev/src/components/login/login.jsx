import './login.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Servico from '../../service/servico'
import CriacaoSenha from './components/criacao-senha/criacao-senha'
import RecuperacaoSenha from './components/recuperacao-senha/recuperacao-senha'

function Login() {
    const [formUsuario, setFormUsuario] = useState('')
    const [usuarioValido, setUsuarioValido] = useState(false)
    const [formSenha, setFormSenha] = useState('')
    const [senhaValida, setSenhaValida] = useState(false)
    const [formGoogleAuth, setFormGoogleAuth] = useState('')
    const [googleAuthValido, setGoogleAuthValido] = useState(false)
    const [mostrarCriacaoSenha, setMostrarCriacaoSenha] = useState(false)
    const [mostrarRecuperacaoSenha, setMostrarRecuperacaoSenha] = useState(false)
    const [mostrarAlerta, setmostrarAlerta] = useState(false)

    function EnvioDadosForm(e) {
        e.preventDefault()
        const dados = {
            usuario: formUsuario,
            senha: formSenha,
            googleAuth: formGoogleAuth
        }
        if(Servico.ValidarAcesso(dados)) {
            lnkInicial.click()
        } else {
            setmostrarAlerta(true)
        }
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
            case 'formGoogleAuth':
                setFormGoogleAuth(valor)
                setGoogleAuthValido(valor.length >= 6)
                break
            default:
                break
        }        
    }

    function AcessarComGmail() {
        if(Servico.DeveCriarSenha()) {
            setMostrarCriacaoSenha(true)
        }
    }
    
    return (
        <div className='retangulo-externo col-xxl-3 col-lg-4 col-md-6 col-sm-8 mx-auto'>
            <Form onSubmit={EnvioDadosForm} noValidate>
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
                <Form.Group className='mb-2' controlId='formGoogleAuth'>
                    <Form.Label>Google Authenticador</Form.Label>
                    <Form.Control
                        type='number'
                        value={formGoogleAuth}
                        onChange={(evento) => ValidaCampoForm(evento)}
                        isInvalid={!googleAuthValido}
                        required/>
                    <Form.Control.Feedback type='invalid'>O código deve ter 6 digitos ou mais</Form.Control.Feedback>
                </Form.Group>
                <Button
                    className='col-sm-12 mx-auto'
                    type='submit'
                    disabled={!(usuarioValido && senhaValida && googleAuthValido)}>Acessar</Button>
                <div className='d-flex flex-row-reverse'>
                    <a 
                        href='#'
                        onClick={() => setMostrarRecuperacaoSenha(true)}>Esqueci minha senha</a>
                </div>
                <hr />
                <Button 
                    variant='danger'
                    className='col-sm-12 mx-auto'
                    onClick={() => AcessarComGmail()}>Acessar com GMail</Button>
            </Form>

            {/* Alertas */}
            <Alert
                variant='danger'
                className='mt-2'
                show={mostrarAlerta}
                onClose={() => setmostrarAlerta(false)}
                dismissible>Acesso negado! Dados inválidos.</Alert>

            {/* Modais */}
            <CriacaoSenha
                show={mostrarCriacaoSenha}
                onHide={() => setMostrarCriacaoSenha(false)}
            />
            <RecuperacaoSenha 
                show={mostrarRecuperacaoSenha}
                onHide={() => setMostrarRecuperacaoSenha(false)}/>
                
            {/* Lista oculta para permitir a navegação, pois não foi possível usando o useNavegate */}
            <ul id='listaNavegacao'>
                <li>
                    <Link to={'/app/inicial'} id='lnkInicial' />
                </li>
            </ul>

        </div>
    )
}
  
export default Login