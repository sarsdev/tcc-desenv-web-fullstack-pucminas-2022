import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'

function ModalApontamentosDia(props) {
    const qtdLinhasPaginacao = 5

    const [listaDados, setlistaDados] = useState([])
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [paginaAtual, setPaginaAtual] = useState(1)

    useEffect(() => {
        setlistaDados([...props.apontamentos])
    }, [props.apontamentos])

    function InsereLinhasGrid(dados) {
        let dadosFiltrados = dados
        if(dadosFiltrados.length > qtdLinhasPaginacao) {
            let qtdPaginas = Math.ceil(dadosFiltrados.length / qtdLinhasPaginacao)
            if(totalPaginas !== qtdPaginas) {
                setTotalPaginas(qtdPaginas)
                if(paginaAtual > qtdPaginas) {
                    setPaginaAtual(qtdPaginas)
                }
            }
            dadosFiltrados = dadosFiltrados.filter((v, i, o) => i >= ((qtdLinhasPaginacao * paginaAtual) - qtdLinhasPaginacao) && i <= (qtdLinhasPaginacao * paginaAtual)-1)
        } else {
            if(totalPaginas !== 1) {
                setTotalPaginas(1)
                if(paginaAtual > 1) {
                    setPaginaAtual(1)
                }
            }
        }
        return dadosFiltrados.map((v, i) =>
            <tr key={i}>
                <td>
                    {FormataHora(new Date(v.hora_inicial))}
                </td>
                <td>
                    {FormataHora(new Date(v.hora_final))}
                </td>
                <td>
                    {FormataHoraSaldo(MilisegundoParaData(v.saldo))}
                </td>
                <td>
                    {v.observacao}
                </td>
            </tr>)
    }

    function MontaPaginacao() {
        if(totalPaginas >= 1 && totalPaginas <= 3) {
            let listaPaginas = []
            for (let index = 1; index <= totalPaginas; index++) {
                listaPaginas.push(index)                                        
            }
            return (<>
                {listaPaginas.map((v, i) => <Pagination.Item
                                                id={'pag'+v}
                                                key={i} 
                                                className={paginaAtual===v ? 'destaquePag' : ''}
                                                onClick={(e) => MudaPagina(e)} >
                                                {v}
                                            </Pagination.Item>)}
            </>)
        } else {
            let listaPaginas = []
            if(paginaAtual <= 2) {
                listaPaginas.push(1)
                listaPaginas.push(2)
                listaPaginas.push(3)
            } else if(paginaAtual === totalPaginas) {
                listaPaginas.push(paginaAtual-2)
                listaPaginas.push(paginaAtual-1)
                listaPaginas.push(paginaAtual)
            } else {
                listaPaginas.push(paginaAtual-1)
                listaPaginas.push(paginaAtual)
                listaPaginas.push(paginaAtual+1)
            }
            return (<>
                <Pagination.First
                    id='first'
                    disabled={paginaAtual===1}
                    onClick={(e) => MudaPagina(e)} />
                {listaPaginas.map((v, i) => <Pagination.Item
                                                id={'pag_'+v}
                                                key={i} 
                                                className={paginaAtual===v ? 'destaquePag' : ''}
                                                onClick={(e) => MudaPagina(e)} >
                                                {v}
                                            </Pagination.Item>)}
                <Pagination.Last
                    id='last'
                    disabled={paginaAtual===totalPaginas}
                    onClick={(e) => MudaPagina(e)} />
            </>)
        }
    }

    function MudaPagina(e) {
        let campo = e.target.id ? e.target.id : e.target.parentElement.id
        let valor = campo !== 'first' && campo !== 'last' ? campo.split('_')[1] : ''    
        switch (campo) {
            case 'first':
                setPaginaAtual(1)
                break
            case 'last':
                setPaginaAtual(totalPaginas)
                break
            default:
                if(campo.length > 3 && campo.substring(0, 3) === 'pag') {
                    let valorNumerico = +valor
                    setPaginaAtual(valorNumerico)
                }
                break
        }
    }

    function FormataHora(data, padrao='hh:mm:ss') {
        try {
            let strHora = (data.getHours()+3).toString().padStart(2, '0')
            let strMinuto = data.getMinutes().toString().padStart(2, '0')
            let strSegundo = data.getSeconds().toString().padStart(2, '0')
            let dataRetorno = padrao.toLowerCase().replace('hh', strHora).replace('mm', strMinuto).replace('ss', strSegundo)
            return dataRetorno            
        } catch {
            return '' 
        }
    }

    function FormataHoraSaldo(data, padrao='hh:mm:ss') {
        try {
            let strHora = (data.getHours()).toString().padStart(2, '0')
            let strMinuto = data.getMinutes().toString().padStart(2, '0')
            let strSegundo = data.getSeconds().toString().padStart(2, '0')
            let dataRetorno = padrao.toLowerCase().replace('hh', strHora).replace('mm', strMinuto).replace('ss', strSegundo)
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
        let restoFracaoMinutos = +(fracaoDeMinuto.toFixed(2).toString().split('.')[1])
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
                    Apontamentos do dia
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Table striped responsive>
                            <thead>
                                <tr>
                                    <th>Hora Inicial</th>
                                    <th>Hora Final</th>                                    
                                    <th>Saldo</th>
                                    <th>Observação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {InsereLinhasGrid(listaDados)}
                            </tbody>
                        </Table>
                        <Pagination className='d-flex justify-content-center'>                            
                            {MontaPaginacao()}                            
                        </Pagination>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
  }
  
  export default ModalApontamentosDia