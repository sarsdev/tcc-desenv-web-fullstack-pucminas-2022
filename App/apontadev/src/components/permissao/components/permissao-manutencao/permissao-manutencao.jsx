import './permissao-manutencao.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Badge from 'react-bootstrap/Badge';

function PermissaoManutencao(props) {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Stack>
                        <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
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
                        <InputGroup>
                            <Form.Control
                                placeholder="Recipient's username"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2" />
                            <Button variant="outline-secondary" id="button-addon2">Button</Button>
                        </InputGroup>
                    </Stack>
                </Col>
                <Col>
                    <h1>Filtros 2</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Tela</th>
                                <th>Funcionalidade</th>
                                <th>Equipe</th>
                                <th>Função</th>
                                <th>Usuário</th>
                                <th>Acesso</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Permissão</td>
                                <td>
                                    <Badge pill bg="success">Todas</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="success">Todas</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="success">Coordenador</Badge>
                                    <Badge pill bg="success">Desenvolvedor</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="success">Todos</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="primary">Sim</Badge>
                                </td>
                            </tr>
                            <tr>
                                <td>Agenda</td>
                                <td>
                                    <Badge pill bg="success">Incluir</Badge>
                                    <Badge pill bg="success">remover</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="success">Todas</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="success">Analista</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="success">Todos</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="danger">Não</Badge>
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
                        <Button variant="danger">Excluir</Button>
                        <Button variant="light">Limpar</Button>
                        <Button variant="primary">Adicionar</Button>
                    </Stack>
                </Col>
            </Row>
        </Container>
    )
}
  
export default PermissaoManutencao