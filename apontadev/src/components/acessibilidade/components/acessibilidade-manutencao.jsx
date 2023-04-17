import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function AcessibilidadeManutencao(props) {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>Ajuste visual</Card.Header>
                        <Card.Body>
                            <Card.Title>Modo leitura</Card.Title>
                            <Card.Text>
                                Conforme o ponteiro do mouse passa sobre os elementos, lê seu conteúdo ou descrição.
                            </Card.Text>
                            <Form.Check type="checkbox" label="Desabilitado" />
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header>Ajuste coordenação motora</Card.Header>
                        <Card.Body>
                            <Card.Title>Modo atalho único</Card.Title>
                            <Card.Text>
                                As telas e funcionalidades tem o atalho de tecla única apresentado em tela para evitar o uso do mouse.
                            </Card.Text>
                            <Form.Check type="checkbox" label="Habilitado" checked />
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header>Ajuste visual</Card.Header>
                        <Card.Body>
                            <Card.Title>Tema da aplicação</Card.Title>
                            <Card.Text>
                                Aplica uma paleta de cores na aplicação, ajustando as cores para a sensibilidade ou condição visual do usuário.
                            </Card.Text>
                            <Form.Select size='sm' aria-label="Default select example">
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
  
export default AcessibilidadeManutencao