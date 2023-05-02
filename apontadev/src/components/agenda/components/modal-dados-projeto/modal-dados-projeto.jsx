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
                        <InputGroup.Text>Nome do cliente</InputGroup.Text>
                        <Form.Control
                            type='text'
                            value={props.dadosprojeto.nomecliente}
                            readOnly={true} />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Data prevista de entrega</InputGroup.Text>
                        <Form.Control
                            type='text'
                            value={props.dadosprojeto.dataprevista}
                            readOnly={true} />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Total de horas estimadas</InputGroup.Text>
                        <Form.Control
                            type='text'
                            value={props.dadosprojeto.horasestimadas}
                            readOnly={true} />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Minhas horas consumidas</InputGroup.Text>
                        <Form.Control
                            type='text'
                            value={props.dadosprojeto.horasconsumidas}
                            readOnly={true} />
                    </InputGroup>
                </Stack>
            </Modal.Body>
        </Modal>
    )
  }
  
  export default ModalDadosProjeto