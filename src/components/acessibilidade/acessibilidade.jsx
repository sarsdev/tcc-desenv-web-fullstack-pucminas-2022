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

    const [usuario, setUsuario] = useState(() => JSON.parse(sessionStorage.getItem('usuariologin')))
    const [atualiza, setAtualiza] = useState(false)

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

    function AtualizaTemaTela(dadosTema) {
        usuario.acessibilidade = dadosTema
        setUsuario(usuario)
        setAtualiza(!atualiza)
    }

    return (
        <Container>
            <Menu usuario={usuario} atualizar={atualiza}/>
            <Row>
                <Col>
                    <NavBarTela
                        abas={abasPermissao}
                        abaInicial={abaComFocoInicial}
                        eventoAbaAlterada={AbaClicada}
                        usuariologin={usuario}
                        atualizar={atualiza} />
                </Col>
            </Row>
            <Row>
                <AcessibilidadeManutencao 
                    usuariologin={usuario}
                    onMudaTema={(dados) => AtualizaTemaTela(dados)} />
            </Row>
        </Container>
    )
}
  
export default Acessibilidade