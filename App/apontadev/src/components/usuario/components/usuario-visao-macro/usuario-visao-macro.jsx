import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form';

function UsuarioVisaoMacro(props) {
    return (
        <Container>
            <Row>
                <Col>
                    <Stack>
                        <Form.Group>
                            <Form.Label>Total de usuários cadastrados</Form.Label>
                            <Form.Control type="number"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Fator médio de produtividade</Form.Label>
                            <Form.Control type="number"/>
                        </Form.Group>
                    </Stack>
                </Col>
                <Col>
                    <Stack>
                        <Form.Group>
                            <Form.Label>Total de acessos autonômos nos últimos 30 dias</Form.Label>
                            <Form.Control type="number"/>
                        </Form.Group>
                    </Stack>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Gráfico 1</h3>
                </Col>
                <Col>
                    <h3>Gráfico 2</h3>
                </Col>
            </Row>
        </Container>
    )
}
  
export default UsuarioVisaoMacro