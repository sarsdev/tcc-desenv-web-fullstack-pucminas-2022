import './inicial.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Menu from './../common/menu-principal/menu-principal'

function Inicial(props) {
    const navigate = useNavigate()
    const [usuario, ] = useState(() => JSON.parse(sessionStorage.getItem('usuariologin')))

    useEffect(() => {
        let usuariologin = JSON.parse(sessionStorage.getItem('usuariologin'))
        if(usuariologin && usuariologin._id) {
            let body = document.getElementsByTagName('body')
            body[0].classList.forEach(v => body[0].classList.remove(v))            
            body[0].classList.add(`body-${usuariologin.acessibilidade.tema.titulo}`)    
        } else {
            navigate('/app/acesso')
        }
    }, [])

    return (
        <Container>
            <Menu usuario={usuario} />
        </Container>
    )
}
  
export default Inicial