import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import MenuPrincipal from './../common/menu-principal/menu-principal'
import NavBarTela from "../common/navbar-tela/navbar-tela"
import UsuarioCadastro from './components/usuario-cadastro/usuario-cadastro'
import UsuarioAutonomos from './components/usuario-autonomos/usuario-autonomos'
import UsuarioVisaoMacro from './components/usuario-visao-macro/usuario-visao-macro'

function Usuario(props) {
    const navigate = useNavigate()
    const [nomeUsuario, setNomeUsuario] = useState('')
    const [usuarioLogin, ] = useState(JSON.parse(sessionStorage.getItem('usuariologin')))
    const [telaExibida, setTelaExibida] = useState(<UsuarioCadastro usuariologin={usuarioLogin} />)

    const abaComFocoInicial = "aba001"
    const abasUsuario = [
        {
            id: "aba001",
            texto: "Cadastro de usuário"
        }
        /* {
            id: "aba002",
            texto: "Usuários autonômos"
        },
        {
            id: "aba003",
            texto: "Visão macro"
        } */
    ] 
    
    useEffect(() => {
        let usuariologin = JSON.parse(sessionStorage.getItem('usuariologin'))
        if(usuariologin && usuariologin._id) {
            setNomeUsuario(usuariologin.dados_pessoais.nome)
        } else {
            navigate('/app/acesso')
        }
    }, []);

    const AbaClicada = function (evento) {
        switch(evento.target.id) {
            case 'aba001':
                setTelaExibida(<UsuarioCadastro usuariologin={usuarioLogin} />)
                break
            case 'aba002':
                setTelaExibida(<UsuarioAutonomos usuariologin={usuarioLogin} />)
                break
            case 'aba003':
                setTelaExibida(<UsuarioVisaoMacro usuariologin={usuarioLogin} />)
                break
            default:
                break
        }
    }

    return (
        <Container>
            <MenuPrincipal
                usuario={nomeUsuario} />
            <NavBarTela
                abas={abasUsuario}
                abaInicial={abaComFocoInicial}
                eventoAbaAlterada={AbaClicada} />
            <Row>
                {telaExibida}
            </Row>
        </Container>
    )
}
  
export default Usuario