import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import GraficoPizza from '../../../common/grafico/grafico-pizza/grafico-pizza'

function UsuarioVisaoMacro(props) {

    function MontaDadosUsuarioFuncao() {
        let funcoes = []
        props.dados.forEach(e => {
            if(!e.valor.dados_colaborador) {
                funcoes.push('Sem função')
            } else {
                funcoes.push(e.valor.dados_colaborador.funcao.nome)
            }
        })
        return Array.from(new Set(funcoes)).map(v => { return { chave: v, valor: funcoes.filter(f => f === v).length } })
    }
    
    function MontaDadosUsuarioEquipe() {
        let equipes = []
        props.dados.forEach(e => {
            if(!e.valor.dados_colaborador) {
                equipes.push('Sem equipe')
            } else {
                equipes.push(e.valor.dados_colaborador.equipe.nome)
            }
        })
        return Array.from(new Set(equipes)).map(v => { return { chave: v, valor: equipes.filter(f => f === v).length } })
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Total de usuários cadastrados</Form.Label>
                        <Form.Control 
                            type="number"
                            defaultValue={props.dados.length}
                            readOnly={true} />
                    </Form.Group>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col>                    
                    { props && props.dados && props.dados.length > 0 ?
                        <>
                            <h4>Quantidade de Usuários x Função</h4>
                            <GraficoPizza
                                dados={MontaDadosUsuarioFuncao()} />
                        </> :
                        <h4>Não há dados</h4>
                    }
                </Col>
                <Col>
                    { props && props.dados && props.dados.length > 0 ?
                        <>
                            <h4>Quantidade de Usuários x Equipe</h4>
                            <GraficoPizza
                                dados={MontaDadosUsuarioEquipe()} />
                        </> :
                        <h4>Não há dados</h4>
                    }
                </Col>
            </Row>
        </Container>
    )
}
  
export default UsuarioVisaoMacro