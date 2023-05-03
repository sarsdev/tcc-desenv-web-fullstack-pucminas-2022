import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

function ModalConfigAgenda(props) {
    const [ordenaPorUltimo, setOrdenaPorUltimo] = useState(false)
    const [mostrarObsApont, setMostrarObsApont] = useState(false)
    const [encerrarApontAuto, setEncerrarApontAuto] = useState(false)
    const [milisegundosJornada, setMilisegundosJornada] = useState('')
    const [obsPadrao, setObsPadrao] = useState('')
    const [horasJornada, setHorasJornada] = useState('')

    useEffect(() => {
        if(props.configatual.ordena_grid_por_ultimo !== undefined) {
            setOrdenaPorUltimo(props.configatual.ordena_grid_por_ultimo)
            setMostrarObsApont(props.configatual.mostra_obg_apos_apont)
            setEncerrarApontAuto(props.configatual.encerra_apont_ao_iniciar_outro)
            setMilisegundosJornada(props.configatual.total_horas_jornada)
            setObsPadrao(props.configatual.texto_padrao_obs)
        }
    }, [props.configatual])

    useEffect(() => {
        if(milisegundosJornada) {
            let dataAux = MilisegundoParaData(milisegundosJornada)
            let horaAux = FormataHora(dataAux)
            setHorasJornada(horaAux)
        }
    }, [milisegundosJornada])

    function FormataHora(data, padrao='hh:mm') {
        try {
            let strHora = data.getHours().toString().padStart(2, '0')
            let strMinuto = data.getMinutes().toString().padStart(2, '0')
            let dataRetorno = padrao.toLowerCase().replace('hh', strHora).replace('mm', strMinuto)
            return dataRetorno            
        } catch {
            return '' 
        }
    }

    function MilisegundoParaData(valor) {
        const horaEmMilisegundos = 3600000
        // Calculando as horas
        let fracaoDeHoras = valor / horaEmMilisegundos
        let hora = +(fracaoDeHoras.toString().split('.')[0])
        // Calculando os minutos
        let restoFracaoHoras = +(fracaoDeHoras.toFixed(2).toString().split('.')[1])
        let fracaoDeMinuto = restoFracaoHoras * 0.6
        let minuto = +(fracaoDeMinuto.toString().split('.')[0])
        // Calculando os segundos
        let restoFracaoMinutos = +(fracaoDeHoras.toFixed(2).toString().split('.')[1])
        let segundos = restoFracaoMinutos*0.6
        return new Date(
            1900,
            1,
            1, 
            hora,
            minuto,
            segundos
        )
    }

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
                    Configurações pessoais
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack>
                    <Form.Check 
                        type={'checkbox'}
                        id={'ordena_grid_por_ultimo'}                        
                        label={'Carregar grid ordenando por último apontamento'}
                        checked={ordenaPorUltimo}
                        onChange={(e) => setOrdenaPorUltimo(e.target.checked)} />
                    <Form.Check 
                        type={'checkbox'}
                        id={'mostra_obg_apos_apont'}                        
                        label={'Mostrar campo de observação ao parar um apontamento'}
                        checked={mostrarObsApont}
                        onChange={(e) => setMostrarObsApont(e.target.checked)} />
                    <Form.Check 
                        type={'checkbox'}
                        id={'encerra_apont_ao_iniciar_outro'}                        
                        label={'Encerrar automaticamente apontamento anterior ao iniciar um novo'}
                        checked={encerrarApontAuto}
                        onChange={(e) => setEncerrarApontAuto(e.target.checked)} />
                    <hr/>
                    <InputGroup>
                        <InputGroup.Text>Total de horas da jornada</InputGroup.Text>
                        <Form.Control
                            id='total_horas_jornada'
                            type='time'
                            value={horasJornada}
                            onChange={(e) => setMilisegundosJornada(e.target.valueAsNumber)} />
                    </InputGroup>
                    <Form.Group className='mt-2'>
                        <Form.Label>Texto padrão para observações de apontamento</Form.Label>
                        <Form.Control
                            id='texto_padrao_obs'
                            type="text"
                            value={obsPadrao}
                            onChange={(e) => setObsPadrao(e.target.value)} />
                    </Form.Group>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant='primary'
                    onClick={() => props.onHide({
                        _id: props.configatual._id,
                        id_colaborador: props.configatual.id_colaborador,
                        ordena_grid_por_ultimo: ordenaPorUltimo,
                        mostra_obg_apos_apont: mostrarObsApont,
                        encerra_apont_ao_iniciar_outro: encerrarApontAuto,
                        total_horas_jornada: milisegundosJornada,
                        texto_padrao_obs: obsPadrao
                    })}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    )
  }
  
  export default ModalConfigAgenda