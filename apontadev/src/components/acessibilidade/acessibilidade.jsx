import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NavBarTela from "../common/navbar-tela/navbar-tela"
import AcessibilidadeManutencao from './components/acessibilidade-manutencao'

function Acessibilidade(props) {
    const abaComFocoInicial = "aba001"
    const abasPermissao = [
        {
            id: "aba001",
            texto: "Manutenção de Acessibilidade"
        }
    ]
    const AbaClicada = function (evento) {
        console.log(evento.target.id)
    }
    const VoltarClicado = function (evento) {
        console.log(evento.target.dataset.elemento)
    }

    return (
        <Container fluid>
            <Row>
                <Col>
                    <NavBarTela
                        abas={abasPermissao}
                        abaInicial={abaComFocoInicial}
                        eventoAbaAlterada={AbaClicada}
                        eventoVoltarClicado={VoltarClicado} />
                </Col>
            </Row>
            <Row>
                <AcessibilidadeManutencao />
            </Row>
        </Container>
    )
}
  
export default Acessibilidade