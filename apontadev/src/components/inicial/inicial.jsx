import './inicial.css'
import React, { useRef, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Menu from './../common/menu-principal/menu-principal'

function Inicial(props) {
    const linkRefLogin = useRef()
    let { state } = useLocation()

    useEffect(() => {
        if(!state) {
            linkRefLogin.current.click()
        }
    }, [])

    return (
        <Container>
            <Menu usuarioLogado={state}/>

            {/* Lista oculta para permitir a navegação, pois não foi possível usando o useNavegate */}
            <ul id='listaNavegacao'>
                <li>
                    <Link to={'/app/acesso'} ref={linkRefLogin} />
                </li>
            </ul>
        </Container>
    )
}
  
export default Inicial