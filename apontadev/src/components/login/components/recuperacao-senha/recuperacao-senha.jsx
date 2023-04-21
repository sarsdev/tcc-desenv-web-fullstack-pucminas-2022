import './recuperacao-senha.css'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import { ServicoLogin } from '../../../../service/servico'


function RecuperacaoSenha(props) {
    const [modalUsuario, setModalUsuario] = useState('')
    const [usuarioValido, setUsuarioValido] = useState(false)
    const [modalSenha, setModalSenha] = useState('')
    const [senhaValida, setSenhaValida] = useState(false)
    const [modalConfirmacao, setModalConfirmacao] = useState('')
    const [confirmacaoValida, setConfirmacaoValida] = useState(false)
    const [mostrarAlerta, setmostrarAlerta] = useState(false)
    const [textoAlertaModal, setTextoAlertaModal] = useState('')
    const [tipoAlertaModal, setTipoAlertaModal] = useState('danger')
    const [mostraLoadingModal, setMostraLoadingModal] = useState(false)

    function LimpaModal() {
        setModalUsuario('')
        setUsuarioValido(false)
        setModalSenha('')
        setSenhaValida(false)
        setModalConfirmacao('')
        setConfirmacaoValida(false)
    }

    function TrocarSenha() {
        const dados = {
            usuario: modalUsuario,
            senha: modalSenha
        }
        setMostraLoadingModal(true)
        ServicoLogin.DefinirNovaSenha(dados)
        .then((resp) => {
            if(resp.erro) {
                setTipoAlertaModal('danger')
                setTextoAlertaModal(resp.msgErro)
                setmostrarAlerta(true)
            } else {
                setTipoAlertaModal('success')
                setTextoAlertaModal('Senha atualizada com sucesso!')
                setmostrarAlerta(true)
                LimpaModal()
            }
        })
        .catch((err) => {
            setTextoAlertaModal(err)
            setmostrarAlerta(true)
        })
        .finally(() => {
            setMostraLoadingModal(false)
        })        
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
                    disabled={!(usuarioValido && senhaValida && confirmacaoValida)||mostraLoadingModal}
                    onClick={() => TrocarSenha()}>
                    <Spinner
                        hidden={!mostraLoadingModal}
                        as="span"
                        animation='border'
                        size='sm'
                        variant='light'
                        role='status'
                    />
                    Salvar
                </Button>
            </Modal.Footer>

            {/* Alertas */}
            <Alert
                variant={tipoAlertaModal}
                className='m-2'
                show={mostrarAlerta}
                onClose={() => setmostrarAlerta(false)}
                dismissible>{textoAlertaModal}</Alert>
        </Modal>
    )
}
  
export default RecuperacaoSenha