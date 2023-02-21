import './login.css'
import { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formUsuario: '',
            usuarioValido: false,
            formSenha: '',
            senhaValida: false,
            formGoogleAuth: '',
            googleAuthValido: false,
            permiteAcesso: false
        }
    }

    ValidaCampoForm = (e) => {
        const campo = e.target.id
        const valor = e.target.value
        this.setState({
            [campo]: valor
        }, () => {
            this.Validacao(campo, valor)
        })
    }

    Validacao(campo, valor) {
        let usuarioValido = this.state.usuarioValido
        let senhaValida = this.state.senhaValida
        let googleAuthValido = this.state.googleAuthValido

        switch(campo) {
            case 'formUsuario':
                usuarioValido = valor.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
                break
            case 'formSenha':
                senhaValida = valor.length >= 6
                break
            case 'formGoogleAuth':
                googleAuthValido = valor.length >= 6
                break
            default:
                break
        }
        
        this.setState({
            usuarioValido: usuarioValido,
            senhaValida: senhaValida,
            googleAuthValido: googleAuthValido
          },
          this.AtualizaPermiteAcesso)
    }

    AtualizaPermiteAcesso() {
        this.setState({
            permiteAcesso: this.state.usuarioValido && this.state.senhaValida && this.state.googleAuthValido
        })
    }

    EnvioDadosForm(e) {
        console.log(e)
        e.preventDefault();
        e.stopPropagation();
    }

    render() {
        return (
            <div className="retangulo-externo col-xxl-3 col-lg-4 col-md-6 col-sm-8 mx-auto">
                <Form onSubmit={this.EnvioDadosForm} noValidate>
                    <h3>Acesso</h3>
                    <hr />
                    <Form.Group className="mb-2" controlId="formUsuario">
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control
                            type="email"
                            value={this.state.usuario}
                            onChange={this.ValidaCampoForm}
                            isInvalid={!this.state.usuarioValido}
                            required/>
                        <Form.Control.Feedback type="invalid">O e-mail deve estar em um padrão válido</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formSenha">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control 
                            type="password"
                            value={this.state.senha}
                            onChange={this.ValidaCampoForm}
                            isInvalid={!this.state.senhaValida}
                            required/>
                        <Form.Control.Feedback type="invalid">A senha deve ter 6 digitos ou mais</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formGoogleAuth">
                        <Form.Label>Google Authenticador</Form.Label>
                        <Form.Control
                            type="number"
                            value={this.state.googleAuth}
                            onChange={this.ValidaCampoForm}
                            isInvalid={!this.state.googleAuthValido}
                            required/>
                        <Form.Control.Feedback type="invalid">O código deve ter 6 digitos ou mais</Form.Control.Feedback>
                    </Form.Group>
                    <Button
                        className="col-sm-12 mx-auto"
                        type="submit"
                        disabled={!this.state.permiteAcesso}>Acessar</Button>
                    <div className="d-flex flex-row-reverse">
                        <a href='#'>Esqueci minha senha</a>
                    </div>
                    <hr />
                    <Button 
                        variant="danger"
                        className="col-sm-12 mx-auto">Acessar com GMail</Button>
                </Form>
            </div>
        )
    }
}
  
export default Login