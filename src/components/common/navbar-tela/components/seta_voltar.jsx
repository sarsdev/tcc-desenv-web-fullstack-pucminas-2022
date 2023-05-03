import React from 'react';

function SetaVoltar(props) {
    const largura = props.largura
    const altura = props.altura
    const pontoA = `0,${altura/2}`
    const pontoB = `${largura/3},${altura}`
    const pontoC = `${largura/3},${(altura/6)*4}`
    const pontoD = `${largura},${(altura/6)*4}`
    const pontoE = `${largura},${(altura/6)*2}`
    const pontoF = `${largura/3},${(altura/6)*2}`
    const pontoG = `${largura/3},0`
    const pontosPoligono = `${pontoA} ${pontoB} ${pontoC} ${pontoD} ${pontoE} ${pontoF} ${pontoG}`

    return (
        <svg
            width={largura}
            height={altura}
            onClick={props.eventoClique}
            data-elemento="seta-voltar-tela">
            <polygon
                points={pontosPoligono}
                fill={"white"}
                data-elemento="seta-voltar-tela" />
        </svg>
    )
}
  
export default SetaVoltar

/*  Representação dos pontos usados para formar o polígono da seta no SVG acima
    Observe que cada ponto é composto por um par x,y que corresponde a coordenada do ponto na imagem

        *G
    
A       *F              *E
*
        *C              *D
        
        *B

*/