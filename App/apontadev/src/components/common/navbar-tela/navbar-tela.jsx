import './navbar-tela.css'
import Stack from 'react-bootstrap/Stack';
import SetaVoltar from './components/seta_voltar'

function NavBarTela(props) {
    const larguraSeta = 50
    const alturaSeta = 35
    const abas = props.abas.map((aba) =>
        <h5
            id={aba.id}
            key={aba.id}
            className={`TitulosMenu ${props.abaInicial === aba.id ? 'TitulosMenuAtivo' : 'TitulosMenuInativo'}`}
            onClick={props.eventoAbaAlterada}>{aba.texto}</h5>
    )

    return (
        <div className="BarraSuperiorTela">
            <Stack direction="horizontal">
                <SetaVoltar
                    largura={larguraSeta}
                    altura={alturaSeta}
                    eventoClique={props.eventoVoltarClicado}/>
                {abas}
            </Stack>
        </div>
    )
}
  
export default NavBarTela