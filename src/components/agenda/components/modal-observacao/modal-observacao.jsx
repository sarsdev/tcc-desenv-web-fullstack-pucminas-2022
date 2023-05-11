import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function ModalObservacao(props) {
    const [obsInformada, setObsInformada] = useState('')

    useEffect(() => {
        setObsInformada(props.obspadrao)
    }, [props.obspadrao])

    return (
        <Modal
            {...props}
            size='md'
            aria-labelledby='contained-modal-title-vcenter'
            className={`modal-${props.usuario.acessibilidade.tema.titulo}`}
            centered
            onExit={() => props.onHide(obsInformada)}>
            <Modal.Header closeButton>
                <Modal.Title 
                    id='contained-modal-title-vcenter'>
                    Informe uma observação
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control
                    id='texto_obs'
                    type="text"
                    className={`form-control-${props.usuario.acessibilidade.tema.titulo}`}
                    value={obsInformada}
                    onChange={(e) => setObsInformada(e.target.value)} />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant={props.usuario.acessibilidade.tema.titulo}
                    onClick={() => props.onHide(obsInformada)}>
                    Retornar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
  
  export default ModalObservacao