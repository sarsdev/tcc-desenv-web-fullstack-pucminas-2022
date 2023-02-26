import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NavBarTela from "../common/navbar-tela/navbar-tela"
import UsuarioCadastro from './components/usuario-cadastro/usuario-cadastro'
import UsuarioAutonomos from './components/usuario-autonomos/usuario-autonomos'
import UsuarioVisaoMacro from './components/usuario-visao-macro/usuario-visao-macro'

function Usuario(props) {
    const [telaExibida, setTelaExibida] = useState(<UsuarioCadastro />)
    const abaComFocoInicial = "aba001"
    const abasPermissao = [
        {
            id: "aba001",
            texto: "Cadastro de usuário"
        },
        {
            id: "aba002",
            texto: "Usuários autonômos"
        },
        {
            id: "aba003",
            texto: "Visão macro"
        }
    ]
    const AbaClicada = function (evento) {
        switch(evento.target.id) {
            case 'aba001':
                setTelaExibida(<UsuarioCadastro />)
                break
            case 'aba002':
                setTelaExibida(<UsuarioAutonomos />)
                break
            case 'aba003':
                setTelaExibida(<UsuarioVisaoMacro />)
                break
        }
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
                {telaExibida}
            </Row>
        </Container>
    )
}
  
export default Usuario