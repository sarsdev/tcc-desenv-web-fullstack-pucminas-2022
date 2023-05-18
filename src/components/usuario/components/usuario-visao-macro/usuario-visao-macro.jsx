import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import GraficoPizza from '../../../common/grafico/grafico-pizza/grafico-pizza'

function UsuarioVisaoMacro(props) {
    const [dadosGraficoPizza, ] = useState([
        {chave: 'Equipe A', valor: 45.0}, 
        {chave: 'Equipe B', valor: 23.5},
        {chave: 'Equipe C', valor: 11.5},
        {chave: 'Equipe D', valor: 20.0}
    ])
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
                    <GraficoPizza
                        dados={dadosGraficoPizza} />
                </Col>
            </Row>
        </Container>
    )
}
  
export default UsuarioVisaoMacro