import './pagina-inexistente.css'
import Figure from 'react-bootstrap/Figure'
import FigureImage from 'react-bootstrap/FigureImage'
import emotionTired from './../../img/emotion-tired.jpg'

function PaginaInexistente(props) {
    return(
        <div className='d-flex justify-content-center'>
            <div>
                <h1>Infelizmente a página não foi encontrada</h1>
                <Figure className='d-flex justify-content-center'>
                    <div>
                        <FigureImage
                            width={300}
                            height={300}
                            alt={"Emotion aparentando estar cansado"}
                            src={emotionTired}/>   
                        <Figure.Caption>
                            <p>
                                Fonte: <a href='https://www.freepik.com/free-vector/sticker-template-with-tired-face-emoji-isolated_16462140.htm#query=emotion%20sad%20png&position=17&from_view=search&track=ais'>
                                    freepik
                                </a>
                            </p>
                        </Figure.Caption>
                    </div>               
                </Figure>
                <p>Esse erro pode ocorrer quando a rota (URL) informada no navegado é inválida ou caso a tela tenha sido removida da aplicação.</p>
                <p>Por favor, confirme se a rota foi digitada corretamente ou se é uma rota existente. Caso a situação permaneça ocorrendo, acione os desenvolvedores da aplicação.</p>
                <p>Contato: <b>renansa2010@gmail.com</b></p>
            </div>
        </div>
    )
}

export default PaginaInexistente