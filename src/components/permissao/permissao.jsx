import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Menu from './../common/menu-principal/menu-principal'
import NavBarTela from "../common/navbar-tela/navbar-tela"
import PermissaoManutencao from './components/permissao-manutencao/permissao-manutencao'

function Permissao(props) {
    const navigate = useNavigate()
    const [usuario, ] = useState(() => JSON.parse(sessionStorage.getItem('usuariologin')))

    const abaComFocoInicial = "aba001"
    const abasPermissao = [
        {
            id: "aba001",
            texto: "Manutenção de Permissão"
        }
    ]
    const AbaClicada = function (evento) {
        console.log(evento.target.id)
    }

    useEffect(() => {
        let usuariologin = JSON.parse(sessionStorage.getItem('usuariologin'))
        if(usuariologin && usuariologin._id) {
            let body = document.getElementsByTagName('body')
            body[0].classList.forEach(v => body[0].classList.remove(v))            
            body[0].classList.add(`body-${usuariologin.acessibilidade.tema.titulo}`)
        } else {
            navigate('/app/acesso')
        }
      }, []);

    return (
        <Container
            className={`container-${usuario.acessibilidade.tema.titulo}`}>
            <Menu usuario={usuario}/>
            <Row>
                <Col>
                    <NavBarTela
                        abas={abasPermissao}
                        abaInicial={abaComFocoInicial}
                        eventoAbaAlterada={AbaClicada}
                        usuariologin={usuario} />
                </Col>
            </Row>
            <Row>
                <PermissaoManutencao usuariologin={usuario}/>
            </Row>
        </Container>
    )
}
  
export default Permissao