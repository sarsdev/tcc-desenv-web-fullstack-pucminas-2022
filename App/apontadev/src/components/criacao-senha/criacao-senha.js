import './criacao-senha.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function CriacaoSenha() {
    return (
        <div class="retangulo-externo col-xxl-3 col-lg-4 col-md-6 col-sm-8 mx-auto">
            <Form>
                <h3>Crie sua senha</h3>
                <hr />
                <Form.Group className="mb-2" controlId="formUsuario">
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control type="email" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formSenha">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Confirme a senha</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
                <Button className="col-sm-12 mx-auto">Salvar</Button>
            </Form>
        </div>
    );
  }
  
  export default CriacaoSenha