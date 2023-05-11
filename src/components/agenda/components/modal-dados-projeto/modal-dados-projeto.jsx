import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

function ModalDadosProjeto(props) {
    return (
        <Modal
            {...props}
            size='md'
            aria-labelledby='contained-modal-title-vcenter'
            className={`modal-${props.usuario.acessibilidade.tema.titulo}`}
            centered
            onExit={() => props.onHide()}>
            <Modal.Header closeButton>
                <Modal.Title 
                    id='contained-modal-title-vcenter'>
                    Dados do projeto
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack>
                    <InputGroup>
                        <InputGroup.Text
                            className={`form-text-${props.usuario.acessibilidade.tema.titulo}`}>
                            Nome do cliente
                        </InputGroup.Text>
                        <Form.Control
                            type='text'
                            className={`form-control-${props.usuario.acessibilidade.tema.titulo}`}
                            value={props.dadosprojeto.nomecliente}
                            readOnly={true} />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text
                            className={`form-text-${props.usuario.acessibilidade.tema.titulo}`}>
                            Data prevista de entrega
                        </InputGroup.Text>
                        <Form.Control
                            type='text'
                            className={`form-control-${props.usuario.acessibilidade.tema.titulo}`}
                            value={props.dadosprojeto.dataprevista}
                            readOnly={true} />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text
                            className={`form-text-${props.usuario.acessibilidade.tema.titulo}`}>
                            Total de horas estimadas
                        </InputGroup.Text>
                        <Form.Control
                            type='text'
                            className={`form-control-${props.usuario.acessibilidade.tema.titulo}`}
                            value={props.dadosprojeto.horasestimadas}
                            readOnly={true} />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text
                            className={`form-text-${props.usuario.acessibilidade.tema.titulo}`}>
                            Minhas horas consumidas
                        </InputGroup.Text>
                        <Form.Control
                            type='text'
                            className={`form-control-${props.usuario.acessibilidade.tema.titulo}`}
                            value={props.dadosprojeto.horasconsumidas}
                            readOnly={true} />
                    </InputGroup>
                </Stack>
            </Modal.Body>
        </Modal>
    )
  }
  
  export default ModalDadosProjeto