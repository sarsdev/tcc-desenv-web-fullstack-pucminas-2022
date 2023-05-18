import './grafico-pizza.css'
import { createElement} from 'react'
import * as d3 from 'd3'

function GraficoPizza({dados}) {
    const arc = d3.arc()
    const pie = d3.pie().value(function(d) { return d.valor })
    let scale = d3.scaleOrdinal().domain(dados).range(['#ffd384','#94ebcd','#fbaccc','#d3e0ea','#fa7f72'])
    
    let angulos = pie(dados)
    let paths = angulos.map(v => {
        let dadosArc = {
            innerRadius: 0,
            outerRadius: 150,
            startAngle: v.startAngle,
            endAngle: v.endAngle
        }
        return {
            dado: v.data,
            valor: arc(dadosArc),
            arcObj: dadosArc
        }
    })

    let labels = d3.arc()
    .outerRadius(150)
    .innerRadius(0)

    let childrenPaths = paths.map((v, i) => createElement('path', {key: `${i}p`, d: v.valor, fill: scale(v.dado.chave) }))
    let childrenLabels = paths.map((v, i) => createElement('text', {key: `${i}t`, transform: 'translate(' + labels.centroid(v.arcObj) + ')', className: 'label-grafico-pizza' }, `(${v.dado.valor}) ${v.dado.chave}`))  
    let g = createElement('g', {transform: 'translate(' + 300 / 2 + ',' + 300 / 2 + ')'}, [...childrenPaths, ...childrenLabels])
    let svg = createElement('svg', {width: 300, height: 300}, g)
    let grafico = createElement('div', {id: 'GraficoPizza'}, svg)

    return grafico
}
  
export default GraficoPizza