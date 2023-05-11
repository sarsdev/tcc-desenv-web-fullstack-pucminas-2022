import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Pagination from 'react-bootstrap/Pagination'

function ModalApontamentosProjeto(props) {
    const qtdLinhasPaginacao = 5

    const [listaDados, setlistaDados] = useState([])
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [paginaAtual, setPaginaAtual] = useState(1)

    useEffect(() => {
        setlistaDados([...props.apontamentosprojeto])
    }, [props.apontamentosprojeto])

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
                    {v.colaborador.nome}
                </td>
                <td>
                    {FormataData(new Date(v.data), 'DD/MM/YYYY')}
                </td>
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
                <Pagination.First
                    id='first'
                    hidden={true}
                    onClick={(e) => MudaPagina(e)} />
                {listaPaginas.map((v, i) => <Pagination.Item
                                                id={'pag'+v}
                                                key={i} 
                                                className={paginaAtual===v ? `pagDestaque-${props.usuario.acessibilidade.tema.titulo}` : `pag-${props.usuario.acessibilidade.tema.titulo}`}
                                                onClick={(e) => MudaPagina(e)} >
                                                {v}
                                            </Pagination.Item>)}
                <Pagination.Last
                    id='last'
                    hidden={true}
                    onClick={(e) => MudaPagina(e)} />
            </>)
        } else {
            return <Pagination.Item>{0}</Pagination.Item>
        }
    }

    function MudaPagina(e) {
        let campo = e.target.id
        let valor = e.target.text        
        switch (campo) {
            case 'first':
                if(paginaAtual !== 1) {
                    setPaginaAtual(1)
                }
                break
            case 'last':
                if(paginaAtual !== totalPaginas) {
                    setPaginaAtual(totalPaginas)
                }
                break
            default:
                if(campo.length > 3 && campo.substring(0, 3) === 'pag') {
                    let valorNumerico = +valor
                    if(paginaAtual !== valorNumerico) {
                        setPaginaAtual(valorNumerico)
                    }
                }
                break
        }
    }

    function FormataData(data, padrao='yyyy-MM-dd') {
        try {
            let strDia = data.getDate().toString().padStart(2, '0')
            let strMes = (data.getMonth()+1).toString().padStart(2, '0')
            let strAno = data.getFullYear().toString()
            let dataRetorno = padrao.toLowerCase().replace('dd', strDia).replace('mm', strMes).replace('yyyy', strAno)
            return dataRetorno            
        } catch {
            return '' 
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
            let strHora = data.getHours().toString().padStart(2, '0')
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
            className={`modal-${props.usuario.acessibilidade.tema.titulo}`}
            centered
            onExit={() => props.onHide()}>
            <Modal.Header closeButton>
                <Modal.Title 
                    id='contained-modal-title-vcenter'>
                    Apontamentos do projeto
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Table variant={props.usuario.acessibilidade.tema.titulo} responsive>
                            <thead>
                                <tr>
                                    <th>Usuário</th>
                                    <th>Data</th>
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
  
  export default ModalApontamentosProjeto