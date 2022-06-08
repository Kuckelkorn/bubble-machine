/* eslint-disable no-undef */
const width = window.innerWidth
const height = window.innerHeight
const margin = { width: (0.1 * width), height: (0.1 * height) }

// Scale
const xScale = d3.scaleLinear().range([0 + margin.width, width - margin.width])
const yScale = d3.scaleLinear().range([0 + margin.height, height - margin.height])

const updateGraph = async (data) => {
  // Create the svg in the body
  const svg = d3.select('figure').append('svg')
    .attr('width', width)
    .attr('height', height)
  const nodes = data.nodes

  xScale.domain([d3.min(nodes, (d) => d.x), d3.max(nodes, (d) => d.x)])
  yScale.domain([d3.min(nodes, (d) => d.y), d3.max(nodes, (d) => d.y)])

  const circle = svg.selectAll('circle').data(nodes).join(
    (enter) => {
      enter = enter.append('circle')
      return enter
    },
    (update) => update,
    (exit) => exit.remove()
  )

  circle
    .transition()
    .attr('cx', (nodes) => xScale(nodes.x))
    .attr('cy', (nodes) => yScale(nodes.y))
    .attr('r', (nodes) => {
      if (nodes.label === 'person') {
        return 30
      } else {
        return 10
      }
    })
    .attr('class', (nodes) => nodes.label)
}

export default updateGraph
