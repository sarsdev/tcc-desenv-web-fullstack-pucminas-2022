import './recuperacao-senha.css'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import Servico from '../../../../service/servico'


function RecuperacaoSenha(props) {
    const [modalUsuario, setModalUsuario] = useState('')
    const [usuarioValido, setUsuarioValido] = useState(false)
    const [modalSenha, setModalSenha] = useState('')
    const [senhaValida, setSenhaValida] = useState(false)
    const [modalConfirmacao, setModalConfirmacao] = useState('')
    const [confirmacaoValida, setConfirmacaoValida] = useState(false)
    const [mostrarAlerta, setmostrarAlerta] = useState(false)

    function TrocarSenha() {
        const dados = {
            usuario: modalUsuario,
            senha: modalSenha
        }
        if(!Servico.DefinirNovaSenha(dados)) {
            setmostrarAlerta(true)
            return
        }
        props.onHide()
    }

    function ValidaCampoModal(e) {
        const campo = e.target.id
        const valor = e.target.value
        Validacao(campo, valor)
    }

    function Validacao(campo, valor) {
        switch(campo) {
            case 'modalUsuario':
                setModalUsuario(valor)
                setUsuarioValido(valor.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false)
                break
            case 'modalSenha':
                setModalSenha(valor)
                setSenhaValida(valor.length >= 6)
                break
            case 'modalConfirmaSenha':
                setModalConfirmacao(valor)
                setConfirmacaoValida(modalSenha === valor)
                break
            default:
                break
        }        
    }

    return (
        <Modal
            {...props}
            size='md'
            aria-labelledby='contained-modal-title-vcenter'
            centered>
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>Trocar senha</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mb-2' controlId='modalUsuario'>
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control 
                            type='email'
                            value={modalUsuario}
                            onChange={(evento) => ValidaCampoModal(evento)}
                            isInvalid={!usuarioValido}
                            required />
                        <Form.Control.Feedback type='invalid'>O e-mail deve estar em um padrão válido</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-2' controlId='modalSenha'>
                        <Form.Label>Nova senha</Form.Label>
                        <Form.Control
                            type='password'
                            value={modalSenha}
                            onChange={(evento) => ValidaCampoModal(evento)}
                            isInvalid={!senhaValida}
                            required />
                        <Form.Control.Feedback type='invalid'>A senha deve ter 6 digitos ou mais</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mb-2' controlId='modalConfirmaSenha'>
                        <Form.Label>Confirme a nova senha</Form.Label>
                        <Form.Control
                            type='password'
                            value={modalConfirmacao}
                            onChange={(evento) => ValidaCampoModal(evento)}
                            isInvalid={!confirmacaoValida}
                            required />
                        <Form.Control.Feedback type='invalid'>A senha deve ser igual a digitada acima</Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    disabled={!(usuarioValido && senhaValida && confirmacaoValida)}
                    onClick={() => TrocarSenha()}>Salvar</Button>
            </Modal.Footer>

            {/* Alertas */}
            <Alert
                variant='danger'
                className='m-2'
                show={mostrarAlerta}
                onClose={() => setmostrarAlerta(false)}
                dismissible>Falha ao atualizar os dados no servidor</Alert>
        </Modal>
    )
}
  
export default RecuperacaoSenha