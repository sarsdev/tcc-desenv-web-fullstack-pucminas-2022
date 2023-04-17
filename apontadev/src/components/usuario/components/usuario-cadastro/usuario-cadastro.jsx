import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function UsuarioCadastro(props) {
    return (
        <Container>
            <Row>
                <Col>
                    <Stack>
                        <Form.Group>
                            <Form.Control type="email" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Fator de Produtividade</Form.Label>
                            <Form.Control type="number"/>
                        </Form.Group>
                        <div className='d-flex justify-content-center'>
                            <h4>Usuário Ativo</h4>
                        </div>
                    </Stack>
                </Col>
                <Col>
                    <Stack>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Cargo..." />
                        </Form.Group>
                        <InputGroup>
                            <Form.Control
                                placeholder="Recipient's username"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2" />
                            <Button variant="outline-secondary" id="button-addon2">Button</Button>
                        </InputGroup>
                        <InputGroup>
                            <Form.Control
                                placeholder="Recipient's username"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2" />
                            <Button variant="outline-secondary" id="button-addon2">Button</Button>
                        </InputGroup>
                    </Stack>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Usuário</th>
                                <th>Cargo</th>
                                <th>Equipe</th>
                                <th>Função</th>
                                <th>Fator</th>
                                <th>Situação</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Carlos Junior</td>
                                <td>Desenvolvedor I</td>
                                <td>Time A</td>
                                <td>Desenvolvedor</td>
                                <td>0.75</td>
                                <td>
                                    <Badge pill bg="primary">Ativo</Badge>
                                </td>
                            </tr>
                            <tr>
                                <td>Juliana Santos</td>
                                <td>Desenvolvedora III</td>
                                <td>Time D</td>
                                <td>Desenvolvedor</td>
                                <td>1.15</td>
                                <td>
                                    <Badge pill bg="danger">Inativo</Badge>
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
                        <Button variant="danger">Inativar</Button>
                        <Button variant="light">Limpar</Button>
                        <Button variant="primary">Adicionar</Button>
                    </Stack>
                </Col>
            </Row>
        </Container>
    )
}
  
export default UsuarioCadastro