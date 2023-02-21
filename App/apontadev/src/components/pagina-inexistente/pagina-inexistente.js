import { Component } from 'react'
import Figure from 'react-bootstrap/Figure'
import FigureImage from 'react-bootstrap/FigureImage'
import emotionTired from './../../img/emotion-tired.jpg'

class PaginaInexistente extends Component {
    render() {
        return(
            <div>
                <h1>Infelizmente a página não foi encontrada</h1>
                <Figure>
                    <FigureImage
                        width={300}
                        height={300}
                        alt={"Emotion aparentando estar cansado"}
                        src={emotionTired}/>                    
                </Figure>
                <p>Esse erro pode ocorrer quando a rota (URL) informada no navegado é inválida ou caso a tela tenha sido removida da aplicação.</p>
                <p>Por favor, confirme se a rota foi digitada corretamente ou se é uma rota existente. Caso a situação permaneça ocorrendo, acione os desenvolvedores da aplicação.</p>
                <p>Contato: <b>renansa2010@gmail.com</b></p>
                <p>fonte imagem: https://www.freepik.com/free-vector/sticker-template-with-tired-face-emoji-isolated_16462140.htm#query=emotion%20sad%20png&position=17&from_view=search&track=ais</p>
            </div>
        )
    }
}

export default PaginaInexistente