import React, { useEffect } from 'react'
import Stack from 'react-bootstrap/Stack'

function NavBarTela(props) {
    const abas = props.abas.map((aba) =>
        <h6
            id={aba.id}
            key={aba.id}
            className={`navbartitulo-${props.usuariologin.acessibilidade.tema.titulo} ${props.abaInicial === aba.id ? `tituloativo-${props.usuariologin.acessibilidade.tema.titulo}` : `tituloinativo-${props.usuariologin.acessibilidade.tema.titulo}`}`}
            onClick={props.eventoAbaAlterada}>{aba.texto}</h6>
    )

    return (
        <div className={`navbar-${props.usuariologin.acessibilidade.tema.titulo}`}>
            <Stack direction="horizontal">
                {abas}
            </Stack>
        </div>
    )
}
  
export default NavBarTela