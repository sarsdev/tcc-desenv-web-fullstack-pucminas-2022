import './inicial.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Menu from './../common/menu-principal/menu-principal'

function Inicial(props) {
    const navigate = useNavigate()

    const [nomeUsuario, setNomeUsuario] = useState('')

    useEffect(() => {
        let usuariologin = JSON.parse(sessionStorage.getItem('usuariologin'))
        if(usuariologin && usuariologin._id) {
            setNomeUsuario(usuariologin.dados_pessoais.nome)     
        } else {
            navigate('/app/acesso')
        }
    }, [])

    return (
        <Container>
            <Menu usuario={nomeUsuario} />
        </Container>
    )
}
  
export default Inicial