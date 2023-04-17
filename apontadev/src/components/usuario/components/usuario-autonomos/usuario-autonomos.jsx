import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Badge from 'react-bootstrap/Badge';

function UsuarioAutonomos(props) {
    return (
        <Container>
            <Row>
                <Col>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Usuário</th>
                                <th>E-mail</th>
                                <th>Data do último acesso</th>
                                <th>Situação</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Afonso</td>
                                <td>afonso@gmail.com</td>
                                <td>01/01/2022 19:20:36</td>
                                <td>
                                    <Badge pill bg="primary">Pendente</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="success">Cadastrar</Badge>
                                    <Badge pill bg="danger">Rejeitar</Badge>
                                </td>
                            </tr>
                            <tr>
                                <td>julio2021</td>
                                <td>julio2j@gmail.com</td>
                                <td>02/01/2022 09:43:40</td>
                                <td>
                                    <Badge pill bg="danger">Rejeitado</Badge>
                                </td>
                                <td>
                                    <Badge pill bg="success">Cadastrar</Badge>
                                    <Badge pill bg="danger">Rejeitar</Badge>
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
        </Container>
    )
}
  
export default UsuarioAutonomos