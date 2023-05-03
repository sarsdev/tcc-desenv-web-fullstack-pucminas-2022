import './navbar-tela.css'
import React from 'react';
import Stack from 'react-bootstrap/Stack'

function NavBarTela(props) {
    const abas = props.abas.map((aba) =>
        <h6
            id={aba.id}
            key={aba.id}
            className={`TitulosMenu ${props.abaInicial === aba.id ? 'TitulosMenuAtivo' : 'TitulosMenuInativo'}`}
            onClick={props.eventoAbaAlterada}>{aba.texto}</h6>
    )

    return (
        <div className="BarraSuperiorTela">
            <Stack direction="horizontal">
                {abas}
            </Stack>
        </div>
    )
}
  
export default NavBarTela