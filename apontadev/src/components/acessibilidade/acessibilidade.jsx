import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Menu from './../common/menu-principal/menu-principal'
import NavBarTela from "../common/navbar-tela/navbar-tela"
import AcessibilidadeManutencao from './components/acessibilidade-manutencao'

function Acessibilidade(props) {
    const navigate = useNavigate()

    const [nomeUsuario, setNomeUsuario] = useState('')
    const [usuario, ] = useState(() => JSON.parse(sessionStorage.getItem('usuariologin')))

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

    useEffect(() => {
        let usuariologin = JSON.parse(sessionStorage.getItem('usuariologin'))
        if(usuariologin && usuariologin._id) {
            setNomeUsuario(usuariologin.dados_pessoais.nome)
        } else {
            navigate('/app/acesso')
        }
      }, []);

    return (
        <Container>
            <Menu usuario={nomeUsuario}/>
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
                <AcessibilidadeManutencao usuariologin={usuario}/>
            </Row>
        </Container>
    )
}
  
export default Acessibilidade